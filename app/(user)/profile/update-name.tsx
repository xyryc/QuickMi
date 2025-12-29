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
import { SafeAreaView } from "react-native-safe-area-context";

const UpdateName = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Update your name" />

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
            <Text className="mt-5 text-sm">
              Please enter your name as it appears on your ID or {"\n"}passport.
            </Text>

            <Text className="mt-3.5 text-sm font-sf-pro-medium">
              First Name
            </Text>
            <TextInput className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white" />

            <Text className="mt-5 text-sm font-sf-pro-medium">Last Name</Text>
            <TextInput className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white" />
          </ScrollView>

          {/* bottom button */}
          <View className="px-5 pb-32">
            <ButtonPrimary title="Save" />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UpdateName;
