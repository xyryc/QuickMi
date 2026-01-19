import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { EvilIcons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Select } from "react-native-native-select";
import { SafeAreaView } from "react-native-safe-area-context";

const SupportRequests = () => {
  const [selectedIssue, setSelectedIssue] = useState("Payment Issue");
  const [complaintText, setComplaintText] = useState("");

  const successModalRef = useRef<BottomSheetModal>(null);

  // Snap points
  const successSnapPoints = useMemo(() => ["60%"], []);

  // Issue options
  const issueOptions = ["Delivery Issue", "Payment Issue", "App Issue"];

  // Send complaint handler
  const handleSendComplaint = useCallback(() => {
    if (!complaintText.trim()) {
      console.log("Please write your complaint");
      alert("Please write your complaint");
      return;
    }

    console.log("Sending complaint:", {
      issue: selectedIssue,
      complaint: complaintText,
    });

    // Show success modal
    successModalRef.current?.present();
  }, [selectedIssue, complaintText]);

  // Success modal close handler
  const handleSuccessClose = useCallback(() => {
    successModalRef.current?.dismiss();
    // Clear form
    setComplaintText("");
    setSelectedIssue("Payment Issue");
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
          <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

          <LinearGradient
            colors={["#D3E6FF", "#FFFFFF"]}
            locations={[0, 0.4]}
            style={{ flex: 1 }}
          >
            <ScreenHeader title="Support Requests" />

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
                {/* profile image */}
                <View className="items-center mt-8">
                  <Image
                    source={require("@/assets/images/logo.svg")}
                    contentFit="cover"
                    style={{ width: 175, height: 130, borderRadius: 100 }}
                  />
                </View>

                {/* bio */}
                <Text className="font-sf-pro-medium text-base text-center text-[#1E1E1E] mt-5">
                  If you face any kind of problem with {"\n"} our service feel
                  free to contact us.
                </Text>

                {/* Select Issue Type */}
                <View className="mt-6">
                  <Text className="mb-2 text-base font-sf-pro-medium text-[#031731]">
                    Select Issue Type
                  </Text>

                  <Select
                    style={{ height: 50 }}
                    className="w-full rounded-xl px-4"
                    mode="dropdown"
                    options={issueOptions}
                    selectedIndex={0}
                    onValueChange={(e) => {
                      console.log("Selected Issue:", e.nativeEvent.value);
                      setSelectedIssue(e.nativeEvent.value);
                    }}
                  />
                </View>

                {/* Complaint Text Area */}
                <View className="mt-4">
                  <Text className="mb-4 text-base font-sf-pro-medium text-[#031731]">
                    Describe Your Issue
                  </Text>
                  <TextInput
                    className="border border-[#E3E6F0] rounded-2xl h-48 bg-white px-4 py-4"
                    placeholder="Write your complaint here..."
                    placeholderTextColor="#9CA3AF"
                    numberOfLines={7}
                    multiline={true}
                    textAlignVertical="top"
                    value={complaintText}
                    onChangeText={setComplaintText}
                  />
                </View>

                {/* Send Button */}
                <ButtonPrimary
                  title="Send to Admin"
                  className="mt-6 mb-16"
                  onPress={handleSendComplaint}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </LinearGradient>

          {/* SUCCESS MODAL */}
          <BottomSheetModal
            ref={successModalRef}
            index={0}
            snapPoints={successSnapPoints}
            enablePanDownToClose={false}
            backdropComponent={({ style }) => (
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            )}
          >
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              <View className="px-6 py-4 relative">
                {/* Close button */}
                <TouchableOpacity
                  onPress={handleSuccessClose}
                  className="absolute bg-[#CFE3FD] p-1 rounded-md right-6 top-0 z-10"
                >
                  <EvilIcons name="close" size={24} color="#0F73F7" />
                </TouchableOpacity>

                {/* Success icon */}
                <View className="items-center mb-6 mt-5">
                  <View className="bg-green-100 rounded-full w-20 h-20 items-center justify-center">
                    <Image
                      source={require("@/assets/images/thik.svg")}
                      style={{ height: 120, width: 120 }}
                      contentFit="contain"
                    />
                  </View>
                </View>

                <Text className="text-lg font-sf-pro-semibold mt-3 text-center text-[#031731]">
                  Request Sent Successfully
                </Text>

                <Text className="text-center mt-2 text-[#031731] font-sf-pro-regular px-8">
                  Your support request has been sent to admin successfully. We
                  will review and get back to you within 24-48 hours.
                </Text>

                {/* Info Card */}
                <View className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-600 font-sf-pro-regular">
                      Issue Type:
                    </Text>
                    <Text className="font-sf-pro-semibold text-gray-800">
                      {selectedIssue}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600 font-sf-pro-regular">
                      Status:
                    </Text>
                    <View className="flex-row items-center">
                      <View className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                      <Text className="font-sf-pro-semibold text-yellow-600">
                        Pending Review
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Button */}
                <ButtonPrimary
                  title={"Done"}
                  className={"mt-5 mb-16"}
                  onPress={handleSuccessClose}
                />
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default SupportRequests;
