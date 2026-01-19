import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ScreenHeader = ({ title }) => {
  const router = useRouter();

  return (
    <View className="py-3 px-5 flex-row items-center">
      <View className="flex-1">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-11 h-11 bg-white items-center justify-center rounded-full border-[0.5px] border-[#0F73F7E5]"
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-sf-pro-medium">{title}</Text>

      <View className="flex-1" />
    </View>
  );
};

export default ScreenHeader;
