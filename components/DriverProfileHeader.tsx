import { Ionicons, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DriverProfileHeader = ({ returnTo }: any) => {
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center gap-2">
        <Image
          source="https://media.licdn.com/dms/image/v2/D5603AQFMeZ7i9ybZgw/profile-displayphoto-shrink_200_200/B56ZS29wLQHwAY-/0/1738236429558?e=2147483647&v=beta&t=RTX-UGEWSzuEb-Gv2bqXqREzQX15FMKi0TK1HJBAKuE"
          style={{
            width: 62,
            height: 62,
            borderRadius: 99,
          }}
          contentFit="cover"
        />

        <View>
          <Text className="text-lg font-sf-pro-medium text-gray-700">
            Md Talath Un Nabi Anik
          </Text>

          <View className="flex-row items-center gap-1 mt-1.5">
            <Octicons name="star-fill" size={16} color="#FFD700" />
            <Text className="font-sf-pro-medium text-sm">4.5</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/(shared)/chat/chat",
              params: { returnTo },
            })
          }
          className="w-11 h-11 rounded-full items-center justify-center bg-[#CFE3FD42] border border-[#0F73F724]"
        >
          <Ionicons name="chatbox-ellipses-outline" size={20} color="#4D4D4D" />
        </TouchableOpacity>

        <TouchableOpacity className="w-11 h-11 rounded-full items-center justify-center bg-[#CFE3FD42] border border-[#0F73F724]">
          <Ionicons name="call-outline" size={20} color="#4D4D4D" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverProfileHeader;
