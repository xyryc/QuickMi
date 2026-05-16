import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type VehicleType = "car" | "bike" | "van";
type TripStatus = "Completed" | "Cancelled" | "In Progress";

interface ActivityCardProps {
  onPress?: () => void;
  vehicleType?: VehicleType;
  dateTime?: string;
  amount?: string;
  pickup?: string;
  dropoff?: string;
  status?: TripStatus;
}

const vehicleIconMap = {
  car: require("@/assets/images/car.svg"),
  bike: require("@/assets/images/bike.svg"),
  van: require("@/assets/images/van.svg"),
};

const ActivityCard = ({
  onPress,
  vehicleType = "bike",
  dateTime = "14 May 2025, 04:40 PM",
  amount = "₦150",
  pickup = "Block B, Banasree, Dhaka",
  dropoff = "Green Road, Dhanmondi, Dhaka",
  status = "Completed",
}: ActivityCardProps) => {
  const isCompleted = status === "Completed";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="mb-3 border border-[#E9EEF5] px-3.5 py-3 rounded-2xl bg-white"
      style={{
        shadowColor: "#031731",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <View className="w-10 h-10 rounded-full bg-[#F3F8FF] items-center justify-center">
            <Image
              source={vehicleIconMap[vehicleType]}
              style={{ width: 24, height: 24 }}
              contentFit="contain"
            />
          </View>
          <View>
            <Text className="font-sf-pro-medium text-sm text-[#031731]">
              {vehicleType.toUpperCase()} Delivery
            </Text>
            <Text className="font-sf-pro-regular text-xs text-[#6D7A8B]">
              {dateTime}
            </Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="font-sf-pro-semibold text-base text-[#031731]">
            {amount}
          </Text>
          <View
            className={`mt-1 px-2.5 py-1 rounded-full ${
              isCompleted ? "bg-[#EAF9EF]" : "bg-[#FFF4E5]"
            }`}
          >
            <Text
              className={`text-[11px] font-sf-pro-medium ${
                isCompleted ? "text-[#137A39]" : "text-[#B66A12]"
              }`}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-3">
        <View className="relative">
          <View className="absolute left-[5px] top-[16px] h-[24px] w-[1px] bg-[#CFE0F7]" />

          <View className="flex-row items-start">
            <View className="w-4 items-center pt-1">
              <View className="w-2.5 h-2.5 rounded-full bg-[#0F73F7]" />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-[11px] font-sf-pro-medium text-[#6D7A8B]">
                Pickup
              </Text>
              <Text
                className="text-xs font-sf-pro-regular text-[#031731]"
                numberOfLines={1}
              >
                {pickup}
              </Text>
            </View>
          </View>

          <View className="flex-row items-start mt-2">
            <View className="w-4 items-center pt-0.5">
              <MaterialCommunityIcons
                name="map-marker"
                size={13}
                color="#111827"
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-[11px] font-sf-pro-medium text-[#6D7A8B]">
                Dropoff
              </Text>
              <Text
                className="text-xs font-sf-pro-regular text-[#031731]"
                numberOfLines={1}
              >
                {dropoff}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityCard;
