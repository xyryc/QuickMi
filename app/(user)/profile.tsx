import {
  Entypo,
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
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  const [image, setImage] = useState<string | null>(null);

  // Logout Confirmation Modal
  const logoutConfirmRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  // Open logout confirmation
  const handleLogoutPress = useCallback(() => {
    logoutConfirmRef.current?.present();
  }, []);

  if (loading || !role) {
    return <ActivityIndicator size="small" color="#0F73F7" />;
  }

  // Function to handle image selection
  const pickImageAsync = async () => {
    // Request media library permissions
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    // Ask user if they want to take a photo or choose from gallery
    Alert.alert(
      "Choose Option",
      "Select an option to set your profile picture",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
            });

            if (!result.canceled) {
              setImage(result.assets[0].uri);
            }
          },
        },
        {
          text: "Choose from Gallery",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
            });

            if (!result.canceled) {
              setImage(result.assets[0].uri);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

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
              className="px-5"
              contentContainerStyle={{
                paddingBottom: 120,
              }}
              showsVerticalScrollIndicator={false}
            >
              {/* Personal info */}
              <View className="mt-8 bg-white rounded-xl p-3.5 border-spacing-0.5 border-[#E3E6F0] shadow-md">
                <View className="items-center">
                  <View className="relative">
                    <Image
                      source={
                        image ||
                        "https://media.licdn.com/dms/image/v2/D5603AQFMeZ7i9ybZgw/profile-displayphoto-shrink_800_800/B56ZS29wLQHwAc-/0/1738236429558?e=1770249600&v=beta&t=0nlbdSQ74HEjCtyxgSTP_NJoSP6xCo7-D4etNNaME30"
                      }
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 100,
                      }}
                      contentFit="cover"
                    />
                    <Ionicons
                      className="absolute right-1 bottom-2 bg-[#0F73F7] p-1 border border-white rounded-full"
                      name="camera-outline"
                      size={16}
                      color="white"
                      onPress={pickImageAsync}
                    />
                  </View>
                </View>

                {/* Profile name */}
                <Text className="text-center mt-3.5 font-sf-pro-semibold text-xl text-black">
                  Md Talath Un Nabi Anik
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
                <Text className="mt-6 text-lg font-sf-pro-semibold">
                  Account Information
                </Text>

                <TouchableOpacity
                  onPress={() => router.push("/profile/personal-info")}
                  className="flex-row items-center gap-2 mt-2"
                >
                  <MaterialCommunityIcons
                    name="account-edit-outline"
                    size={24}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-semibold text-[#4D4D4D]">
                    Personal Information
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Saved places */}
              <View className="mt-3.5 bg-white rounded-xl p-3.5 border-0.5 border-[#E3E6F0] shadow-md">
                <Text className="text-lg font-sf-pro-semibold mb-4">
                  Saved place
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(user)/profile/home-location")}
                  className="flex-row items-center gap-2"
                >
                  <Ionicons name="home-outline" size={24} color="#4D4D4D" />
                  <Text className="font-sf-pro-semibold text-[#4D4D4D]">
                    Enter home location
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/profile/work-location")}
                  className="flex-row items-center gap-2 my-5"
                >
                  <Ionicons
                    name="briefcase-outline"
                    size={24}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-semibold text-[#4D4D4D]">
                    Enter work location
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/profile/add-place")}
                  className="flex-row items-center gap-2"
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-semibold text-[#4D4D4D]">
                    Add a place
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Settings */}
              <View className="mt-3.5 bg-white rounded-xl p-3.5 border-spacing-0.5 border-[#E3E6F0] shadow-md">
                <Text className="text-lg font-sf-pro-semibold mb-4">
                  Settings
                </Text>

                <TouchableOpacity
                  onPress={() => router.push("/profile/permission")}
                  className="flex-row items-center gap-2 mb-5"
                >
                  <MaterialCommunityIcons
                    name="shield-check-outline"
                    size={24}
                    color="#4D4D4D"
                  />
                  <Text className="font-sf-pro-semibold text-[#4D4D4D]">
                    Permission
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/(shared)/settings/settings")}
                  className="flex-row items-center gap-2"
                >
                  <Ionicons name="settings-outline" size={24} color="#4D4D4D" />
                  <Text className="font-sf-pro-semibold text-[#4D4D4D]">
                    Settings
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Logout */}
              <TouchableOpacity
                onPress={handleLogoutPress}
                className="mt-3.5 mb-5 bg-white rounded-xl p-3.5 border-0.5 border-[#E3E6F0] elevation-md"
              >
                <View className="flex-row items-center gap-2">
                  <Ionicons name="exit-outline" size={24} color="#4D4D4D" />
                  <Text className="font-sf-pro-semibold text-[#4D4D4D]">
                    Log Out
                  </Text>
                </View>
              </TouchableOpacity>
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
          backdropComponent={({ style }) => (
            <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
          )}
        >
          <BottomSheetView
            className="px-5"
            style={{ paddingBottom: insets.bottom + 100 }}
          >
            <Text className="text-lg font-sf-pro-semibold text-center text-[#031731]">
              Log Out
            </Text>

            <Text className="text-base font-sf-pro-medium text-center">
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
