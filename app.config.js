module.exports = {
  expo: {
    name: "quickmi",
    slug: "quickmi",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "quickmi",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY_IOS,
      },
      supportsTablet: true,
      bundleIdentifier: "com.alex.quickmi",
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY_ANDROID,
        },
      },
      adaptiveIcon: {
        backgroundColor: "#fff",
        foregroundImage: "./assets/images/android-adaptive.png",
        // "backgroundImage": "./assets/images/android-adaptive-background.png",
        monochromeImage: "./assets/images/android-adaptive.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.alex.quickmi",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission:
            "Allow $(PRODUCT_NAME) to use your location for pickups.",
          locationWhenInUsePermission:
            "Allow $(PRODUCT_NAME) to use your location for pickups.",
        },
      ],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      "./plugins/withPaystackAndroidBridge",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      googlePlacesApiKey: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || "",
    },
  },
};
