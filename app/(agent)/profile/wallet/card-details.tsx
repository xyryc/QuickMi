import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
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

const CardDetails = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Card Details" />

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
            {/* Name of Card */}
            <Text className="mt-3.5 text-sm font-sf-pro-medium">
              Name on Card
            </Text>
            <TextInput
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
              placeholder="Name on card"
            />

            {/* Name of Card */}
            <Text className="mt-3.5 text-sm font-sf-pro-medium">
              Card Number
            </Text>
            <TextInput
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
              placeholder="123 456 789 012 3456"
              keyboardType="number-pad"
            />

            {/* Expiration Date */}
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="mt-3.5 text-sm font-sf-pro-medium">
                  Expiration Date
                </Text>
                <TextInput
                  className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
                  placeholder="MM/YY"
                />
              </View>

              {/* Expiration Date */}
              <View className="flex-1">
                {/* CVC */}
                <Text className="mt-3.5 text-sm font-sf-pro-medium">CVC</Text>
                <TextInput
                  className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
                  placeholder="123"
                  keyboardType="number-pad"
                />
              </View>
            </View>

            {/* Country */}
            <Text className="mt-3.5 text-sm font-sf-pro-medium">Country</Text>
            <TextInput
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
              placeholder="Bangladesh"
            />

            {/* Street Name And Number */}
            <Text className="mt-3.5 text-sm font-sf-pro-medium">
              Street Name And Number
            </Text>
            <TextInput
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
              placeholder="123 Main Street"
            />

            {/* Additional Address Details (optional) */}
            <Text className="mt-3.5 text-sm font-sf-pro-medium">
              Additional Address Details (optional)
            </Text>
            <TextInput
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
              placeholder="123 Main Street"
            />

            {/* City/Town */}
            <Text className="mt-3.5 text-sm font-sf-pro-medium">City/Town</Text>
            <TextInput
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
              placeholder="City"
            />

            {/* Postcode */}
            <Text className="mt-3.5 text-sm font-sf-pro-medium">Postcode</Text>
            <TextInput
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
              placeholder="123456"
              keyboardType="number-pad"
            />

            {/* Your information is secure */}
            <View className="bg-[#CFE3FD] rounded-xl mt-3 p-4 flex-row items-center gap-4">
              <View className="mb-3 relative">
                <FontAwesome6 name="user-large" size={24} color="#0F73F760" />
                <MaterialIcons
                  name="verified-user"
                  size={14}
                  color="#0F73F7"
                  className="absolute bottom-0 -right-2 "
                />
              </View>
              <View>
                <Text className=" text-base font-sf-pro-medium text-[#414141]">
                  Your information is secure and encrypted.
                </Text>
                <Text className="mt-3 text-sm text-[#414141]">
                  We use bank-level encryption and Stripe to {"\n"} protect your
                  payment information
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* save button  */}
          <ButtonPrimary title="Save" className="mx-5 mb-10" />
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default CardDetails;
