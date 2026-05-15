import ButtonPrimary from "@/components/ButtonPrimary";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

type PaymentResultStatus = "completed" | "failed" | "cancelled" | null;

interface PaymentResultModalProps {
  modalRef: React.RefObject<BottomSheetModal>;
  status: PaymentResultStatus;
  message: string;
  onClose: () => void;
  buttonTitle?: string;
}

export default function PaymentResultModal({
  modalRef,
  status,
  message,
  onClose,
  buttonTitle = "Go Back",
}: PaymentResultModalProps) {
  const resultTitle =
    status === "completed"
      ? "Deposit Successful"
      : status === "cancelled"
        ? "Payment Cancelled"
        : "Payment Failed";

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={["55%"]}
      enablePanDownToClose={true}
      backdropComponent={({ style }) => (
        <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]} />
      )}
    >
      <BottomSheetScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 py-4">
          <View className="items-center mb-6 mt-5">
            {status === "completed" ? (
              <View className="bg-green-100 rounded-full w-20 h-20 items-center justify-center">
                <Image
                  source={require("@/assets/images/thik.svg")}
                  style={{ height: 120, width: 120 }}
                  contentFit="contain"
                />
              </View>
            ) : (
              <View className="bg-[#FFF4E5] rounded-full w-20 h-20 items-center justify-center">
                <Ionicons
                  name={status === "cancelled" ? "close" : "warning"}
                  size={28}
                  color="#F59E0B"
                />
              </View>
            )}
          </View>

          <Text className="text-lg font-sf-pro-semibold mt-3 text-center text-[#031731]">
            {resultTitle}
          </Text>

          <Text className="text-center mt-4 text-[#031731] font-sf-pro-regular text-sm px-6">
            {message}
          </Text>

          <ButtonPrimary title={buttonTitle} className="mt-5" onPress={onClose} />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}
