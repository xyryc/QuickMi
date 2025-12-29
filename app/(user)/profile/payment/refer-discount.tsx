import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView, // ✅ Import from react-native instead
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const ReferDiscount = () => {
  const referralLink = "https://yourapp.com/refer?code=USER123";

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Refer & get discount" />

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
            {/* card */}

            <View className="bg-white p-3 rounded-lg border border-[#E3E6F0] shadow-2xl elevation">
              <Text className="text-base font-sf-pro-regular text-[#031731]">
                Share Quickmi with a friend
              </Text>
              <Text className="text-xs font-sf-pro-regular text-[#585858] mt-2">
                Invite a friend to book a setter on Quickmi & {"\n"} you’ll both
                receiveus Promo in Quickmi.{"\n"} There are to ways to share.
              </Text>
              <Text className="text-base font-sf-pro-regular text-[#031731] mt-3">
                Scan your QR Code in person
              </Text>

              {/* qr code */}
              <View
                className="w-40 h-40 border bg-white mx-auto my-10 rounded-xl items-center justify-center "
                // ref={qrCodeContainerRef}
                collapsable={false}
              >
                <QRCode
                  value="https://www.facebook.com/mdalifkhandev" // ✅ এটি স্ক্যান করলে ব্রাউজার খুলবে
                  logoSVG={require("@/assets/images/logo.svg")}
                  size={110}
                  logoSize={30}
                  quietZone={0}
                  ecl="M"
                />
              </View>
              <Text className="text-base font-sf-pro-regular text-[#031731]">
                Share your referral link
              </Text>

              {/* link */}
              <View className="flex-row items-center justify-between mt-4">
                <Image
                  source={require("@/assets/images/logo.svg")}
                  style={{ height: 28, width: 38 }}
                  contentFit="contain"
                />
                <Text>Quickmi- 1535612.ambas-refer-a-friend</Text>
                <TouchableOpacity>
                  <Ionicons name="copy-outline" size={20} color="black" />
                </TouchableOpacity>
              </View>

              {/* button  */}
              <ButtonPrimary title={"Share Now"} className={"mt-4"} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ReferDiscount;
