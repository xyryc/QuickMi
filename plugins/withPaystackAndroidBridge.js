const fs = require("fs");
const path = require("path");
const {
  withAppBuildGradle,
  withAndroidManifest,
  withDangerousMod,
  withMainApplication,
  withMainActivity,
  createRunOncePlugin,
} = require("@expo/config-plugins");

const PAYSTACK_DEPENDENCY = 'implementation("com.paystack.android:paystack-ui:0.0.11")';

function withPaystackDependency(config) {
  return withAppBuildGradle(config, (mod) => {
    if (mod.modResults.contents.includes(PAYSTACK_DEPENDENCY)) {
      return mod;
    }
    mod.modResults.contents = mod.modResults.contents.replace(
      /dependencies\s*{/,
      `dependencies {\n    ${PAYSTACK_DEPENDENCY}`
    );
    return mod;
  });
}

function withMainApplicationPackage(config) {
  return withMainApplication(config, (mod) => {
    let src = mod.modResults.contents;
    const packageName = config.android?.package || "com.alex.quickmi";
    const importLine = `import ${packageName}.paystack.PaystackBridgePackage`;

    if (!src.includes(importLine)) {
      src = src.replace(
        /import expo\.modules\.ReactNativeHostWrapper/,
        `import expo.modules.ReactNativeHostWrapper\n${importLine}`
      );
    }

    if (!src.includes("add(PaystackBridgePackage())")) {
      src = src.replace(
        /PackageList\(this\)\.packages\.apply\s*\{\s*([\s\S]*?)\s*\}/m,
        (match, inner) =>
          `PackageList(this).packages.apply {\n${inner}\n              add(PaystackBridgePackage())\n            }`
      );
    }

    mod.modResults.contents = src;
    return mod;
  });
}

function withMainActivityPaystackSetup(config) {
  return withMainActivity(config, (mod) => {
    let src = mod.modResults.contents;
    const packageName = config.android?.package || "com.alex.quickmi";
    const importLine = `import ${packageName}.paystack.PaystackBridgeRegistry`;

    if (!src.includes(importLine)) {
      src = src.replace(
        /import com\.facebook\.react\.defaults\.DefaultReactActivityDelegate/,
        `import com.facebook.react.defaults.DefaultReactActivityDelegate\n${importLine}`
      );
    }

    if (!src.includes("PaystackBridgeRegistry.setup(this)")) {
      src = src.replace(
        /super\.onCreate\(null\)\s*/m,
        `super.onCreate(null)\n    PaystackBridgeRegistry.setup(this)\n`
      );
    }

    mod.modResults.contents = src;
    return mod;
  });
}

function withPaystackBridgeFiles(config) {
  return withDangerousMod(config, [
    "android",
    async (mod) => {
      const packageName = config.android?.package || "com.alex.quickmi";
      const packagePath = packageName.replace(/\./g, "/");
      const targetDir = path.join(
        mod.modRequest.projectRoot,
        "android",
        "app",
        "src",
        "main",
        "java",
        packagePath,
        "paystack"
      );
      await fs.promises.mkdir(targetDir, { recursive: true });

      const moduleFile = path.join(targetDir, "PaystackBridgeModule.kt");
      const packageFile = path.join(targetDir, "PaystackBridgePackage.kt");
      const registryFile = path.join(targetDir, "PaystackBridgeRegistry.kt");

      const moduleSource = `package ${packageName}.paystack

import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.paystack.android.core.Paystack
import com.paystack.android.ui.paymentsheet.PaymentSheetResult

class PaystackBridgeModule(
  reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  private var pendingPromise: Promise? = null

  override fun getName(): String = "PaystackBridge"

  @ReactMethod
  fun initialize(publicKey: String, promise: Promise) {
    try {
      Paystack.builder()
        .setPublicKey(publicKey)
        .setLoggingEnabled(true)
        .build()
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("PAYSTACK_INIT_ERROR", e.message, e)
    }
  }

  @ReactMethod
  fun payWithAccessCode(accessCode: String, promise: Promise) {
    val activity = reactApplicationContext.currentActivity as? FragmentActivity
    if (activity == null) {
      promise.reject("PAYSTACK_NO_ACTIVITY", "Current activity is not available")
      return
    }

    if (pendingPromise != null) {
      promise.reject("PAYSTACK_IN_PROGRESS", "A payment is already in progress")
      return
    }

    pendingPromise = promise
    PaystackBridgeRegistry.setListener { result ->
      val payload = Arguments.createMap()
      when (result) {
        is PaymentSheetResult.Completed -> {
          payload.putString("status", "completed")
          payload.putString("details", result.paymentCompletionDetails.toString())
          pendingPromise?.resolve(payload)
        }
        is PaymentSheetResult.Cancelled -> {
          payload.putString("status", "cancelled")
          pendingPromise?.resolve(payload)
        }
        is PaymentSheetResult.Failed -> {
          payload.putString("status", "failed")
          payload.putString("error", result.error.message ?: "Unknown error")
          pendingPromise?.resolve(payload)
        }
      }
      pendingPromise = null
    }

    activity.runOnUiThread {
      try {
        val launched = PaystackBridgeRegistry.launch(accessCode)
        if (!launched) {
          pendingPromise?.reject(
            "PAYSTACK_NOT_READY",
            "PaymentSheet is not ready. Ensure registry setup runs in MainActivity.onCreate."
          )
          pendingPromise = null
        }
      } catch (e: Exception) {
        pendingPromise?.reject("PAYSTACK_LAUNCH_ERROR", e.message, e)
        pendingPromise = null
      }
    }
  }
}
`;

      const packageSource = `package ${packageName}.paystack

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class PaystackBridgePackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf(PaystackBridgeModule(reactContext))
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return emptyList()
  }
}
`;

      const registrySource = `package ${packageName}.paystack

import androidx.fragment.app.FragmentActivity
import com.paystack.android.ui.paymentsheet.PaymentSheet
import com.paystack.android.ui.paymentsheet.PaymentSheetResult

object PaystackBridgeRegistry {
  private var paymentSheet: PaymentSheet? = null
  private var listener: ((PaymentSheetResult) -> Unit)? = null

  fun setup(activity: FragmentActivity) {
    if (paymentSheet != null) return
    paymentSheet = PaymentSheet(activity) { result ->
      listener?.invoke(result)
    }
  }

  fun setListener(callback: (PaymentSheetResult) -> Unit) {
    listener = callback
  }

  fun launch(accessCode: String): Boolean {
    val sheet = paymentSheet ?: return false
    sheet.launch(accessCode)
    return true
  }
}
`;

      await fs.promises.writeFile(moduleFile, moduleSource, "utf8");
      await fs.promises.writeFile(packageFile, packageSource, "utf8");
      await fs.promises.writeFile(registryFile, registrySource, "utf8");

      return mod;
    },
  ]);
}

function withAllowBackupManifestFix(config) {
  return withAndroidManifest(config, (mod) => {
    const app = mod.modResults?.manifest?.application?.[0];
    if (!app) return mod;

    app.$ = app.$ || {};
    const existingReplace = app.$["tools:replace"] || "";
    if (!existingReplace.includes("android:allowBackup")) {
      app.$["tools:replace"] = existingReplace
        ? `${existingReplace},android:allowBackup`
        : "android:allowBackup";
    }
    return mod;
  });
}

const withPaystackAndroidBridge = (config) => {
  config = withPaystackDependency(config);
  config = withAllowBackupManifestFix(config);
  config = withMainApplicationPackage(config);
  config = withMainActivityPaystackSetup(config);
  config = withPaystackBridgeFiles(config);
  return config;
};

module.exports = createRunOncePlugin(
  withPaystackAndroidBridge,
  "with-paystack-android-bridge",
  "1.0.0"
);
