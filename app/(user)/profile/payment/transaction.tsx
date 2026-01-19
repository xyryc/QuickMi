import ScreenHeader from "@/components/ScreenHeader";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

const TransactionHistory = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Transaction History" />

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
            {/* Transactions history Withdraw */}
            <TouchableOpacity className="border border-[#E3E6F0] bg-white flex-row items-center justify-between mt-2 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Feather
                  name="arrow-up-right"
                  size={24}
                  color="green"
                  className="bg-white border border-[#0F73F724] rounded-full p-2"
                />
                <View className="ml-3">
                  <Text className="font-sf-pro-semibold text-[#222222]">
                    Withdraw
                  </Text>

                  <Text className="font-sf-pro-regular text-xs text-[#6B6B6B]">
                    Today at 09:20 am
                  </Text>
                </View>
              </View>
              <View>
                <Text className="font-sf-pro-semibold text-base text-[#0F73F7]">
                  $570.00
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="border border-[#E3E6F0] bg-white flex-row items-center justify-between mt-2 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Feather
                  name="arrow-down-right"
                  size={24}
                  color="red"
                  className="bg-white border border-[#0F73F724] rounded-full p-2"
                />
                <View className="ml-3">
                  <Text className="font-sf-pro-semibold text-[#222222]">
                    Withdraw
                  </Text>

                  <Text className="font-sf-pro-regular text-xs text-[#6B6B6B]">
                    Today at 09:20 am
                  </Text>
                </View>
              </View>
              <View>
                <Text className="font-sf-pro-semibold text-base text-[#0F73F7]">
                  $570.00
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="border border-[#E3E6F0] bg-white flex-row items-center justify-between mt-2 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Feather
                  name="arrow-up-right"
                  size={24}
                  color="green"
                  className="bg-white border border-[#0F73F724] rounded-full p-2"
                />
                <View className="ml-3">
                  <Text className="font-sf-pro-semibold text-[#222222]">
                    Withdraw
                  </Text>

                  <Text className="font-sf-pro-regular text-xs text-[#6B6B6B]">
                    Today at 09:20 am
                  </Text>
                </View>
              </View>
              <View>
                <Text className="font-sf-pro-semibold text-base text-[#0F73F7]">
                  $570.00
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="border border-[#E3E6F0] bg-white flex-row items-center justify-between mt-2 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Feather
                  name="arrow-down-right"
                  size={24}
                  color="red"
                  className="bg-white border border-[#0F73F724] rounded-full p-2"
                />
                <View className="ml-3">
                  <Text className="font-sf-pro-semibold text-[#222222]">
                    Withdraw
                  </Text>

                  <Text className="font-sf-pro-regular text-xs text-[#6B6B6B]">
                    Today at 09:20 am
                  </Text>
                </View>
              </View>
              <View>
                <Text className="font-sf-pro-semibold text-base text-[#0F73F7]">
                  $570.00
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="border border-[#E3E6F0] bg-white flex-row items-center justify-between mt-2 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Feather
                  name="arrow-up-right"
                  size={24}
                  color="green"
                  className="bg-white border border-[#0F73F724] rounded-full p-2"
                />
                <View className="ml-3">
                  <Text className="font-sf-pro-semibold text-[#222222]">
                    Withdraw
                  </Text>

                  <Text className="font-sf-pro-regular text-xs text-[#6B6B6B]">
                    Today at 09:20 am
                  </Text>
                </View>
              </View>
              <View>
                <Text className="font-sf-pro-semibold text-base text-[#0F73F7]">
                  $570.00
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="border border-[#E3E6F0] bg-white flex-row items-center justify-between mt-2 p-4 rounded-xl">
              <View className="flex-row items-center">
                <Feather
                  name="arrow-up-right"
                  size={24}
                  color="green"
                  className="bg-white border border-[#0F73F724] rounded-full p-2"
                />
                <View className="ml-3">
                  <Text className="font-sf-pro-semibold text-[#222222]">
                    Withdraw
                  </Text>

                  <Text className="font-sf-pro-regular text-xs text-[#6B6B6B]">
                    Today at 09:20 am
                  </Text>
                </View>
              </View>
              <View>
                <Text className="font-sf-pro-semibold text-base text-[#0F73F7]">
                  $570.00
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default TransactionHistory;
