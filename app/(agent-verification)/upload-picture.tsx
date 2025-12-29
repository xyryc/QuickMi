import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
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
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UploadPicture = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  // Pick image from gallery
  const pickImageFromGallery = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Take photo from camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Show options to pick image
  const handleImageUpload = () => {
    Alert.alert(
      "Upload Picture",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: takePhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: pickImageFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Remove selected image
  const removeImage = () => {
    setSelectedImage(null);
  };

  // Handle submit
  const handleSubmit = () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please upload a picture first");
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
        <ScreenHeader title="Upload your picture" />

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
            {/* Upload car registration picture */}
            <Text className="mt-8 text-base font-sf-pro-medium ">
              Upload your picture
            </Text>

            <TouchableOpacity
              onPress={handleImageUpload}
              activeOpacity={0.7}
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#000000",
              }}
              className="mt-5 h-36 rounded-xl bg-white overflow-hidden"
            >
              {selectedImage ? (
                // Show selected image
                <View className="flex-1 relative">
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                  {/* Remove button */}
                  <TouchableOpacity
                    onPress={removeImage}
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

            {/* Show file info if image is selected */}
            {/* {selectedImage && (
              <View className="mt-4 bg-green-50 p-3 rounded-lg border border-green-200">
                <Text className="text-green-700 font-sf-pro-medium">
                  ✓ Picture uploaded successfully
                </Text>
                <Text className="text-green-600 text-xs mt-1 font-sf-pro-regular">
                  Tap the image to change or remove
                </Text>
              </View>
            )} */}
          </ScrollView>

          {/* bottom button */}
          <View className="px-5 pb-16">
            <ButtonPrimary onPress={handleSubmit} title="Submit" />
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UploadPicture;
