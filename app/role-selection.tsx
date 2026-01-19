import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import { setHasSelectedRole } from "@/utils/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RoleSelection = () => {
  const router = useRouter();

  const handleRoleSelect = async (role: "user" | "agent") => {
    await setHasSelectedRole(role);

    router.replace("/(onboarding)/step1");
  };

  return (
    <SafeAreaView className="border flex-1" edges={["left", "right", "bottom"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.3]}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerClassName="mx-5 flex-1"
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("@/assets/images/role-selection.svg")}
            style={{
              width: 272,
              height: 216,
              marginBottom: 100,
            }}
            contentFit="contain"
          />

          <View className="mb-10 items-center">
            <Text className="font-sf-pro-semibold text-[26px] text-blue-600 leading-none">
              Welcome!
            </Text>
            <Text className="font-sf-pro-semibold text-[26px]">
              Select a role
            </Text>
          </View>

          <ButtonSecondary
            onPress={() => handleRoleSelect("user")}
            title="User"
            className="w-full mb-2"
            icon={
              <MaterialCommunityIcons
                name="package-check"
                size={20}
                color="#0F73F7"
              />
            }
            iconPosition="left"
          />

          <ButtonPrimary
            onPress={() => handleRoleSelect("agent")}
            title="Agent"
            className="w-full"
            icon={
              <MaterialCommunityIcons
                name="truck-delivery"
                size={20}
                color="white"
              />
            }
            iconPosition="left"
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RoleSelection;
