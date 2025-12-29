module.exports =  {
  "expo": {
    "name": "quickmi",
    "slug": "quickmi",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "quickmi",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "config": {
        "googleMapsApiKey": process.env.GOOGLE_MAPS_API_KEY_IOS
      },
      "supportsTablet": true,
      "bundleIdentifier": "com.xyryc.quickmi"
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY_ANDROID
        }
      },
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.xyryc.quickmi"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      [                                                                                                    
      "expo-location",                                                                                   
      {                                                                                                  
        locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location for pickups.",                                                                                             
        locationWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location for pickups."           
      }                                                                                                  
    ],     
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}
