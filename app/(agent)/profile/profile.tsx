import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import {
  useGetMeQuery,
  useUploadProfileImageMutation,
} from "@/store/api/authApi";
import { clearAuthTokens, setAuthCompleted } from "@/utils/storage";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
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
  const { data, isLoading, isFetching, error, refetch } = useGetMeQuery();
  const [uploadProfileImage, { isLoading: isUploading }] =
    useUploadProfileImageMutation();

  const insets = useSafeAreaInsets();
  const logoutConfirmRef = useRef<BottomSheetModal>(null);
  const confirmSnapPoints = useMemo(() => ["40%"], []);

  const handleLogoutPress = useCallback(() => {
    logoutConfirmRef.current?.present();
  }, []);

  const handleLogout = async () => {
    try {
      await clearAuthTokens();
      await setAuthCompleted(false);

      router.replace("/(auth)/signup");
    } catch (e) {
      Alert.alert("Logout failed", "Please try again.");
    }
  };

  const handleCancelLogout = useCallback(() => {
    logoutConfirmRef.current?.dismiss();
  }, []);

  const quickActions = [
    {
      id: "inbox",
      title: "Inbox",
      subtitle: "Messages and updates",
      icon: (
        <Ionicons name="chatbox-ellipses-outline" size={18} color="#0F73F7" />
      ),
      onPress: () => router.push("/(shared)/profile/inbox"),
    },
    {
      id: "wallet",
      title: "Wallet",
      subtitle: "Balance and payouts",
      icon: <Ionicons name="wallet-outline" size={18} color="#0F73F7" />,
      onPress: () => router.push("/(agent)/profile/wallet/wallet"),
    },
  ];

  const accountItems = [
    {
      id: "personal",
      label: "Personal Information",
      icon: (
        <MaterialCommunityIcons
          name="account-edit-outline"
          size={18}
          color="#4D4D4D"
        />
      ),
      onPress: () => router.push("/(shared)/profile/personal-info"),
    },
    {
      id: "rides",
      label: "My Ride",
      icon: <Ionicons name="car-outline" size={18} color="#4D4D4D" />,
      onPress: () => router.push("/(agent)/profile/ride/ride"),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Ionicons name="notifications-outline" size={18} color="#4D4D4D" />,
      onPress: () => router.push("/(shared)/notification"),
    },
  ];

  const settingsItems = [
    {
      id: "permission",
      label: "Permission",
      icon: (
        <MaterialCommunityIcons
          name="shield-check-outline"
          size={18}
          color="#4D4D4D"
        />
      ),
      onPress: () => router.push("/(shared)/profile/permission"),
    },
    {
      id: "support",
      label: "Support Requests",
      icon: <MaterialIcons name="support-agent" size={18} color="#4D4D4D" />,
      onPress: () => router.push("/(shared)/settings/support-requests"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Ionicons name="settings-outline" size={18} color="#4D4D4D" />,
      onPress: () => router.push("/(shared)/settings/settings"),
    },
  ];

  const handleChangePhoto = useCallback(async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission Required",
          "Allow photo access to update profile picture.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });

      const formData = new FormData();
      const asset = result.assets?.[0];
      if (!asset?.uri) return;

      formData.append("profileImage", {
        uri: asset.uri,
        name: asset.fileName || `profile-${Date.now()}.jpg`,
        type: asset.mimeType || "image/jpeg",
      } as any);

      await uploadProfileImage(formData).unwrap();
      await refetch();
    } catch (error) {
      Alert.alert("Photo Error", "Could not update profile photo.");
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1" edges={["left", "right", "bottom"]}>
        <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

        <LinearGradient
          colors={["#D3E6FF", "#FFFFFF"]}
          locations={[0.3, 1]}
          style={{ flex: 1, paddingTop: insets.top }}
        >
          <ScrollView
            className="mx-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <View className="mt-3 flex-row justify-between items-center">
              <Text className="font-sf-pro-semibold text-[30px] text-[#031731]">
                Account
              </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <AntDesign
                  name="close"
                  size={16}
                  color="black"
                  className="bg-white p-2 rounded-full"
                />
              </TouchableOpacity>
            </View>

            <View className="mt-4 bg-white rounded-3xl p-4 border border-[#E6EBF5]">
              <View className="self-center">
                <TouchableOpacity onPress={handleChangePhoto}>
                  <Image
                    source={
                      data?.data?.profileImag
                        ? { uri: data.data.profileImag }
                        : require("@/assets/images/user.webp")
                    }
                    style={{ height: 74, width: 74, borderRadius: 999 }}
                    contentFit="cover"
                  />
                </TouchableOpacity>
              </View>

              <Text className="mt-3 text-center font-sf-pro-semibold text-2xl text-[#031731]">
                {data?.data?.fullName || "Username"}
              </Text>

              <View className="mt-1 flex-row justify-center items-center">
                <AntDesign name="star" size={14} color="#FFD700" />
                <Text className="ml-1 font-sf-pro-medium text-sm text-[#1F1D1D]">
                  3.35
                </Text>
                <Text className="mx-2 text-[#94A3B8]">|</Text>
                <Text className="font-sf-pro-regular text-sm text-[#4D4D4D]">
                  150 Deliveries
                </Text>
              </View>
            </View>

            <View className="mt-3.5 flex-row gap-2">
              {quickActions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={item.onPress}
                  className="flex-1 bg-white rounded-2xl p-3.5 border border-[#E6EBF5]"
                >
                  <View className="w-8 h-8 rounded-full bg-[#EEF5FF] items-center justify-center">
                    {item.icon}
                  </View>
                  <Text className="mt-2.5 text-[#031731] text-sm font-sf-pro-semibold">
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-[#6D7A8B] text-[11px] font-sf-pro-medium">
                    {item.subtitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <ButtonPrimary
              onPress={() => router.replace("/(user)/(tabs)/home")}
              title="Switch to User Mode"
              className="mt-3.5"
              icon={<Feather name="user" size={18} color="white" />}
              iconPosition="left"
            />

            <View className="mt-3.5 bg-white rounded-2xl border border-[#E6EBF5]">
              <Text className="px-4 pt-4 pb-2 text-[#031731] text-base font-sf-pro-semibold">
                Account
              </Text>
              {accountItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={item.onPress}
                  className="px-4 py-3.5 flex-row items-center"
                >
                  <View className="w-8 h-8 rounded-full bg-[#F5F7FB] items-center justify-center">
                    {item.icon}
                  </View>
                  <Text className="ml-3 flex-1 text-sm text-[#334155] font-sf-pro-medium">
                    {item.label}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                  {index !== accountItems.length - 1 ? (
                    <View style={styles.rowDivider} />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>

            <View className="mt-3.5 bg-white rounded-2xl border border-[#E6EBF5]">
              <Text className="px-4 pt-4 pb-2 text-[#031731] text-base font-sf-pro-semibold">
                Preferences
              </Text>
              {settingsItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={item.onPress}
                  className="px-4 py-3.5 flex-row items-center"
                >
                  <View className="w-8 h-8 rounded-full bg-[#F5F7FB] items-center justify-center">
                    {item.icon}
                  </View>
                  <Text className="ml-3 flex-1 text-sm text-[#334155] font-sf-pro-medium">
                    {item.label}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                  {index !== settingsItems.length - 1 ? (
                    <View style={styles.rowDivider} />
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              className="mt-3.5 mb-5 bg-white rounded-2xl border border-[#FAD7D7] px-4 py-4 flex-row items-center"
              onPress={handleLogoutPress}
            >
              <View className="w-8 h-8 rounded-full bg-[#FFF1F1] items-center justify-center">
                <Ionicons name="exit-outline" size={16} color="#DC2626" />
              </View>
              <Text className="ml-3 text-sm text-[#DC2626] font-sf-pro-semibold">
                Log Out
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <BottomSheetModal
            ref={logoutConfirmRef}
            index={0}
            snapPoints={confirmSnapPoints}
            enablePanDownToClose
            backdropComponent={({ style }) => (
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            )}
          >
            <BottomSheetView
              className="mx-5"
              style={{ paddingBottom: insets.bottom + 24 }}
            >
              <Text className="text-lg font-sf-pro-semibold text-center text-[#031731]">
                Log Out
              </Text>
              <Text className="text-center mt-4 text-[#031731] font-sf-pro-regular text-sm">
                Are you sure you want to logout?
              </Text>

              <View className="flex-row mt-5 gap-3">
                <ButtonSecondary
                  title="No"
                  className="flex-1"
                  onPress={handleCancelLogout}
                />
                <ButtonPrimary
                  title="Yes"
                  className="flex-1"
                  onPress={handleLogout}
                />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </LinearGradient>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  rowDivider: {
    position: "absolute",
    left: 48,
    right: 16,
    bottom: 0,
    height: 1,
    backgroundColor: "#EEF2F7",
  },
});
