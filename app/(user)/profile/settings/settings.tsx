import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import ScreenHeader from "@/components/ScreenHeader";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useMemo, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  // Logout Confirmation Modal
  const deleteConfirmRef = useRef<BottomSheetModal>(null);
  // Logout Success Modal

  const confirmSnapPoints = useMemo(() => ["40%"], []);

  // Open logout confirmation
  const handleDeletePress = useCallback(() => {
    console.log("Opening logout confirmation modal...");
    deleteConfirmRef.current?.present();
  }, []);

  // Confirm logout (Yes button)
  const handleConfirmDelete = useCallback(() => {
    console.log("User confirmed Deleted");
    deleteConfirmRef.current?.dismiss();
    setTimeout(() => {
      router.push("/(user)/profile");
    }, 300);
  }, []);

  // Cancel logout (No button)
  const handleCancelDelete = useCallback(() => {
    console.log("User cancelled Deleted");
    deleteConfirmRef.current?.dismiss();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
          <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

          <LinearGradient
            colors={["#D3E6FF", "#FFFFFF"]}
            locations={[0, 0.2]}
            style={{ flex: 1 }}
          >
            <ScreenHeader title="Settings" />

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
                <View className="mt-8">
                  {/* change password */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push("/(user)/profile/settings/change-password")
                    }
                    className="flex-row justify-between border-b border-[#E3E6F0] items-center py-3 px-2 mt-2.5"
                  >
                    <Text className="text-sm font-sf-pro-regular text-[#031731]">
                      Change Password
                    </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={14}
                      color="black"
                    />
                  </TouchableOpacity>

                  {/* About Us */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push("/(user)/profile/settings/about")
                    }
                    className="flex-row justify-between border-b border-[#E3E6F0] items-center py-3 px-2 mt-2.5"
                  >
                    <Text className="text-sm font-sf-pro-regular text-[#031731]">
                      About Us
                    </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={14}
                      color="black"
                    />
                  </TouchableOpacity>

                  {/* Help */}
                  <TouchableOpacity
                    onPress={() => router.push("/(user)/profile/settings/help")}
                    className="flex-row justify-between border-b border-[#E3E6F0] items-center py-3 px-2 mt-2.5"
                  >
                    <Text className="text-sm font-sf-pro-regular text-[#031731]">
                      Help
                    </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={14}
                      color="black"
                    />
                  </TouchableOpacity>

                  {/* Support Requests */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push("/(user)/profile/settings/support-requests")
                    }
                    className="flex-row justify-between border-b border-[#E3E6F0] items-center py-3 px-2 mt-2.5"
                  >
                    <Text className="text-sm font-sf-pro-regular text-[#031731]">
                      Support Requests
                    </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={14}
                      color="black"
                    />
                  </TouchableOpacity>

                  {/* Privacy Policy */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push("/(user)/profile/settings/privacy-policy")
                    }
                    className="flex-row justify-between border-b border-[#E3E6F0] items-center py-3 px-2 mt-2.5"
                  >
                    <Text className="text-sm font-sf-pro-regular text-[#031731]">
                      Privacy Policy
                    </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={14}
                      color="black"
                    />
                  </TouchableOpacity>

                  {/* Terms of service */}
                  <TouchableOpacity
                    onPress={() =>
                      router.push("/(user)/profile/settings/terms-condition")
                    }
                    className="flex-row justify-between border-b border-[#E3E6F0] items-center py-3 px-2 mt-2.5"
                  >
                    <Text className="text-sm font-sf-pro-regular text-[#031731]">
                      Terms of service
                    </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={14}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* bottom button */}
              <View className="px-5 pb-32">
                <ButtonPrimary
                  title="Delete Account"
                  iconPosition="left"
                  icon={<Feather name="trash" size={18} color="white" />}
                  onPress={handleDeletePress}
                />
              </View>
            </KeyboardAvoidingView>
          </LinearGradient>

          {/* delete account */}
          <BottomSheetModal
            ref={deleteConfirmRef}
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
            <BottomSheetScrollView
              contentContainerStyle={{ paddingBottom: 40 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="px-6 py-4">
                <Text className="text-lg font-sf-pro-semibold text-center mt-2.5 text-[#031731]">
                  Delete Account
                </Text>

                <Text className="text-center mt-4 text-[#031731] font-sf-pro-regular text-sm">
                  Are you sure you want to sure delete your account?
                </Text>

                {/* Buttons */}
                <View className="flex-row mt-5 gap-3 mb-20">
                  <ButtonSecondary
                    title={"No"}
                    className={"flex-1"}
                    onPress={handleCancelDelete}
                  />

                  <ButtonPrimary
                    title={"Yes"}
                    className={"flex-1"}
                    onPress={handleConfirmDelete}
                  />
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Settings;
