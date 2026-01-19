import ButtonPrimary from "@/components/ButtonPrimary";
import SearchBar from "@/components/Searchbar";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectLocation = () => {
  const router = useRouter();

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
          showLocationPicker
          containerClassName="mb-3"
          locationPickerPath={() =>
            router.push({
              pathname: "/(user)/location-picker",
              params: { returnTo: "/(user)/instant-delivery/select-location" },
            })
          }
        />

        <SearchBar
          placeholder="Search Drop Off"
          showLocationPicker
          locationPickerPath={() =>
            router.push({
              pathname: "/(user)/location-picker",
              params: { returnTo: "/(user)/instant-delivery/select-location" },
            })
          }
        />

        <View className="border-t border-gray-200 my-3" />

        <View className="flex-row gap-2.5">
          <TouchableOpacity className="bg-[#9FC7FC40] px-3.5 py-2 rounded-xl">
            <Text className="text-xs font-sf-pro-medium text-[#031731]">
              Recent
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#9FC7FC40] px-3.5 py-2 rounded-xl">
            <Text className="text-xs font-sf-pro-medium text-[#031731]">
              Saved
            </Text>
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
