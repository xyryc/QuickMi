import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { EvilIcons, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPlace = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Add a place" />

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
            <TextInput
              className="px-5 p-4 border border-[#E3E6F0] rounded-xl bg-white mt-5"
              placeholder="Add a place name"
            />
            <View className="flex-row justify-between items-center mt-4 px-4 py-1 border border-[#E3E6F0] rounded-xl bg-white">
              <View className="flex-row gap-1 items-center">
                <EvilIcons name="search" size={24} color="black" />
                <TextInput className="" placeholder="Search location" />
              </View>
              <Octicons name="location" size={20} color="#0F73F7" />
            </View>
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

export default AddPlace;
