import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonPrimary from "./ButtonPrimary";

const PickupCard = () => {
  const router = useRouter();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera permission is required to take photos."
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    try {
      setLoading(true);

      // Request permission
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        setLoading(false);
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    takePhoto();
  };

  const removePhoto = () => {
    Alert.alert("Remove Photo", "Are you sure you want to remove this photo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setPhoto(null),
      },
    ]);
  };

  return (
    <View className="border border-[#005FDC24] p-4 rounded-xl my-4">
      {/* route */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-sf-pro-medium text-[#031731]">
          Pick-up From
        </Text>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.push("/(shared)/chat/chat")}
            className="w-11 h-11 rounded-full items-center justify-center bg-[#CFE3FD42] border border-[#0F73F724]"
          >
            <Ionicons
              name="chatbox-ellipses-outline"
              size={20}
              color="#4D4D4D"
            />
          </TouchableOpacity>

          <TouchableOpacity className="w-11 h-11 rounded-full items-center justify-center bg-[#CFE3FD42] border border-[#0F73F724]">
            <Ionicons name="call-outline" size={20} color="#4D4D4D" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sender address */}
      <Text className="mt-3 text-[#3F8FF9] font-sf-pro-regular text-xs">
        Sender address
      </Text>

      {/* address */}
      <Text className="mt-2 text-[#031731] font-sf-pro-regular text-sm">
        Kilometer 6, 278H, Street 201R, Kroalkor Village, Unnamed Road, Phnom
        Penh
      </Text>

      {/* Photo Preview */}
      {photo && (
        <View className="mt-3 relative">
          <Image
            source={{ uri: photo }}
            className="w-full h-48 rounded-xl"
            resizeMode="cover"
          />

          {/* Remove button */}
          <TouchableOpacity
            onPress={removePhoto}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 items-center justify-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>

          {/* Photo indicator */}
          <View className="absolute bottom-2 left-2 bg-black/60 px-3 py-1 rounded-full flex-row items-center gap-1">
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text className="text-white text-xs font-sf-pro-medium">
              Photo captured
            </Text>
          </View>
        </View>
      )}

      {/* Button */}
      {loading ? (
        <View className="mt-3.5 py-3 bg-[#0F73F7] rounded-2xl items-center justify-center">
          <ActivityIndicator color="white" />
        </View>
      ) : (
        <ButtonPrimary
          title={photo ? "Retake Photo" : "Take Photo"}
          onPress={photo ? retakePhoto : takePhoto}
          className="mt-3.5"
          iconPosition="left"
          icon={
            <Ionicons
              name={photo ? "camera-reverse-outline" : "camera-outline"}
              size={20}
              color="white"
            />
          }
        />
      )}
    </View>
  );
};

export default PickupCard;
