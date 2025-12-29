import { setHasSelectedRole } from "@/utils/storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RoleSelection = () => {
  const router = useRouter();

  const handleRoleSelect = async (role: "user" | "agent") => {
    await setHasSelectedRole(role);

    router.replace("/(onboarding)/step1");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-sf-pro-semibold text-center mb-3">
          Choose Your Role
        </Text>
        <Text className="text-center text-custom-gray-dark font-sf-pro-regular mb-12">
          Select how you want to use the app
        </Text>

        {/* User Card */}
        <TouchableOpacity
          onPress={() => handleRoleSelect("user")}
          className="bg-custom-blue-50 rounded-2xl p-6 mb-4 border-2      
  border-custom-blue-500"
        >
          <View className="items-center">
            <Ionicons name="person" size={48} color="#3B82F6" />
            <Text className="text-xl font-sf-pro-semibold mt-4 mb-2">
              I'm a User
            </Text>
            <Text
              className="text-center text-custom-gray-dark            
  font-sf-pro-regular"
            >
              Send and receive parcels with ease
            </Text>
          </View>
        </TouchableOpacity>

        {/* Agent Card */}
        <TouchableOpacity
          onPress={() => handleRoleSelect("agent")}
          className="bg-gray-50 rounded-2xl p-6 border-2                  
  border-gray-300"
        >
          <View className="items-center">
            <MaterialIcons name="delivery-dining" size={48} color="#6B7280" />
            <Text className="text-xl font-sf-pro-semibold mt-4 mb-2">
              I'm an Agent
            </Text>
            <Text
              className="text-center text-custom-gray-dark            
  font-sf-pro-regular"
            >
              Deliver parcels and earn money
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RoleSelection;
