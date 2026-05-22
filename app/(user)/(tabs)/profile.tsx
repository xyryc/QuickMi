import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

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

import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import { useGetMeQuery } from "@/store/api/authApi";
import { clearAuthTokens, setAuthCompleted } from "@/utils/storage";
import { useUserRole } from "@/utils/useUserRole";

const Profile = () => {
  const { data, isLoading, isFetching, error, refetch } = useGetMeQuery();

  const { role, loading } = useUserRole();
  const insets = useSafeAreaInsets();
  const [profilePhotoUri, setProfilePhotoUri] = useState(
    "https://randomuser.me/api/portraits/men/10.jpg",
  );

  // logout Confirmation Modal
  const logoutConfirmRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  // open logout confirmation
  const handleLogoutPress = useCallback(() => {
    logoutConfirmRef.current?.present();
  }, []);

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

      if (!result.canceled && result.assets?.[0]?.uri) {
        setProfilePhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Photo Error", "Could not update profile photo.");
    }
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
      id: "support",
      title: "Support",
      subtitle: "Help and support",
      icon: <Ionicons name="person-circle-sharp" size={18} color="#0F73F7" />,
      onPress: () => router.push("/(shared)/profile/inbox"),
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
      onPress: () => router.push("/profile/personal-info"),
    },
  ];

  const savedPlaceItems = [
    {
      id: "home",
      label: "Home location",
      sub: "Enter home location",
      icon: <Feather name="home" size={18} color="#4D4D4D" />,
      onPress: () => router.push("/(user)/profile/home-location"),
    },
    {
      id: "work",
      label: "Work location",
      sub: "Enter work location",
      icon: <Feather name="briefcase" size={18} color="#4D4D4D" />,
      onPress: () => router.push("/profile/work-location"),
    },
    {
      id: "add-place",
      label: "Add place",
      sub: "Save frequent destination",
      icon: <SimpleLineIcons name="location-pin" size={18} color="#4D4D4D" />,
      onPress: () => router.push("/profile/add-place"),
    },
  ];

  const settingsItems = [
    {
      id: "payments",
      label: "Promos & Offers",
      icon: (
        <MaterialCommunityIcons
          name="ticket-percent-outline"
          size={18}
          color="#4D4D4D"
        />
      ),
      onPress: () => router.push("/(user)/profile/payment/payments"),
    },
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
      onPress: () => router.push("/profile/permission"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Ionicons name="settings-outline" size={18} color="#4D4D4D" />,
      onPress: () => router.push("/(shared)/settings/settings"),
    },
  ];

  if (loading || !role) {
    return <ActivityIndicator size="small" color="#0F73F7" />;
  }

  const handleLogout = async () => {
    try {
      await clearAuthTokens();
      await setAuthCompleted(false);

      router.replace("/(auth)/signup");
    } catch (e) {
      Alert.alert("Logout failed", "Please try again.");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            {/* Hero */}
            <View className="mt-7 bg-white rounded-3xl p-4 border border-[#E6EBF5]">
              <View className="self-center">
                <TouchableOpacity onPress={handleChangePhoto}>
                  <Image
                    source={
                      data?.data?.profileImag
                        ? { uri: data.data.profileImag }
                        : require("@/assets/images/user.webp")
                    }
                    style={{
                      height: 74,
                      width: 74,
                      borderRadius: 999,
                    }}
                    contentFit="cover"
                  />
                </TouchableOpacity>
              </View>

              <Text className="mt-3 text-center font-sf-pro-semibold text-2xl text-[#031731]">
                {data?.data?.fullName}
              </Text>
              <Text className="mt-1 text-center font-sf-pro-medium text-sm text-[#6D7A8B]">
                {data?.data?.phone}
              </Text>
            </View>

            {/* Quick actions */}
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
              onPress={() => router.replace("/(agent)/home")}
              title="Switch to Agent Mode"
              className="mt-3.5"
              icon={<Ionicons name="car-outline" size={20} color="white" />}
              iconPosition="left"
            />

            {/* Section card helper */}
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
                Saved Places
              </Text>
              {savedPlaceItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={item.onPress}
                  className="px-4 py-3.5 flex-row items-center"
                >
                  <View className="w-8 h-8 rounded-full bg-[#F5F7FB] items-center justify-center">
                    {item.icon}
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-sm text-[#334155] font-sf-pro-medium">
                      {item.label}
                    </Text>
                    <Text className="mt-0.5 text-xs text-[#94A3B8] font-sf-pro-medium">
                      {item.sub}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                  {index !== savedPlaceItems.length - 1 ? (
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
          style={{ paddingBottom: insets.bottom + 24 }}
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
                handleLogout();
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
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
