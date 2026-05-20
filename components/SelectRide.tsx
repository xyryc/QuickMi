import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonPrimary from "./ButtonPrimary";
import RideCard from "./RideCard";

const SelectRide = ({ vehicles, selectedVehicle, onVehicleSelect, onNext }) => {
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get("window").height;

  return (
    <View className="flex-1">
      {/* <Text className="text-xl font-sf-pro-medium text-center mb-4">
        Choose a 
      </Text> */}

      {/* Scrollable Ride List */}
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

      <View className="border-t border-gray-200" />

      {/* choose car, promo section */}
      <View>
        <TouchableOpacity className="flex-row justify-between items-center px-2 py-3 mb-2.5">
          <Text className="font-sf-pro-regular text-base">Add Promo</Text>

          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        <ButtonPrimary
          title="Confirm"
          onPress={onNext}
          disabled={!selectedVehicle}
        />
      </View>
    </View>
  );
};

export default SelectRide;
