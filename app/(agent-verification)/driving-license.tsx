import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image"; // ✅ Missing import added
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity, // ✅ Missing import added
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DrivingLicense = () => {
  const [selectedDrivingLicenseFront, setSelectedDrivingLicenseFront] =
    useState<string | null>(null);
  const [selectedDrivingLicenseBack, setSelectedDrivingLicenseBack] = useState<
    string | null
  >(null);

  // Request camera permission
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera permission is required to take photos."
      );
      return false;
    }
    return true;
  };

  // Request media library permission
  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Media library permission is required to select photos."
      );
      return false;
    }
    return true;
  };

  // Pick image from gallery for Driving License Front
  const pickDrivingLicenseFrontFromGallery = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedDrivingLicenseFront(result.assets[0].uri);
    }
  };

  // Pick image from gallery for Driving License Back
  const pickDrivingLicenseBackFromGallery = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    // ////
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedDrivingLicenseBack(result.assets[0].uri);
    }
  };

  // Take photo from camera for Driving License Front
  const takeDrivingLicenseFrontPhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedDrivingLicenseFront(result.assets[0].uri);
    }
  };

  // Take photo from camera for Driving License Back
  const takeDrivingLicenseBackPhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedDrivingLicenseBack(result.assets[0].uri);
    }
  };

  // Show options to pick Driving License Front
  const handleDrivingLicenseFrontUpload = () => {
    Alert.alert(
      "Upload Driving License Front",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: takeDrivingLicenseFrontPhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: pickDrivingLicenseFrontFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Show options to pick Driving License Back
  const handleDrivingLicenseBackUpload = () => {
    Alert.alert(
      "Upload Driving License Back",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: takeDrivingLicenseBackPhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: pickDrivingLicenseBackFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Remove selected Driving License Front
  const removeDrivingFront = () => {
    setSelectedDrivingLicenseFront(null);
  };

  // Remove selected Driving License Back
  const removeDrivingBack = () => {
    setSelectedDrivingLicenseBack(null);
  };

  // Handle submit with validation
  const handleSubmit = () => {
    if (!selectedDrivingLicenseFront) {
      Alert.alert("Error", "Please upload Driving License Front picture");
      return;
    }
    if (!selectedDrivingLicenseBack) {
      Alert.alert("Error", "Please upload Driving License Back picture");
      return;
    }
    // Here you can handle the image upload to your backend
    router.push("/(agent-verification)");
  };

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.4]}
        style={{ flex: 1 }}
      >
        <ScreenHeader title="Driving License" />

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
            <Text className="mt-3.5 font-sf-pro-medium">
              Driving License No
            </Text>
            <TextInput
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
              placeholder="3264 35465 341654"
            />

            {/* Upload Driving License Front */}
            <Text className="mt-8 text-base font-sf-pro-medium text-center">
              Upload Your Driving License picture (Front)
            </Text>
            <TouchableOpacity
              onPress={handleDrivingLicenseFrontUpload}
              activeOpacity={0.7}
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#000000",
              }}
              className="mt-5 h-36 rounded-xl bg-white overflow-hidden"
            >
              {selectedDrivingLicenseFront ? (
                // Show selected image
                <View className="flex-1 relative">
                  <Image
                    source={{ uri: selectedDrivingLicenseFront }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                  {/* Remove button */}
                  <TouchableOpacity
                    onPress={removeDrivingFront}
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
                    style={{ elevation: 5, shadowColor: "#000" }}
                  >
                    <Entypo name="cross" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ) : (
                // Show upload placeholder
                <View className="flex-1 justify-center items-center">
                  <Entypo name="camera" size={40} color="black" />
                  <Text className="mt-3 text-[#1D242D] text-xl font-sf-pro-regular">
                    Upload
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Upload Driving License Back */}
            <Text className="mt-8 text-base font-sf-pro-medium text-center">
              Upload Your Driving License picture (Back)
            </Text>
            <TouchableOpacity
              onPress={handleDrivingLicenseBackUpload}
              activeOpacity={0.7}
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#000000",
              }}
              className="mt-5 h-36 rounded-xl bg-white overflow-hidden"
            >
              {selectedDrivingLicenseBack ? (
                // Show selected image
                <View className="flex-1 relative">
                  <Image
                    source={{ uri: selectedDrivingLicenseBack }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                  {/* Remove button */}
                  <TouchableOpacity
                    onPress={removeDrivingBack}
                    className="absolute top-2 right-2 bg-red-500 rounded-full p-2"
                    style={{ elevation: 5, shadowColor: "#000" }}
                  >
                    <Entypo name="cross" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ) : (
                // Show upload placeholder
                <View className="flex-1 justify-center items-center">
                  <Entypo name="camera" size={40} color="black" />
                  <Text className="mt-3 text-[#1D242D] text-xl font-sf-pro-regular">
                    Upload
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>

          {/* bottom button */}
          <View className="px-5 pb-32">
            <ButtonPrimary onPress={handleSubmit} title="Submit" />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DrivingLicense;
