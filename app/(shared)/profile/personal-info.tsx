import ScreenHeader from "@/components/ScreenHeader";
import { useGetMeQuery } from "@/store/api/authApi";
import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PersonalInfo = () => {
  const { data, isLoading, isFetching, error, refetch } = useGetMeQuery();

  return (
    <SafeAreaView className="flex-1 mb-28" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.2]}
        style={{ flex: 1 }}
      >
        {/* header */}
        <ScreenHeader title="Personal info" />

        <ScrollView className="mx-5" showsVerticalScrollIndicator={false}>
          {/* profile name */}
          <View className="flex-row justify-between items-center mt-5 border-b border-[#E3E6F0] mx-3 py-2 pb-4">
            <View className="flex-row items-center gap-3">
              <Ionicons name="person-outline" size={24} color="#4D4D4D" />
              <Text className="font-sf-pro-medium text-sm text-black">
                {data?.data?.fullName || "Username"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push(`/(shared)/profile/update-name`)}
            >
              <Text className="font-sf-pro-regular text-sm text-[#0F73F7]">
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          {/* mobile Number */}
          <View className="flex-row justify-between items-center mt-5 border-b border-[#E3E6F0] mx-3 py-2 pb-4">
            <View className="flex-row items-center gap-3">
              <Feather name="phone-call" size={24} color="#4D4D4D" />
              <Text className="font-sf-pro-medium text-sm text-black">
                {data?.data?.phone || "Phone number"}
              </Text>
            </View>

            {/* <TouchableOpacity
              onPress={() =>
                router.push(`/(shared)/profile/update-phone-number`)
              }
            >
              <Text className="font-sf-pro-regular text-sm text-[#0F73F7]">
                Edit
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* E-Mail */}
          <View className="flex-row justify-between items-center mt-5 border-b border-[#E3E6F0] mx-3 py-2 pb-4">
            <View className="flex-row items-center gap-3">
              <Ionicons name="mail-outline" size={24} color="#4D4D4D" />
              <Text className="font-sf-pro-medium text-sm text-black">
                {data?.data?.email || "User email"}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push(`/(shared)/profile/update-email`)}
            >
              <Text className="font-sf-pro-regular text-sm text-[#0F73F7]">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PersonalInfo;
