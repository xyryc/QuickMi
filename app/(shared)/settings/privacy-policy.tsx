import ScreenHeader from "@/components/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicy = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.2]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Privacy Policy" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          {/* scrollable content */}
          <ScrollView
            className="flex-1 mx-5 mt-2"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <Text className="font-sf-pro-semibold text-lg text-[#1F1D1D]">
              Privacy & Policy
            </Text>
            <Text className="font-sf-pro-regular text-base text-[#4D4D4D] mt-2">
              We collect personal information that you voluntarily provide to us
              when you register on the [app/service], express an interest in
              obtaining information about us or our products and services,
            </Text>
            <Text className="font-sf-pro-regular text-base text-[#4D4D4D] mt-2">
              The personal information that we collect depends on the context of
              your interactions with us and the [app/service], the choices you
              make, and the products and features you use.
            </Text>

            <Text className="font-sf-pro-semibold text-lg text-[#1F1D1D] mt-6">
              1.Information we collect
            </Text>
            <Text className="font-sf-pro-regular text-base text-[#4D4D4D] mt-2">
              The personal information that we collect depends on the context of
              your interactions with us and the [app/service], the choices you
              make, and the products and features you use.
            </Text>

            <Text className="font-sf-pro-semibold text-lg text-[#1F1D1D] mt-6">
              2.Information use collect
            </Text>
            <Text className="font-sf-pro-regular text-base text-[#4D4D4D] mt-2">
              We process your personal information for these purposes in
              reliance on our legitimate business interests, in order to enter
              into or perform a contract with you,
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
