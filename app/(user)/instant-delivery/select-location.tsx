import ButtonPrimary from "@/components/ButtonPrimary";
import SearchBar from "@/components/Searchbar";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectLocation = () => {
  const router = useRouter();
  const { selectedLocationLabel, selectedLocationField } = useLocalSearchParams<{
    selectedLocationLabel?: string;
    selectedLocationField?: "pickup" | "dropoff";
  }>();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  useEffect(() => {
    if (!selectedLocationLabel || !selectedLocationField) return;

    if (selectedLocationField === "pickup") {
      setPickupLocation(selectedLocationLabel);
      return;
    }

    setDropoffLocation(selectedLocationLabel);
  }, [selectedLocationField, selectedLocationLabel]);

  const handleConfirm = () => {
    router.push({
      pathname: "/(user)/select-vehicle",
      params: { returnTo: "/(user)/instant-delivery/select-location" },
    });
  };

  return (
    <SafeAreaView>
      <View className="mx-5 my-5">
        <Text className="font-sf-pro-medium text-lg mb-4">Select Location</Text>

        <SearchBar
          placeholder="Search Pickup"
          value={pickupLocation}
          showLocationPicker
          containerClassName="mb-3"
          locationPickerPath={() =>
            router.push({
              pathname: "/(user)/location-picker",
              params: {
                returnTo: "/(user)/instant-delivery/select-location",
                locationField: "pickup",
              },
            })
          }
        />

        <SearchBar
          placeholder="Search Drop Off"
          value={dropoffLocation}
          showLocationPicker
          locationPickerPath={() =>
            router.push({
              pathname: "/(user)/location-picker",
              params: {
                returnTo: "/(user)/instant-delivery/select-location",
                locationField: "dropoff",
              },
            })
          }
        />

        <View className="border-t border-gray-200 my-3" />

        <View className="flex-row gap-2.5">
          <TouchableOpacity className="bg-[#9FC7FC40] px-3.5 py-2 rounded-xl">
            <Text className="text-xs font-sf-pro-medium">Recent</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#9FC7FC40] px-3.5 py-2 rounded-xl">
            <Text className="text-xs font-sf-pro-medium">Saved</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-yellow-600 mt-10 mb-3">
          Below confirm button will be removed in the backend+API integration
          phase. This button is for development purposes only.
        </Text>
        <ButtonPrimary title="Confirm" onPress={handleConfirm} />
      </View>
    </SafeAreaView>
  );
};

export default SelectLocation;
