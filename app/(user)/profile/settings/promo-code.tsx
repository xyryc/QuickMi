import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
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

const PromoCode = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Promo code" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          {/* scrollable content */}
          <ScrollView
            className="flex-1 mx-5 "
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 120,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Image
              source={require("@/assets/images/logo.svg")}
              contentFit="contain"
              style={{ width: 175, height: 130 }}
            />
            <Text className="text-base font-sf-pro-regular text-center text-[#A2A2A2] mb-4 mt-8">
              You don’t have any promo code.
            </Text>
          </ScrollView>

          {/* button  */}
          <ButtonPrimary
            title="Apply Promo"
            className="mx-5 mb-32"
            iconPosition="left"
            icon={<AntDesign name="plus" size={20} color="white" />}
          />
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default PromoCode;
