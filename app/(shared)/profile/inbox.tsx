import ScreenHeader from "@/components/ScreenHeader";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
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

const Inbox = () => {
  const router = useRouter();

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
            {/* chat list */}
            <TouchableOpacity
              onPress={handleNavigation}
              className="flex-row justify-between mt-4 items-center"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/94.jpg",
                    // uri: "https://ui-avatars.com/api/?name=ALEX&size=512",
                  }}
                  contentFit="cover"
                  style={{ width: 46, height: 46, borderRadius: 25 }}
                />
                <View>
                  <Text className="font-sf-pro-medium text-sm text-[#031731]">
                    Stephen Yustiono
                  </Text>
                  <Text className="font-sf-pro-regular text-xs text-[#A2A2A2]">
                    Nice. I don't know why I ...
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-xs text-[#0F73F7] font-sf-pro-medium">
                  09:30
                </Text>
                <View className="ml-2 bg-[#0F73F7] w-5 h-5 rounded-full items-center justify-center mt-1">
                  <Text className="text-center text-xs text-white">1</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* chat list */}
            <TouchableOpacity
              onPress={handleNavigation}
              className="flex-row justify-between mt-4 items-center"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/95.jpg",
                    // uri: "https://ui-avatars.com/api/?name=ALEX&size=512",
                  }}
                  contentFit="cover"
                  style={{ width: 46, height: 46, borderRadius: 25 }}
                />
                <View>
                  <Text className="font-sf-pro-medium text-sm text-[#031731]">
                    Stephen Yustiono
                  </Text>
                  <Text className="font-sf-pro-regular text-xs text-[#A2A2A2]">
                    Nice. I don't know why I ...
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-xs text-[#0F73F7] font-sf-pro-medium">
                  09:30
                </Text>
                <View className="ml-2 bg-[#0F73F7] w-5 h-5 rounded-full items-center justify-center mt-1">
                  <Text className="text-center text-xs text-white">1</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* chat list */}
            <TouchableOpacity
              onPress={handleNavigation}
              className="flex-row justify-between mt-4 items-center"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/96.jpg",
                    // uri: "https://ui-avatars.com/api/?name=ALEX&size=512",
                  }}
                  contentFit="cover"
                  style={{ width: 46, height: 46, borderRadius: 25 }}
                />
                <View>
                  <Text className="font-sf-pro-medium text-sm text-[#031731]">
                    Stephen Yustiono
                  </Text>
                  <Text className="font-sf-pro-regular text-xs text-[#A2A2A2]">
                    Nice. I don't know why I ...
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-xs text-[#7A7A7A] font-sf-pro-medium">
                  09:30
                </Text>
                {/* <View className="ml-2 bg-[#0F73F7] w-5 h-5 rounded-full items-center justify-center mt-1">
                  <Text className="text-center text-xs text-white">1</Text>
                </View> */}
              </View>
            </TouchableOpacity>

            {/* chat list */}
            <TouchableOpacity
              onPress={handleNavigation}
              className="flex-row justify-between mt-4 items-center"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/97.jpg",
                    // uri: "https://ui-avatars.com/api/?name=ALEX&size=512",
                  }}
                  contentFit="cover"
                  style={{ width: 46, height: 46, borderRadius: 25 }}
                />
                <View>
                  <Text className="font-sf-pro-medium text-sm text-[#031731]">
                    Stephen Yustiono
                  </Text>
                  <Text className="font-sf-pro-regular text-xs text-[#A2A2A2]">
                    Nice. I don't know why I ...
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-xs text-[#7A7A7A] font-sf-pro-medium">
                  09:30
                </Text>
                {/* <View className="ml-2 bg-[#0F73F7] w-5 h-5 rounded-full items-center justify-center mt-1">
                  <Text className="text-center text-xs text-white">1</Text>
                </View> */}
              </View>
            </TouchableOpacity>

            {/* chat list */}
            <TouchableOpacity
              onPress={handleNavigation}
              className="flex-row justify-between mt-4 items-center"
            >
              <View className="flex-row items-center gap-4">
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/98.jpg",
                    // uri: "https://ui-avatars.com/api/?name=ALEX&size=512",
                  }}
                  contentFit="cover"
                  style={{ width: 46, height: 46, borderRadius: 25 }}
                />
                <View>
                  <Text className="font-sf-pro-medium text-sm text-[#031731]">
                    Stephen Yustiono
                  </Text>
                  <Text className="font-sf-pro-regular text-xs text-[#A2A2A2]">
                    Nice. I don't know why I ...
                  </Text>
                </View>
              </View>
              <View>
                <Text className="text-xs text-[#7A7A7A] font-sf-pro-medium">
                  09:30
                </Text>
                {/* <View className="ml-2 bg-[#0F73F7] w-5 h-5 rounded-full items-center justify-center mt-1">
                  <Text className="text-center text-xs text-white">1</Text>
                </View> */}
              </View>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Inbox;
