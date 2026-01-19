import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import {
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
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
import { useCallback, useMemo, useRef } from "react";
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

const UploadDocument = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Snap points in percentage
  const snapPoints = useMemo(() => ["70%"], []);

  const handleOpenPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView
          className="flex-1"
          edges={["top", "left", "right", "bottom"]}
        >
          <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

          <LinearGradient
            colors={["#D3E6FF", "#FFFFFF"]}
            locations={[0, 0.4]}
            style={{ flex: 1 }}
          >
            <ScreenHeader title="" />

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
                {/* title */}
                <Text className="text-2xl font-sf-pro-semibold text-[#031731] text-center mt-5">
                  Upload your documents
                </Text>

                {/* subtitle */}
                <Text className="font-sf-pro-regular text-[#4D4D4D] text-center mt-2">
                  Please upload the required documents to complete your
                  application process
                </Text>

                {/* National ID Card */}
                <TouchableOpacity
                  onPress={() => router.push("/(agent-verification)/nid")}
                  className="flex-row items-center justify-between mt-8 p-2"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="bg-[#CFE3FD] rounded-full w-12 h-12 items-center justify-center">
                      <FontAwesome6 name="vcard" size={20} color="#0F73F7" />
                    </View>
                    <Text className="text-base text-[#031731] font-sf-pro-medium">
                      National ID Card
                    </Text>
                  </View>

                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>

                {/* Driver's License */}
                <TouchableOpacity
                  onPress={() =>
                    router.push("/(agent-verification)/driving-license")
                  }
                  className="flex-row items-center justify-between mt-8 p-2"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="bg-[#CFE3FD] rounded-full w-12 h-12 items-center justify-center">
                      <FontAwesome
                        name="drivers-license-o"
                        size={20}
                        color="#0F73F7"
                      />
                    </View>
                    <Text className="text-base text-[#031731] font-sf-pro-medium">
                      Driver's License
                    </Text>
                  </View>

                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>

                {/* Car Information */}
                <TouchableOpacity
                  onPress={() =>
                    router.push("/(agent-verification)/car-information")
                  }
                  className="flex-row items-center justify-between mt-8 p-2"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="bg-[#CFE3FD] rounded-full w-12 h-12 items-center justify-center">
                      <Ionicons name="car-outline" size={24} color="#0F73F7" />
                    </View>
                    <Text className="text-base text-[#031731] font-sf-pro-medium">
                      Car Information
                    </Text>
                  </View>

                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>

                {/* Your Picture */}
                <TouchableOpacity
                  onPress={() =>
                    router.push("/(agent-verification)/upload-picture")
                  }
                  className="flex-row items-center justify-between mt-8 p-2"
                >
                  <View className="flex-row items-center gap-3">
                    <View className="bg-[#CFE3FD] rounded-full w-12 h-12 items-center justify-center">
                      <Feather name="user" size={20} color="#0F73F7" />
                    </View>
                    <Text className="text-base text-[#031731] font-sf-pro-medium">
                      Your Picture
                    </Text>
                  </View>

                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </ScrollView>

              <ButtonPrimary
                title={"Submit"}
                className={"mb-10 mx-5"}
                onPress={handleOpenPress}
              />
            </KeyboardAvoidingView>
          </LinearGradient>

          {/* BottomSheetModal */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            enableHandlePanningGesture={false}
            enableContentPanningGesture={false}
            backdropComponent={({ style }) => (
              <View
                style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
              />
            )}
          >
            <BottomSheetView>
              <View className="px-6 py-4">
                {/* Success Header */}
                <View className="items-center mb-6 mt-20">
                  <View className="bg-green-100 mb-20 rounded-full w-20 h-20 items-center justify-center ">
                    <Image
                      source={require("@/assets/images/document-upload-success.svg")}
                      style={{ height: 230, width: 230 }}
                      contentFit="contain"
                    />
                  </View>
                </View>

                <Text className="text-lg font-sf-pro-semibold text-center mt-2.5 text-[#031731]">
                  Congrats!
                </Text>

                <Text className="text-center mt-1 text-[#031731] font-sf-pro-regular mx-auto">
                  Your account will be activated in 3 business days
                </Text>

                {/* button */}
                <ButtonPrimary
                  title={"Got it"}
                  className={"mt-4 mb-4"}
                  onPress={() => router.push("/(agent)/home")}
                />
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default UploadDocument;
