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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NationalId = () => {
  const [selectedNidFront, setSelectedNidFront] = useState<string | null>(null);
  const [selectedNidBack, setSelectedNidBack] = useState<string | null>(null);

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

  // Pick image from gallery for NID Front
  const pickNidFrontFromGallery = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedNidFront(result.assets[0].uri);
    }
  };

  // Pick image from gallery for NID Back
  const pickNidBackFromGallery = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedNidBack(result.assets[0].uri);
    }
  };

  // Take photo from camera for NID Front
  const takeNidFrontPhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedNidFront(result.assets[0].uri);
    }
  };

  // Take photo from camera for NID Back
  const takeNidBackPhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedNidBack(result.assets[0].uri);
    }
  };

  // Show options to pick NID Front
  const handleNidFrontUpload = () => {
    Alert.alert(
      "Upload NID Front",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: takeNidFrontPhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: pickNidFrontFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Show options to pick NID Back
  const handleNidBackUpload = () => {
    Alert.alert(
      "Upload NID Back",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: takeNidBackPhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: pickNidBackFromGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  // Remove selected NID Front
  const removeNidFront = () => {
    setSelectedNidFront(null);
  };

  // Remove selected NID Back
  const removeNidBack = () => {
    setSelectedNidBack(null);
  };

  // Handle submit with validation
  const handleSubmit = () => {
    if (!selectedNidFront) {
      Alert.alert("Error", "Please upload National ID Front picture");
      return;
    }
    if (!selectedNidBack) {
      Alert.alert("Error", "Please upload National ID Back picture");
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
        <ScreenHeader title="National ID" />

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
            <Text className="mt-3.5 font-sf-pro-medium">National ID No</Text>
            <TextInput
              className="mt-2 p-4 border border-[#E3E6F0] rounded-xl bg-white"
              placeholder="3264 35465 341654"
            />

            {/* Upload National ID Front */}
            <Text className="mt-8 text-base font-sf-pro-medium text-center">
              Upload your National ID picture (Front)
            </Text>
            <TouchableOpacity
              onPress={handleNidFrontUpload}
              activeOpacity={0.7}
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#000000",
              }}
              className="mt-5 h-36 rounded-xl bg-white overflow-hidden"
            >
              {selectedNidFront ? (
                // Show selected image
                <View className="flex-1 relative">
                  <Image
                    source={{ uri: selectedNidFront }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                  {/* Remove button */}
                  <TouchableOpacity
                    onPress={removeNidFront}
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

            {/* Upload National ID Back */}
            <Text className="mt-8 text-base font-sf-pro-medium text-center">
              Upload your National ID picture (Back)
            </Text>
            <TouchableOpacity
              onPress={handleNidBackUpload}
              activeOpacity={0.7}
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#000000",
              }}
              className="mt-5 h-36 rounded-xl bg-white overflow-hidden"
            >
              {/*  */}
              {selectedNidBack ? (
                // Show selected image
                <View className="flex-1 relative">
                  <Image
                    source={{ uri: selectedNidBack }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                  {/* Remove button */}
                  <TouchableOpacity
                    onPress={removeNidBack}
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

export default NationalId;
