import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ChangePassword = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Change Password" />

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
            <Text className="mt-2 font-sf-pro-medium">Current Password</Text>
            <TextInput
              placeholder="Enter old password"
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
            />

            <Text className="mt-4 font-sf-pro-medium">New Password</Text>
            <TextInput
              placeholder="Enter new password"
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
            />

            <Text className="mt-4 font-sf-pro-medium">Confirm Password</Text>
            <TextInput
              placeholder="Re-enter new password"
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
            />
          </ScrollView>

          {/* bottom button */}
          <View
            className="px-5"
            style={{
              marginBottom: insets.bottom + 20,
            }}
          >
            <ButtonPrimary title="Update password" />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ChangePassword;
