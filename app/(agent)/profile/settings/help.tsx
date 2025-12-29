import ScreenHeader from "@/components/ScreenHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Help = () => {
  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Help" />

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
            {/* 1. How do I book a delivery? */}
            <TouchableOpacity className="flex-row justify-between border-b border-[#E3E6F0] items-center py-4 mt-3">
              <Text> 1. How do I book a delivery?</Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
            </TouchableOpacity>

            {/* 2. What items can I send? */}
            <TouchableOpacity className="flex-row justify-between border-b border-[#E3E6F0] items-center py-4 mt-3">
              <Text> 2. What items can I send?</Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
            </TouchableOpacity>

            {/* 3. What items are not allowed? */}
            <TouchableOpacity className="flex-row justify-between border-b border-[#E3E6F0] items-center py-4 mt-3">
              <Text> 3. What items are not allowed?</Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
            </TouchableOpacity>

            {/* 4. How much does delivery cost? */}
            <TouchableOpacity className="flex-row justify-between border-b border-[#E3E6F0] items-center py-4 mt-3">
              <Text> 4. How much does delivery cost?</Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
            </TouchableOpacity>

            {/* 5. Can I negotiate the delivery price? */}
            <TouchableOpacity className="flex-row justify-between border-b border-[#E3E6F0] items-center py-4 mt-3">
              <Text> 5. Can I negotiate the delivery price?</Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
            </TouchableOpacity>

            {/* 6. How do I track my delivery? */}
            <TouchableOpacity className="flex-row justify-between border-b border-[#E3E6F0] items-center py-4 mt-3">
              <Text> 6. How do I track my delivery?</Text>
              <MaterialIcons name="arrow-forward-ios" size={18} color="black" />
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Help;
