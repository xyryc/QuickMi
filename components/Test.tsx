import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Test = () => {
  const [takePhoto, setTakePhoto] = useState(false);

  const compliteDeliveryModalRef = useRef<BottomSheetModal>(null);

  // Snap points
  const conpliteModalSnapPoints = useMemo(() => ["80%"], []);

  // Send complaint handler
  const handleSendComplaint = useCallback(() => {
    compliteDeliveryModalRef.current?.present();
  }, []);
  const receiveDeleveryModalRef = useRef<BottomSheetModal>(null);

  // Snap points
  const ReceiveDeleveryModalSnapPoints = useMemo(() => ["80%"], []);

  // Send complaint handler
  const handleReceiveDelevery = useCallback(() => {
    receiveDeleveryModalRef.current?.present();
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

            {/* scrollable content */}
            <ScrollView
              className="flex-1 mx-5"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
            >
              {/* Send Button */}
              <ButtonPrimary
                title="Complete Delivery"
                className="mt-6"
                onPress={handleSendComplaint}
              />

              {/* Send Button */}
              <ButtonPrimary
                title="Receive Delevery"
                className="mt-6"
                onPress={handleReceiveDelevery}
              />
            </ScrollView>
          </LinearGradient>

          {/* SUCCESS MODAL */}
          <BottomSheetModal
            ref={compliteDeliveryModalRef}
            index={0}
            snapPoints={conpliteModalSnapPoints}
            enablePanDownToClose={true}
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
              <View className="px-6 py-4 relative">
                {/* time */}
                <Text className="font-sf-pro-medium text-xl text-center text-black">
                  20 min 1.5mi
                </Text>

                {/* Pick-up From */}
                <View className="border border-[#005FDC24] p-4 rounded-xl mt-4">
                  {/* header */}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xl font-sf-pro-medium text-[#031731]">
                      Pick-up From
                    </Text>
                    <View className="flex-row items-center gap-3">
                      <MaterialCommunityIcons
                        name="message-processing-outline"
                        size={24}
                        color="black"
                        className="p-2.5 bg-[#0F73F724] border border-[#0F73F7E5] rounded-full"
                      />
                      <Ionicons
                        name="call-outline"
                        size={24}
                        color="black"
                        className="p-2.5 bg-[#0F73F724] border border-[#0F73F7E5] rounded-full"
                      />
                    </View>
                  </View>

                  {/* Sender address */}
                  <Text className="mt-3 text-[#3F8FF9] font-sf-pro-regular text-xs">
                    Sender address
                  </Text>

                  {/* address */}
                  <Text className="mt-2 text-[#031731] font-sf-pro-regular text-sm">
                    Kilometer 6, 278H, Street 201R, Kroalkor Village, Unnamed
                    Road, Phnom Penh
                  </Text>
                </View>

                {/* Drop off */}
                <View className="border border-[#005FDC24] p-4 rounded-xl mt-4">
                  {/* header */}
                  <View className="flex-row items-center justify-between">
                    <Text className="text-xl font-sf-pro-medium text-[#031731]">
                      Drop off
                    </Text>
                    {/* <View className="flex-row items-center gap-3">
                      <MaterialCommunityIcons
                        name="message-processing-outline"
                        size={24}
                        color="black"
                        className="p-2.5 bg-[#0F73F724] border border-[#0F73F7E5] rounded-full"
                      />
                      <Ionicons
                        name="call-outline"
                        size={24}
                        color="black"
                        className="p-2.5 bg-[#0F73F724] border border-[#0F73F7E5] rounded-full"
                      />
                    </View> */}
                  </View>

                  {/* Receiver address */}
                  <Text className="mt-1 text-[#3F8FF9] font-sf-pro-regular text-xs">
                    Receiver address
                  </Text>

                  {/* address */}
                  <Text className="mt-2 text-[#031731] font-sf-pro-regular text-sm">
                    2nd Floor 01, 25 Mao Tse Toung Blvd (245), Phnom Penh 12302,
                    Cambodia
                  </Text>

                  {/* Image */}
                  {takePhoto && (
                    <View className="flex-row items-center justify-between border border-[#E3E6F0] rounded p-2 mt-3.5">
                      <Image
                        source={{
                          uri: "https://randomuser.me/api/portraits/men/10.jpg",
                        }}
                        contentFit="cover"
                        style={{
                          width: 60,
                          height: 50,
                          borderRadius: 4,
                          borderColor: "#0F73F7",
                          borderWidth: 1,
                        }}
                      />

                      <Octicons name="chevron-right" size={20} color="black" />
                    </View>
                  )}

                  {/* Take photo */}
                  <ButtonPrimary
                    title={takePhoto ? "Retake" : "Take photo"}
                    className={"mt-3.5"}
                    onPress={() => setTakePhoto(!takePhoto)}
                  />
                </View>

                {/* primary Button */}
                <ButtonPrimary title={"Arrived"} className={"mt-5"} />

                <View className="mb-14" />
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>

          {/* receive delevery MODAL */}
          <BottomSheetModal
            ref={receiveDeleveryModalRef}
            index={0}
            snapPoints={ReceiveDeleveryModalSnapPoints}
            enablePanDownToClose={true}
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
              <View className="px-6 py-4 relative">
                <View className="border border-[#0F73F7] p-3 rounded-2xl">
                  {/* details */}
                  <Text className="font-sf-pro-medium text-xl text-center text-black px-14">
                    The trip has been accepted by another rider.
                  </Text>
                  <Text className="font-sf-pro-regular text-sm text-center text-black mt-3.5">
                    Please search again.
                  </Text>

                  {/* Search Again */}
                  <ButtonPrimary title={"Search Again"} className={"mt-4"} />
                </View>
                <View className="mb-14" />
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Test;
