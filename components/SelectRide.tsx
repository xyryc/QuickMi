import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import RideCard from "./RideCard";

const SelectRide = ({ vehicles, selectedVehicle, onVehicleSelect, onNext }) => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <Text className="text-xl font-sf-pro-medium text-center mb-4">
        Rider Details
      </Text>

      {/* Ride List */}
      <View>
        {vehicles.map((vehicle) => (
          <RideCard
            key={vehicle.id}
            className="mb-4"
            vehicle={vehicle}
            isSelected={selectedVehicle === vehicle.id}
            onPress={() => onVehicleSelect(vehicle.id)}
          />
        ))}
      </View>

      <View className="border-t border-gray-200 " />

      {/* choose car, promo section */}
      <View>
        <TouchableOpacity
          onPress={() => router.push("/(shared)/settings/promo-code")}
          className="flex-row justify-between items-center px-2 py-3 mb-2.5"
        >
          <Text className="font-sf-pro-medium">Add Promo</Text>

          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <ButtonPrimary
          title="Choose Vehicle"
          onPress={onNext}
          disabled={!selectedVehicle}
        />
      </View>
    </View>
  );
};

export default SelectRide;
