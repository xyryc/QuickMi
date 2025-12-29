import ScreenHeader from "@/components/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsCondition = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.2]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Terms & Condition" />

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
            <View className="mt-8">
              <Text className="font-sf-pro-medium text-base text-[#1F1D1D]">
                Welcome to Services App !
              </Text>
              <Text className="text-sm font-sf-pro-regular text-[#4D4D4D] mt-6">
                Accessing or using our services, you agree to be bound by these
                Terms of Service. If you do not agree with any part of the
                terms, you must not use our services.
              </Text>

              <Text className="font-sf-pro-medium text-base text-[#1F1D1D] mt-6">
                2. User Responsibilities As a user, you agree to:
              </Text>
              <Text className="text-sm font-sf-pro-regular text-[#4D4D4D] mt-3">
                . Use the service only for lawful purposes.
              </Text>
              <Text className="text-sm font-sf-pro-regular text-[#4D4D4D] mt-3">
                . Provide accurate and complete information when required.
              </Text>
              <Text className="text-sm font-sf-pro-regular text-[#4D4D4D] mt-3">
                . Maintain the confidentiality of your account password.
              </Text>

              <Text className="font-sf-pro-medium text-base text-[#1F1D1D] mt-6">
                3. Intellectual Property
              </Text>
              <Text className="text-sm font-sf-pro-regular text-[#4D4D4D] mt-3">
                All content, trademarks, and data on this service, including but
                not limited to text, graphics, logos, and images, are the
                property of [Your Company Name]
              </Text>

              <Text className="font-sf-pro-medium text-base text-[#1F1D1D] mt-6">
                4. Disclaimers
              </Text>
              <Text className="text-sm font-sf-pro-regular text-[#4D4D4D] mt-3">
                The service is provided on an "as is" and "as available" basis.
                [Your Company Name] makes no warranties, expressed or implied,
                regarding the operation.
              </Text>

              <Text className="font-sf-pro-medium text-base text-[#1F1D1D] mt-6">
                5. Disclaimers
              </Text>
              <Text className="text-sm font-sf-pro-regular text-[#4D4D4D] mt-3">
                The service is provided on an "as is" and "as available" basis.
                [Your Company Name] makes no warranties, expressed or implied,
                regarding the operation.
              </Text>

              <Text className="font-sf-pro-medium text-base text-[#1F1D1D] mt-6">
                6. Disclaimers
              </Text>
              <Text className="text-sm font-sf-pro-regular text-[#4D4D4D] mt-3">
                The service is provided on an "as is" and "as available" basis.
                [Your Company Name] makes no warranties, expressed or implied,
                regarding the operation.
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default TermsCondition;
