import { NativeModules, Platform } from "react-native";

type PaystackResult = {
  status: "completed" | "cancelled" | "failed";
  details?: string;
  error?: string;
};

type PaystackBridgeType = {
  initialize: (publicKey: string) => Promise<boolean>;
  payWithAccessCode: (accessCode: string) => Promise<PaystackResult>;
};

const nativeBridge = NativeModules.PaystackBridge as PaystackBridgeType | undefined;

const ensureAndroidBridge = () => {
  if (Platform.OS !== "android") {
    throw new Error("Paystack Android bridge is only available on Android.");
  }
  if (!nativeBridge) {
    throw new Error(
      "PaystackBridge is not available. Run `npx expo prebuild` and rebuild Android app."
    );
  }
  return nativeBridge;
};

export const initializePaystackAndroid = async (publicKey: string) => {
  const bridge = ensureAndroidBridge();
  return bridge.initialize(publicKey);
};

export const paystackPayWithAccessCodeAndroid = async (accessCode: string) => {
  const bridge = ensureAndroidBridge();
  return bridge.payWithAccessCode(accessCode);
};

