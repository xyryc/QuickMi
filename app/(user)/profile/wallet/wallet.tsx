import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import ScreenHeader from "@/components/ScreenHeader";
import WalletCard from "@/components/WalletCard";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Wallet = () => {
  const [copiedField, setCopiedField] = useState<
    "accountName" | "accountNumber" | "bankName" | null
  >(null);
  const [fundingAmount, setFundingAmount] = useState("");
  const paystackDetails = {
    accountName: "QuickMi User Wallet",
    accountNumber: "1234567890",
    bankName: "Wema Bank (Paystack)",
    note: "Transfer from your banking app to this account. Wallet updates automatically after confirmation.",
  };

  // ✅ Modal refs
  const confirmModalRef = useRef<BottomSheetModal>(null);
  const successModalRef = useRef<BottomSheetModal>(null);
  const depositModalRef = useRef<BottomSheetModal>(null);

  // ✅ Snap points
  const confirmSnapPoints = ["35%"];
  const successSnapPoints = ["55%"];
  const depositSnapPoints = ["42%", "68%"];

  const handleDeposit = () => {
    depositModalRef.current?.present();
  };

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

  const handleDepositContinue = () => {
    const amount = Number(fundingAmount.replace(/,/g, "").trim());
    if (!amount || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid deposit amount.");
      return;
    }

    depositModalRef.current?.dismiss();
    router.push({
      pathname: "/(user)/profile/wallet/payment-options",
      params: { amount: String(amount) },
    });
  };

  const handleCopy = async (
    value: string,
    field: "accountName" | "accountNumber" | "bankName",
  ) => {
    try {
      await Clipboard.setStringAsync(value);
      setCopiedField(field);
      setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 1200);
    } catch (error) {
      console.error("Error copying text:", error);
    }
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
                <WalletCard
                  handleWithdraw={handleWithdraw}
                  handleDeposit={handleDeposit}
                />

                {/* Paystack transfer details */}
                <View className="border border-[#E3E6F0] rounded-xl p-4 mt-4">
                  <Text className="font-sf-pro-medium text-base text-black">
                    Paystack Bank Transfer
                  </Text>
                  <Text className="font-sf-pro-regular text-xs text-gray-500 mt-1">
                    Use this account to add money from your banking app.
                  </Text>

                  <View className="mt-4">
                    <Text className="font-sf-pro-regular text-xs text-gray-500">
                      Account Name
                    </Text>
                    <View className="flex-row items-center justify-between mt-1">
                      <Text className="font-sf-pro-medium text-sm text-[#031731]">
                        {paystackDetails.accountName}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          handleCopy(paystackDetails.accountName, "accountName")
                        }
                      >
                        <Ionicons
                          name={
                            copiedField === "accountName"
                              ? "checkmark-done-outline"
                              : "copy-outline"
                          }
                          size={16}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="mt-3">
                    <Text className="font-sf-pro-regular text-xs text-gray-500">
                      Account Number
                    </Text>
                    <View className="flex-row items-center justify-between mt-1">
                      <Text
                        className="font-sf-pro-medium text-base text-[#031731]"
                        selectable
                      >
                        {paystackDetails.accountNumber}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          handleCopy(
                            paystackDetails.accountNumber,
                            "accountNumber",
                          )
                        }
                      >
                        <Ionicons
                          name={
                            copiedField === "accountNumber"
                              ? "checkmark-done-outline"
                              : "copy-outline"
                          }
                          size={16}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="mt-3">
                    <Text className="font-sf-pro-regular text-xs text-gray-500">
                      Bank Name
                    </Text>
                    <View className="flex-row items-center justify-between mt-1">
                      <Text className="font-sf-pro-medium text-sm text-[#031731]">
                        {paystackDetails.bankName}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          handleCopy(paystackDetails.bankName, "bankName")
                        }
                      >
                        <Ionicons
                          name={
                            copiedField === "bankName"
                              ? "checkmark-done-outline"
                              : "copy-outline"
                          }
                          size={16}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text className="font-sf-pro-regular text-xs text-gray-500 mt-3">
                    {paystackDetails.note}
                  </Text>
                </View>

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
                      ₦570.00
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
                      ₦570.00
                    </Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </KeyboardAvoidingView>
          </LinearGradient>

          {/*  CONFIRM Deposit MODAL */}
          <BottomSheetModal
            ref={depositModalRef}
            index={0}
            snapPoints={depositSnapPoints}
            enablePanDownToClose={true}
            keyboardBehavior="extend"
            keyboardBlurBehavior="restore"
            android_keyboardInputMode="adjustResize"
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
                  Deposit
                </Text>
                <Text className="text-center mt-2 text-[#031731] font-sf-pro-regular text-sm">
                  Enter deposit amount
                </Text>

                <View className="mt-5 border border-[#E3E6F0] rounded-xl px-4 py-1">
                  <Text className="font-sf-pro-regular text-xs text-gray-500 mt-2">
                    Amount
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="font-sf-pro-medium text-base text-[#031731] mr-2">
                      ₦
                    </Text>
                    <BottomSheetTextInput
                      value={fundingAmount}
                      onChangeText={setFundingAmount}
                      keyboardType="number-pad"
                      placeholder="e.g. 5000"
                      placeholderTextColor="#A2A2A2"
                      className="flex-1 font-sf-pro-medium text-base text-[#031731] py-3"
                    />
                  </View>
                </View>

                <ButtonPrimary
                  title="Continue"
                  className="mt-5"
                  onPress={handleDepositContinue}
                />
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>

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
