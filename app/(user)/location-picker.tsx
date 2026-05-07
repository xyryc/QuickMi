import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, {
  MapPressEvent,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LocationPicker = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
    label: string;
  } | null>(null);

  // Sample data - replace with actual data from params
  const pickupLocation = {
    latitude: 23.7808,
    longitude: 90.4211,
    address: "Block B, Banasree, Dhaka.",
  };

  const { returnTo, locationField } = useLocalSearchParams<{
    returnTo?: string;
    locationField?: "pickup" | "dropoff";
  }>();

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
          "Please enable location permissions to see your current location on the map.",
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

      const reverseGeocode =
        await Location.reverseGeocodeAsync(currentLocation);
      const place = reverseGeocode[0];
      const label = formatAddressLabel(place);

      setSelectedLocation({
        ...currentLocation,
        label,
      });

      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          1000,
        );
      }
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        "Location Error",
        "Unable to retrieve your current location. Please try again.",
      );
    }
  };

  const formatAddressLabel = (
    place?: Location.LocationGeocodedAddress | null,
  ) => {
    if (!place) return "Selected location";

    const parts = [
      place.name,
      place.street,
      place.district,
      place.city,
      place.region,
      place.country,
    ].filter(Boolean);

    if (parts.length === 0) return "Selected location";
    return parts.join(", ");
  };

  const resolveLocationLabel = async (latitude: number, longitude: number) => {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const place = reverseGeocode[0];
      return formatAddressLabel(place);
    } catch {
      return "Selected location";
    }
  };

  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const label = await resolveLocationLabel(latitude, longitude);
    setSelectedLocation({ latitude, longitude, label });
  };

  const handleUseLocation = () => {
    if (!selectedLocation) return;

    if (returnTo) {
      router.replace({
        pathname: returnTo as any,
        params: {
          selectedLocationLabel: selectedLocation.label,
          selectedLocationField: locationField,
        },
      });
      return;
    }

    router.back();
  };

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        onPress={handleMapPress}
      >
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
        className="absolute bottom-28 right-4 bg-white rounded-full w-14 h-14 items-center justify-center shadow-lg border border-[#0F73F7E5]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <MaterialIcons name="my-location" size={24} color="#0F73F7" />
      </TouchableOpacity>

      {selectedLocation && (
        <TouchableOpacity
          onPress={handleUseLocation}
          className="absolute bottom-6 left-4 right-4 bg-[#0F73F7] rounded-xl py-4 items-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 4,
          }}
        >
          <Text className="text-white font-sf-pro-medium text-base">
            Use This Location
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LocationPicker;
