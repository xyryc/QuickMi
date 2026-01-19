import ScreenHeader from "@/components/ScreenHeader";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
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

const Payments = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Payments" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
          {/* scrollable content */}
          <ScrollView
            className="flex-1 mx-5 mt-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            {/* Transaction History */}
            <TouchableOpacity
              onPress={() => router.push("/(user)/profile/payment/transaction")}
              className="flex-row p-4 justify-between items-center bg-[#3F8FF9] rounded-lg"
            >
              <Text className="text-white font-sf-pro-medium">
                Transaction History
              </Text>
              <SimpleLineIcons name="arrow-right" size={14} color="white" />
            </TouchableOpacity>

            {/* Header */}
            <Text className="text-lg font-sf-pro-semibold mt-6 mb-2">
              Payment Method
            </Text>

            {/* Payment Methods List */}
            <View className="gap-3">
              <TouchableOpacity className="p-4 border border-[#005FDC24] rounded-xl">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="cash-outline" size={16} color="#008364" />
                  <Text className="font-sf-pro-medium text-base">Cash</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(shared)/profile/card-details")}
                className="p-4 border border-[#005FDC24] rounded-xl flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-2">
                  <AntDesign name="plus" size={16} color="black" />
                  <Text className="font-sf-pro-medium text-base">
                    Add debit/credit card
                  </Text>
                </View>

                <SimpleLineIcons name="arrow-right" size={14} color="black" />
              </TouchableOpacity>
            </View>

            {/* Header */}
            <Text className="text-lg font-sf-pro-semibold mt-6 mb-2">
              Offers
            </Text>

            {/* Payment Methods List */}
            <View className="gap-3">
              <TouchableOpacity
                onPress={() => router.push("/(shared)/settings/promo-code")}
                className="p-4 border border-[#005FDC24] rounded-xl"
              >
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="ticket-confirmation-outline"
                    size={16}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-medium text-base">
                    Promo code
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  router.push("/(user)/profile/payment/refer-discount")
                }
                className="p-4 border border-[#005FDC24] rounded-xl flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="percent-circle-outline"
                    size={16}
                    color="black"
                  />
                  <Text className="font-sf-pro-medium text-base">
                    Refer & get discount
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Payments;
