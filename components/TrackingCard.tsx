import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonPrimary from "./ButtonPrimary";

const TrackingCard = () => {
  return (
    <View className="bg-white mx-4 mt-4 rounded-2xl p-4 shadow-sm border border-[#005FDC24]">
      <View className="flex-row items-center mb-3">
        <View className="w-11 h-11 bg-[#CFE3FD] rounded-full items-center justify-center mr-2">
          <Image
            source={require("@/assets/images/instant_delivery.svg")}
            style={{ width: 22, height: 22 }}
            contentFit="cover"
          />
        </View>
        <View className="flex-1 flex-row items-center justify-between">
          <Text className="font-sf-pro-regular text-base">
            Tracking ID: #5R9G87R
          </Text>

          <TouchableOpacity className="w-9 h-9 bg-[#061F350D] rounded-full items-center justify-center">
            <MaterialCommunityIcons
              name="content-copy"
              size={16}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-between mb-3">
        <View>
          <Text className="font-sf-pro-regular text-sm mb-1">Distance</Text>
          <Text className="text-lg font-sf-pro-medium">5.39 KM</Text>
        </View>
        <View className="items-end">
          <View className="flex-row items-center gap-1 mb-1">
            <Text className="font-sf-pro-regular text-sm">Charge</Text>
            <Ionicons name="information-circle" size={16} color="#0F73F7" />
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="text-red-500 font-sf-pro-medium text-sm line-through">
              $150
            </Text>
            <Text className="font-sf-pro-medium text-lg">$140</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-sf-pro-medium">Who will pay?</Text>

        <ButtonPrimary
          title="Sender"
          className="!px-3 !py-2"
          icon={<Ionicons name="checkmark-circle" size={16} color="white" />}
          iconPosition="left"
        />
      </View>
    </View>
  );
};

export default TrackingCard;
