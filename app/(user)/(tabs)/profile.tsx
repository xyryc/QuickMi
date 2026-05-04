import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import { useUserRole } from "@/utils/useUserRole";

const Profile = () => {
  const { role, loading } = useUserRole();
  const insets = useSafeAreaInsets();

  // Logout Confirmation Modal
  const logoutConfirmRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  // Open logout confirmation
  const handleLogoutPress = useCallback(() => {
    logoutConfirmRef.current?.present();
  }, []);

  if (loading || !role) {
    return <ActivityIndicator size="small" color="#0F73F7" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
          <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

          <LinearGradient
            colors={["#D3E6FF", "#FFFFFF"]}
            locations={[0.3, 1]}
            style={{ flex: 1 }}
          >
            <ScrollView
              className="mx-5"
              contentContainerStyle={{
                paddingBottom: 120,
              }}
              showsVerticalScrollIndicator={false}
            >
              {/* Personal info */}
              <View className="mt-8 bg-white rounded-xl p-3.5 border-spacing-0.5 border-[#E3E6F0] shadow-md">
                <View className="flex items-center relative">
                  <Image
                    source={{
                      uri: "https://randomuser.me/api/portraits/men/10.jpg",
                    }}
                    style={{ height: 100, width: 100, borderRadius: 100 }}
                    contentFit="cover"
                  />
                  <Ionicons
                    className="absolute left-52 bottom-3 bg-[#0F73F7] p-1 border border-white rounded-full"
                    name="camera-outline"
                    size={16}
                    color="white"
                  />
                </View>

                {/* Profile name */}
                <Text className="text-center mt-3.5 font-sf-pro-medium text-xl text-black">
                  Darlene Robertson
                </Text>

                {/* Buttons */}
                <View className="flex-row gap-2 mt-4">
                  <ButtonSecondary
                    onPress={() => router.push("/(shared)/profile/inbox")}
                    iconPosition="left"
                    className="flex-1 !border !border-[#E3E6F0]"
                    title="Inbox"
                    icon={
                      <Ionicons
                        name="chatbox-ellipses-outline"
                        size={20}
                        color="#0F73F7"
                      />
                    }
                  />

                  <ButtonSecondary
                    onPress={() =>
                      router.push("/(user)/profile/payment/payments")
                    }
                    iconPosition="left"
                    className="flex-1 !border !border-[#E3E6F0]"
                    title="Payments"
                    icon={<Entypo name="wallet" size={20} color="#0F73F7" />}
                  />
                </View>

                <ButtonPrimary
                  onPress={() => router.replace("/(agent)/home")}
                  title="Switch to Agent mode"
                  className="mt-4"
                  icon={<Ionicons name="car-outline" size={22} color="white" />}
                  iconPosition="left"
                />

                {/* Account Information */}
                <Text className="mt-4 text-base font-sf-pro-medium">
                  Account Information
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/profile/personal-info")}
                  className="flex-row items-center gap-2 mt-5"
                >
                  <MaterialCommunityIcons
                    name="account-edit-outline"
                    size={20}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-medium text-sm text-[#4D4D4D]">
                    Personal Information
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Saved places */}
              <View className="mt-3.5 bg-white rounded-xl p-3.5 border-0.5 border-[#E3E6F0] shadow-md">
                <Text className="text-base font-sf-pro-medium mb-4">
                  Saved place
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(user)/profile/home-location")}
                  className="flex-row items-center gap-2"
                >
                  <Feather name="home" size={18} color="#4D4D4D" />
                  <Text className="font-sf-pro-medium text-sm text-[#4D4D4D]">
                    Enter home location
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/profile/work-location")}
                  className="flex-row items-center gap-2 my-5"
                >
                  <Feather name="briefcase" size={18} color="#4D4D4D" />
                  <Text className="font-sf-pro-medium text-sm text-[#4D4D4D]">
                    Enter Work location
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/profile/add-place")}
                  className="flex-row items-center gap-2"
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={18}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-medium text-sm text-[#4D4D4D]">
                    Add a place
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Settings */}
              <View className="mt-3.5 bg-white rounded-xl p-3.5 border-spacing-0.5 border-[#E3E6F0] shadow-md">
                <Text className="text-base font-sf-pro-medium mb-4">
                  Settings
                </Text>

                <TouchableOpacity
                  onPress={() => router.push("/profile/permission")}
                  className="flex-row items-center gap-2 mb-5"
                >
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={18}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-medium text-sm text-[#4D4D4D]">
                    Permission
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/(shared)/settings/settings")}
                  className="flex-row items-center gap-2"
                >
                  <Ionicons name="settings-outline" size={18} color="#4D4D4D" />
                  <Text className="font-sf-pro-medium text-sm text-[#4D4D4D]">
                    Settings
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Logout */}
              <View className="mt-3.5 mb-5 bg-[#ffffff] rounded-xl p-3.5 border-spacing-0.5 border-[#E3E6F0] shadow-md">
                <TouchableOpacity
                  className="flex-row items-center gap-2"
                  onPress={handleLogoutPress}
                >
                  <Ionicons name="exit-outline" size={18} color="#4D4D4D" />
                  <Text className="font-sf-pro-medium text-sm text-[#4D4D4D]">
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </LinearGradient>
        </SafeAreaView>

        <BottomSheetModal
          ref={logoutConfirmRef}
          snapPoints={snapPoints}
          index={0}
          enablePanDownToClose
          backgroundStyle={{ backgroundColor: "white" }}
          handleIndicatorStyle={{ backgroundColor: "#D1D5DB" }}
        >
          <BottomSheetView
            className="px-5"
            style={{ paddingBottom: insets.bottom + 120 }}
          >
            <Text className="text-lg font-sf-pro-semibold text-center mt-4">
              Are you sure you want to logout?
            </Text>

            <View className="flex-row gap-3 mt-6">
              <ButtonSecondary
                title="No"
                className="flex-1"
                onPress={() => logoutConfirmRef.current?.dismiss()}
              />

              <ButtonPrimary
                title="Yes"
                className="flex-1"
                onPress={() => {
                  logoutConfirmRef.current?.dismiss();
                  router.replace("/(auth)/signup");
                }}
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Profile;
