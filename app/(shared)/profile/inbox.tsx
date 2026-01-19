import ScreenHeader from "@/components/ScreenHeader";
import TabFilterSecondary from "@/components/TabFilterSecondary";
import { useUserRole } from "@/utils/useUserRole";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

const Inbox = () => {
  const { role } = useUserRole();
  const [activeTab, setActiveTab] = useState("chat");
  const router = useRouter();

  const tabs = [
    { id: "chat", label: "Chat", icon: "mail" },
    { id: "support", label: "Support", icon: "person-circle-sharp" },
  ];

  const handleNavigation = () => {
    router.push(`/(shared)/chat/chat`);
  };

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Inbox" />

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
            <View className="flex-row gap-4 mt-2.5">
              <TabFilterSecondary
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </View>

            {/* chat list */}
            <TouchableOpacity
              onPress={handleNavigation}
              className="flex-row justify-between mt-6 items-center"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/94.jpg",
                  }}
                  contentFit="cover"
                  style={{ width: 52, height: 52, borderRadius: 25 }}
                />
                <View>
                  <Text className="font-sf-pro-semibold text-lg text-[#031731]">
                    Stephen Yustiono
                  </Text>
                  <Text className="font-sf-pro-regular text-base text-[#A2A2A2]">
                    Nice. I don't know why I ...
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-[#0F73F7] font-sf-pro-medium">09:30</Text>
                <View className="ml-2 bg-[#0F73F7] w-5 h-5 rounded-full items-center justify-center mt-1">
                  <Text className="text-center text-xs text-white">1</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNavigation}
              className="flex-row justify-between mt-6 items-center"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/94.jpg",
                  }}
                  contentFit="cover"
                  style={{ width: 52, height: 52, borderRadius: 25 }}
                />
                <View>
                  <Text className="font-sf-pro-semibold text-lg text-[#031731]">
                    Stephen Yustiono
                  </Text>
                  <Text className="font-sf-pro-regular text-base text-[#A2A2A2]">
                    Nice. I don't know why I ...
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-[#0F73F7] font-sf-pro-medium">09:30</Text>
                <View className="ml-2 bg-[#0F73F7] w-5 h-5 rounded-full items-center justify-center mt-1">
                  <Text className="text-center text-xs text-white">1</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNavigation}
              className="flex-row justify-between mt-6 items-center"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/94.jpg",
                  }}
                  contentFit="cover"
                  style={{ width: 52, height: 52, borderRadius: 25 }}
                />
                <View>
                  <Text className="font-sf-pro-semibold text-lg text-[#031731]">
                    Stephen Yustiono
                  </Text>
                  <Text className="font-sf-pro-regular text-base text-[#A2A2A2]">
                    Nice. I don't know why I ...
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-[#0F73F7] font-sf-pro-medium">09:30</Text>
                <View className="ml-2 bg-[#0F73F7] w-5 h-5 rounded-full items-center justify-center mt-1">
                  <Text className="text-center text-xs text-white">1</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Inbox;
