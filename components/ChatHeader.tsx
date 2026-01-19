import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ChatHeader = () => {
  const router = useRouter();

  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  console.log("from chat header", returnTo);

  const handleBack = () => {
    if (returnTo) {
      router.push(returnTo as any);
    } else {
      router.back();
    }
  };

  return (
    <View className="py-3 px-5 flex-row items-center justify-between gap-10 bg-[#d3e6ff38] rounded-b-3xl">
      <View className="flex-row items-center gap-2 w-[48%]">
        <TouchableOpacity
          onPress={handleBack}
          className="w-11 h-11 bg-white items-center justify-center rounded-full border-[0.5px] border-[#0F73F7E5]"
        >
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <View className="flex-row items-center gap-2">
          <Image
            source="https://media.licdn.com/dms/image/v2/D5603AQFMeZ7i9ybZgw/profile-displayphoto-shrink_200_200/B56ZS29wLQHwAY-/0/1738236429558?e=2147483647&v=beta&t=RTX-UGEWSzuEb-Gv2bqXqREzQX15FMKi0TK1HJBAKuE"
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
            }}
          />

          <View className="w-10/12">
            <Text className="font-sf-pro-medium" numberOfLines={1}>
              Md Talath Un Nabi
            </Text>
            <Text className="font-sf-pro-regular text-xs" numberOfLines={1}>
              4 Arron Bushnell St, Jerusalem, Palestine
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-4">
        <TouchableOpacity>
          <Ionicons name="videocam-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="call-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
