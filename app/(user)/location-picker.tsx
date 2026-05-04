import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LocationPicker = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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

  const handleLocateMe = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Location Permission",
          "Please enable location permissions to see your current location on the map."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(currentLocation);

      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          1000
        );
      }
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        "Location Error",
        "Unable to retrieve your current location. Please try again."
      );
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

        {userLocation && (
          <Marker coordinate={userLocation} title="You are here">
            <View className="items-center">
              <View className="w-11 h-11 rounded-full bg-[#0F73F722] items-center justify-center">
                <View className="w-8 h-8 rounded-full bg-[#0F73F7] border-2 border-white items-center justify-center">
                  <FontAwesome6 name="person" size={13} color="white" />
                </View>
              </View>
              <View className="w-1 h-3 bg-[#0F73F7] rounded-full" />
            </View>
          </Marker>
        )}

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

      <TouchableOpacity
        onPress={handleLocateMe}
        className="absolute bottom-8 right-4 bg-white rounded-full w-11 h-11 items-center justify-center shadow-lg border border-[#0F73F7E5]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <MaterialIcons name="my-location" size={20} color="#0F73F7" />
      </TouchableOpacity>
    </View>
  );
};

export default LocationPicker;
