import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const HistoryCard = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4 border border-[#E3E6F0] p-4 rounded-xl elevation-sm bg-white"
    >
      {/* 1st row */}
      <View className="flex-row justify-between items-center">
        {/* date */}
        <View className="flex-row items-center gap-2">
          <View className="w-2 h-2 bg-blue-500 rounded-full" />
          <Text className="font-sf-pro-regular text-base">
            14 may 2025, 04:40
          </Text>
        </View>

        {/* currency */}
        <Text className="font-sf-pro-medium text-base">$150</Text>
      </View>

      {/* 2nd row */}
      <View className="flex-row justify-between items-center mt-3.5">
        <View>
          <View className="flex-row items-center gap-2 ml-0.5">
            <FontAwesome6 name="person" size={14} color="black" />
            <Text className="font-sf-pro-regular text-xs">
              Block B, Banasree, Dhaka.
            </Text>
          </View>

          <Text className="my-1"> |</Text>

          <View className="flex-row items-center gap-1">
            <Ionicons name="location-sharp" size={14} color="#0F73F7" />

            <Text className="font-sf-pro-regular text-xs">
              Green Road, Dhanmondi, Dhaka.
            </Text>
          </View>
        </View>

        <Image
          source="https://media.licdn.com/dms/image/v2/D5603AQFMeZ7i9ybZgw/profile-displayphoto-shrink_200_200/B56ZS29wLQHwAY-/0/1738236429558?e=2147483647&v=beta&t=RTX-UGEWSzuEb-Gv2bqXqREzQX15FMKi0TK1HJBAKuE"
          style={{
            width: 50,
            height: 50,
            borderRadius: 999,
            borderWidth: 2,
            borderColor: "#0F73F7",
          }}
          contentFit="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
