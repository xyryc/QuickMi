import { ButtonToggle } from "@/components/ButtonToggle";
import ScreenHeader from "@/components/ScreenHeader";
import { FontAwesome6, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const permission = () => {
  const [isLocationOn, setIsLocationOn] = useState(false);
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isContactOn, setIsContactOn] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.2]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Permission" />

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
            <View className="mt-3">
              {/* location access */}
              <View className="flex-row justify-between items-center mx-3 py-3 border-b border-[#E3E6F0]">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="location-outline" size={24} color="black" />
                  <Text className="font-sf-pro-medium text-lg">
                    Location Access
                  </Text>
                </View>

                <ButtonToggle isOn={isLocationOn} setIsOn={setIsLocationOn} />
              </View>

              {/* Allow Notifications */}
              <View className="flex-row justify-between items-center mx-3 py-3 border-b border-[#E3E6F0]">
                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="black"
                  />
                  <Text className="font-sf-pro-medium text-lg">
                    Allow Notifications
                  </Text>
                </View>
                <ButtonToggle
                  isOn={isNotificationOn}
                  setIsOn={setIsNotificationOn}
                />
              </View>

              {/* Camera Access */}
              <View className="flex-row justify-between items-center mx-3 py-3 border-b border-[#E3E6F0]">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="camera-outline" size={24} color="black" />
                  <Text className="font-sf-pro-medium text-lg">
                    Camera Access
                  </Text>
                </View>
                <ButtonToggle isOn={isCameraOn} setIsOn={setIsCameraOn} />
              </View>

              {/* Contact Access */}
              <View className="flex-row justify-between items-center mx-3 py-3 border-b border-[#E3E6F0]">
                <View className="flex-row items-center gap-2">
                  <FontAwesome6 name="contact-card" size={24} color="black" />
                  <Text className="font-sf-pro-medium text-lg">
                    Contact Access
                  </Text>
                </View>
                <ButtonToggle isOn={isContactOn} setIsOn={setIsContactOn} />
              </View>

              {/* Microphone Access */}
              <View className="flex-row justify-between items-center mx-3 py-3 border-b border-[#E3E6F0]">
                <View className="flex-row items-center gap-2">
                  <SimpleLineIcons name="microphone" size={24} color="black" />
                  <Text className="font-sf-pro-medium text-lg">
                    Microphone Access{" "}
                  </Text>
                </View>
                <ButtonToggle
                  isOn={isMicrophoneOn}
                  setIsOn={setIsMicrophoneOn}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default permission;
