import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
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

const Profile = () => {
  const insets = useSafeAreaInsets();
  // Logout Confirmation Modal
  const logoutConfirmRef = useRef<BottomSheetModal>(null);
  // Logout Success Modal

  const confirmSnapPoints = useMemo(() => ["40%"], []);

  // Open logout confirmation
  const handleLogoutPress = useCallback(() => {
    console.log("Opening logout confirmation modal...");
    logoutConfirmRef.current?.present();
  }, []);

  // Confirm logout
  const handleConfirmLogout = useCallback(() => {
    logoutConfirmRef.current?.dismiss();
    setTimeout(() => {
      router.replace("/(auth)/signup");
    }, 300);
  }, []);

  // Cancel logout
  const handleCancelLogout = useCallback(() => {
    logoutConfirmRef.current?.dismiss();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1" edges={["left", "right", "bottom"]}>
          <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

          <LinearGradient
            colors={["#D3E6FF", "#FFFFFF"]}
            locations={[0.3, 1]}
            style={{ flex: 1, paddingTop: insets.top }}
          >
            {/* history cards */}
            <ScrollView className="mx-5" showsVerticalScrollIndicator={false}>
              {/* account */}
              <View className="rounded-xl pt-4 border-spacing-0.5 border-[#E3E6F0] flex-row justify-between">
                <Text className="font-sf-pro-medium text-3xl">Account</Text>

                <TouchableOpacity onPress={() => router.back()}>
                  <AntDesign
                    name="close"
                    size={16}
                    color="black"
                    className="bg-white p-2 rounded-full"
                  />
                </TouchableOpacity>
              </View>

              {/* Personal info */}
              <View className="mt-4 bg-white rounded-xl p-3 border-0.5 border-[#E3E6F0]">
                {/* profile image */}
                <View className="flex-row gap-3 items-center p-4 bg-white shadow-2xl android:elevation-4 border-[0.5px] border-[#E3E6F0] elevation-lg rounded-lg">
                  <Image
                    source={{
                      uri: "https://randomuser.me/api/portraits/men/10.jpg",
                    }}
                    style={{
                      height: 55,
                      width: 55,
                      borderRadius: 100,
                    }}
                    contentFit="cover"
                  />

                  {/* details */}
                  <View>
                    <Text className="font-sf-pro-semibold text-[#031731]">
                      John Doe
                    </Text>

                    <View className="flex-row items-center gap-2">
                      <AntDesign name="star" size={14} color="#FFD700" />
                      <Text className="font-sf-pro-medium text-sm text-[#1F1D1D]">
                        3.35
                      </Text>
                      <Text>|</Text>
                      <Text className="font-sf-pro-medium text-sm text-[#4D4D4D]">
                        150 Delivery
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        router.push("/(shared)/profile/personal-info")
                      }
                    >
                      <Text className="font-sf-pro-regular text-sm text-[#0F73F7]">
                        Go to profile
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* secondary inbox button */}
                <View className="flex-row gap-2 mt-4">
                  <ButtonSecondary
                    onPress={() => router.push("/(shared)/profile/inbox")}
                    iconPosition="left"
                    className="flex-1 !border !border-[#E3E6F0]"
                    title="Inbox"
                    icon={
                      <Ionicons
                        name="chatbox-ellipses"
                        size={20}
                        color="#0F73F7"
                      />
                    }
                  />

                  {/* secondary Wallet button */}
                  <ButtonSecondary
                    onPress={() =>
                      router.push("/(agent)/profile/wallet/wallet")
                    }
                    iconPosition="left"
                    className="flex-1 !border !border-[#E3E6F0]"
                    title="Wallet"
                    icon={<Entypo name="wallet" size={20} color="#0F73F7" />}
                  />
                </View>
              </View>

              {/* Setting */}
              <View className="mt-3.5 bg-white rounded-xl p-3.5 border-spacing-0.5 border-[#E3E6F0] shadow-md">
                <TouchableOpacity
                  onPress={() => router.push("/(shared)/profile/permission")}
                  className="flex-row items-center gap-2 pb-3"
                >
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={24}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-semibold text-base text-[#4D4D4D]">
                    Permission
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/(agent)/profile/ride/ride")}
                  className="flex-row items-center gap-2 py-3"
                >
                  <Ionicons name="car-outline" size={24} color="#4D4D4D" />
                  <Text className="font-sf-pro-semibold text-base text-[#4D4D4D]">
                    My Ride
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/(agent)/profile/wallet/wallet")}
                  className="flex-row items-center gap-2 py-3"
                >
                  <Ionicons name="wallet-outline" size={24} color="#4D4D4D" />
                  <Text className="font-sf-pro-semibold text-base text-[#4D4D4D]">
                    Wallet
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/(shared)/notification")}
                  className="flex-row items-center gap-2 py-3"
                >
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-semibold text-base text-[#4D4D4D]">
                    Notifications
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    router.push("/(shared)/settings/support-requests")
                  }
                  className="flex-row items-center gap-2 py-3"
                >
                  <MaterialIcons
                    name="support-agent"
                    size={24}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-semibold text-base text-[#4D4D4D]">
                    Support Requests
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/(shared)/settings/settings")}
                  className="flex-row items-center gap-2 py-3"
                >
                  <Ionicons name="settings-outline" size={24} color="#4D4D4D" />
                  <Text className="font-sf-pro-semibold text-base text-[#4D4D4D]">
                    Settings
                  </Text>
                </TouchableOpacity>

                <View className="border-b border-[#A2A2A2] mb-3" />

                <TouchableOpacity
                  onPress={handleLogoutPress}
                  className="flex-row items-center gap-2 pt-3"
                >
                  <Ionicons name="exit-outline" size={24} color="#4D4D4D" />
                  <Text className="font-sf-pro-semibold text-base text-[#4D4D4D]">
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <ButtonPrimary
              onPress={() => router.replace("/(user)/home")}
              title=" Switch to User mode"
              className="mx-5"
              icon={<Feather name="user" size={18} color="white" />}
              iconPosition="left"
            />
          </LinearGradient>

          {/* CONFIRM LOGOUT MODAL */}
          <BottomSheetModal
            ref={logoutConfirmRef}
            index={0}
            snapPoints={confirmSnapPoints}
            enablePanDownToClose={true}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}
            backdropComponent={({ style }) => (
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            )}
          >
            <BottomSheetView
              className="mx-5"
              style={{
                paddingBottom: insets.bottom + 20,
              }}
            >
              <Text className="text-lg font-sf-pro-semibold text-center text-[#031731]">
                Log Out
              </Text>

              <Text className="text-center text-[#031731] font-sf-pro-medium">
                Are you sure you want to sure Logout?
              </Text>

              {/* Buttons */}
              <View className="flex-row mt-5 gap-3">
                <ButtonSecondary
                  title={"No"}
                  className={"flex-1"}
                  onPress={handleCancelLogout}
                />

                <ButtonPrimary
                  title={"Yes"}
                  className={"flex-1"}
                  onPress={handleConfirmLogout}
                />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Profile;
