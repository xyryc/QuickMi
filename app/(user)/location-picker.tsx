import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LocationPicker = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  // Sample data - replace with actual data from params
  const pickupLocation = {
    latitude: 23.7808,
    longitude: 90.4211,
    address: "Block B, Banasree, Dhaka.",
  };

  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();

  const handleBack = () => {
    if (returnTo) {
      router.replace(returnTo);
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-1">
      <MapView ref={mapRef} provider={PROVIDER_GOOGLE} style={{ flex: 1 }}>
        {/* Pickup Marker */}
        <Marker coordinate={pickupLocation}>
          <View className="items-center">
            <View className="bg-black rounded-full p-2">
              <FontAwesome6 name="person" size={16} color="white" />
            </View>
            <View className="w-0.5 h-4 bg-black" />
          </View>
        </Marker>

        {/* Route Line */}
        <Polyline
          coordinates={[pickupLocation]}
          strokeColor="#0F73F7"
          strokeWidth={3}
          lineDashPattern={[1]}
        />
      </MapView>

      {/* Back Button */}
      <TouchableOpacity
        onPress={handleBack}
        className="absolute top-4 left-4 bg-white rounded-full w-11 h-11 items-center justify-center shadow-lg border border-[#0F73F7E5]"
        style={{
          marginTop: insets.top,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default LocationPicker;
