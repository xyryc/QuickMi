import ScreenHeader from "@/components/ScreenHeader";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PersonalInfo = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Personal info" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          {/* scrollable content */}
          <ScrollView
            className="flex-1 mx-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* profile picture */}
            <View className="mt-5">
              <View className="items-center justify-center mx-auto">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/10.jpg",
                  }}
                  style={{
                    height: 90,
                    width: 90,
                    borderRadius: 100,
                  }}
                  contentFit="cover"
                />
              </View>

              {/* name */}
              <Text className="text-center mt-2 text-[#111111] font-sf-pro-medium text-lg">
                Shuvo paul
              </Text>
              <View className="flex-row items-center gap-2 justify-center mt-1">
                <AntDesign name="star" size={18} color="#FFD700" />
                <Text className="font-sf-pro-medium text-sm text-[#1F1D1D]">
                  3.35
                </Text>
                <Text>|</Text>
                <Text className="font-sf-pro-regular text-sm text-[#1F1D1D]">
                  150 Delivery
                </Text>
              </View>
            </View>

            {/* personal info */}

            {/* profile name */}

            <View className="flex-row justify-between items-center mt-5 border-b border-[#E3E6F0] mx-3 py-2 pb-4">
              <View className="flex-row items-center gap-3">
                <Ionicons name="person-outline" size={24} color="#4D4D4D" />
                <Text className="font-sf-pro-medium text-sm text-black">
                  Darlene Robertson
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/(agent)/profile/update-name")}
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
                  (225) 555-0118
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push("/(agent)/profile/update-phone-number")
                }
              >
                <Text className="font-sf-pro-regular text-sm text-[#0F73F7]">
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* E-Mail*/}

            <View className="flex-row justify-between items-center mt-5 border-b border-[#E3E6F0] mx-3 py-2 pb-4">
              <View className="flex-row items-center gap-3">
                <Ionicons name="mail-outline" size={24} color="#4D4D4D" />
                <Text className="font-sf-pro-medium text-sm text-black">
                  dolores.chambers@example.com
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/(agent)/profile/update-email")}
              >
                <Text className="font-sf-pro-regular text-sm text-[#0F73F7]">
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Driver’s License*/}
            <View className="flex-row justify-between items-center mt-5 border-b border-[#E3E6F0] mx-3 py-2 pb-4">
              <View className="flex-row items-center gap-3">
                <AntDesign name="idcard" size={24} color="#4D4D4D" />
                <Text className="font-sf-pro-medium text-sm text-black">
                  Driver’s License
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/(agent)/profile/driving-license")}
              >
                <Text className="font-sf-pro-regular text-sm text-[#0F73F7]">
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Car Information*/}
            <View className="flex-row justify-between items-center mt-5 border-b border-[#E3E6F0] mx-3 py-2 pb-4">
              <View className="flex-row items-center gap-3">
                <AntDesign name="idcard" size={24} color="#4D4D4D" />
                <Text className="font-sf-pro-medium text-sm text-black">
                  Car Information
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/(agent)/profile/car-information")}
              >
                <Text className="font-sf-pro-regular text-sm text-[#0F73F7]">
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PersonalInfo;
