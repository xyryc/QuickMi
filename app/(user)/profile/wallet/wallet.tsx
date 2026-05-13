import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import ScreenHeader from "@/components/ScreenHeader";
import WalletCard from "@/components/WalletCard";
import { EvilIcons, Feather } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef } from "react";
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

const Wallet = () => {
  // ✅ Modal refs
  const confirmModalRef = useRef<BottomSheetModal>(null);
  const successModalRef = useRef<BottomSheetModal>(null);

  // ✅ Snap points
  const confirmSnapPoints = ["35%"];
  const successSnapPoints = ["55%"];

  // ✅ Handle Withdraw - opens confirm modal
  const handleWithdraw = () => {
    confirmModalRef.current?.present();
  };

  // ✅ Confirm "No" - close confirm modal
  const handleConfirmNo = () => {
    confirmModalRef.current?.dismiss();
  };

  // ✅ Confirm "Yes" - close confirm, open success
  const handleConfirmYes = () => {
    confirmModalRef.current?.dismiss();
    successModalRef.current?.present();
  };

  // ✅ Close success modal and go back to wallet
  const handleSuccessClose = () => {
    successModalRef.current?.dismiss();
  };

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
            <ScreenHeader title="Wallet" />

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
                {/* wallet card */}
                <WalletCard handleWithdraw={handleWithdraw} />

                {/* Payment method */}
                <Text className="font-sf-pro-medium mt-4 text-base text-black">
                  Payment method
                </Text>

                {/* Add debit/credit card */}
                <TouchableOpacity
                  onPress={() => router.push("/(shared)/profile/card-details")}
                  className=" flex-row items-center justify-between border border-[#E3E6F0] rounded-xl p-4 mt-3"
                >
                  <View className="flex-row items-center">
                    <Feather name="plus" size={24} color="black" />
                    <Text className="font-sf-pro-medium text-base text-black ml-2">
                      Add debit/credit card
                    </Text>
                  </View>
                  <View>
                    <Feather name="chevron-right" size={24} color="black" />
                  </View>
                </TouchableOpacity>

                {/* Transactions */}
                <Text className="font-sf-pro-medium mt-5 text-base text-[#414141]">
                  Transactions
                </Text>

                {/* Transactions history Withdraw */}
                <TouchableOpacity className="border border-[#E3E6F0] flex-row items-center justify-between mt-2 p-4 rounded-xl">
                  <View className="flex-row items-center">
                    <Feather
                      name="arrow-up-right"
                      size={24}
                      color="red"
                      className="bg-white border border-[#0F73F724] rounded-full p-2"
                    />
                    <View>
                      <Text className="font-sf-pro-medium text-sm text-[#222222] ml-3">
                        Withdraw
                      </Text>

                      <Text className="font-sf-pro-regular text-xs text-[#6B6B6B] ml-3 mt-2">
                        Today at 09:20 am
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="font-sf-pro-medium text-base text-[#0F73F7]">
                      $570.00
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Transactions history Add in Wallet */}
                <TouchableOpacity className="border border-[#E3E6F0] flex-row items-center justify-between mt-2 p-4 rounded-xl">
                  <View className="flex-row items-center">
                    <Feather
                      name="arrow-down-right"
                      size={24}
                      color="green"
                      className="bg-white border border-[#0F73F724] rounded-full p-2"
                    />
                    <View>
                      <Text className="font-sf-pro-medium text-sm text-[#222222] ml-3">
                        Add in Wallet
                      </Text>

                      <Text className="font-sf-pro-regular text-xs text-[#6B6B6B] ml-3 mt-2">
                        Today at 09:20 am
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text className="font-sf-pro-medium text-base text-[#0F73F7]">
                      $570.00
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </LinearGradient>

          {/*  CONFIRM withdeow MODAL */}
          <BottomSheetModal
            ref={confirmModalRef}
            index={0}
            snapPoints={confirmSnapPoints}
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
              <View className="px-6">
                <Text className="text-lg font-sf-pro-semibold text-center mt-2.5 text-[#031731]">
                  Confirm Withdraw
                </Text>

                <Text className="text-center mt-2 text-[#031731] font-sf-pro-regular text-sm">
                  Are you sure you want to withdraw now?
                </Text>

                {/* button */}
                <View className="flex-row mt-5 gap-3">
                  <ButtonSecondary
                    title={"No"}
                    className={"flex-1"}
                    onPress={handleConfirmNo}
                  />

                  <ButtonPrimary
                    title={"Yes, Withdraw"}
                    className={"flex-1"}
                    onPress={handleConfirmYes}
                  />
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>

          {/*  SUCCESS withdeow MODAL */}
          <BottomSheetModal
            ref={successModalRef}
            index={0}
            snapPoints={successSnapPoints}
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
                {/* close button  */}
                <TouchableOpacity
                  onPress={handleSuccessClose}
                  className="absolute bg-[#CFE3FD] p-1 rounded-md right-6 top-0"
                >
                  <EvilIcons name="close" size={24} color="#0F73F7" />
                </TouchableOpacity>

                {/* thik icon */}
                <View className="items-center mb-6 mt-5">
                  <View className="bg-green-100  rounded-full w-20 h-20 items-center justify-center ">
                    <Image
                      source={require("@/assets/images/thik.svg")}
                      style={{ height: 120, width: 120 }}
                      contentFit="contain"
                    />
                  </View>
                </View>
                <Text className="text-lg font-sf-pro-semibold mt-3 text-center text-[#031731]">
                  Withdraw Req. Successful
                </Text>

                <Text className="text-center mt-4 text-[#031731] font-sf-pro-regular text-sm px-12">
                  Your Withdraw request has been sent successfully. You will get
                  the money within 24 hours.
                </Text>

                {/* button */}

                <ButtonPrimary
                  title={"Go To My Wallet"}
                  className={" mt-5"}
                  onPress={handleConfirmNo}
                />
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Wallet;
