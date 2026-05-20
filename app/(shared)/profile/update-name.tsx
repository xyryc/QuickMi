import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UpdateName = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Update your name" />

        <ScrollView
          className="flex-1 mx-5"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View>
            <Text className="mt-5 text-sm">
              Please enter your name as it appears on your ID or {"\n"}passport.
            </Text>

            <Text className="mt-3.5 text-sm font-sf-pro-medium">
              First Name
            </Text>
            <TextInput className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white" />

            <Text className="mt-5 text-sm font-sf-pro-medium">Last Name</Text>
            <TextInput className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white" />
          </View>

          <View style={{ flex: 1 }} />

          <View className="pb-8 pt-3">
            <ButtonPrimary title="Save" onPress={() => router.back()} />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UpdateName;
