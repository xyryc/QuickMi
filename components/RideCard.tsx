import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const RideCard = ({ className, vehicle, isSelected, onPress }) => {
  const getVehicleImage = (rideType) => {
    switch (rideType) {
      case "bike":
        return require("@/assets/images/bike.svg");
      case "car":
        return require("@/assets/images/car.svg");
      case "van":
        return require("@/assets/images/van.svg");
      default:
        return require("@/assets/images/bike.svg");
    }
  };

  // console.log("From ride card", vehicle);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`border rounded-xl px-2 py-3 flex-row items-center gap-4 ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      } ${className}`}
    >
      <Image
        source={getVehicleImage(vehicle?.type)}
        style={{
          width: 50,
          height: 50,
        }}
        contentFit="contain"
      />

      <View className="flex-1">
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm font-sf-pro-medium">
            {vehicle?.name || "Bike"}
          </Text>
          <Text className="text-sm font-sf-pro-medium">
            {vehicle?.price || "$100"}
          </Text>
        </View>

        <View className="flex-row justify-between mb-1">
          <Text className="text-xs font-sf-pro-regular">
            {vehicle?.time || "10 min away"}
          </Text>
          <Text className="text-[9px] font-sf-pro-medium text-green-700">
            Offer your fare
          </Text>
        </View>

        <Text className="text-xs font-sf-pro-regular" numberOfLines={2}>
          {vehicle?.description || "Affordable delivery for your daily commute"}
        </Text>
      </View>

      {/* Selection Indicator */}
      {/* {isSelected && (
        <MaterialIcons name="check-circle" size={24} color="#3B82F6" />
      )} */}
    </TouchableOpacity>
  );
};

export default RideCard;
