import ButtonPrimary from "@/components/ButtonPrimary";
import PaymentResultModal from "@/components/PaymentResultModal";
import ScreenHeader from "@/components/ScreenHeader";
import {
  initializePaystackAndroid,
  paystackPayWithAccessCodeAndroid,
} from "@/utils/paystackAndroid";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useMemo, useRef, useState } from "react";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type PaymentMethodId =
  | "card"
  | "bank_transfer"
  | "bank"
  | "ussd"
  | "qr"
  | "opay";

const paymentMethods: {
  id: PaymentMethodId;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "card",
    label: "Card",
    icon: <Ionicons name="card-outline" size={20} color="#0F73F7" />,
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    icon: <MaterialCommunityIcons name="bank-transfer" size={20} color="#0F73F7" />,
  },
  {
    id: "bank",
    label: "Bank",
    icon: <MaterialCommunityIcons name="bank-outline" size={20} color="#0F73F7" />,
  },
  {
    id: "ussd",
    label: "USSD",
    icon: <MaterialIcons name="dialpad" size={20} color="#0F73F7" />,
  },
  {
    id: "qr",
    label: "QR",
    icon: <MaterialCommunityIcons name="qrcode-scan" size={20} color="#0F73F7" />,
  },
  {
    id: "opay",
    label: "Opay",
    icon: <FontAwesome5 name="wallet" size={18} color="#0F73F7" />,
  },
];

export default function WalletPaymentOptions() {
  const { amount } = useLocalSearchParams<{ amount?: string }>();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>("card");
  const [accessCode, setAccessCode] = useState(
    process.env.EXPO_PUBLIC_PAYSTACK_TEST_ACCESS_CODE || "",
  );
  const [authorizationUrl, setAuthorizationUrl] = useState("");
  const [resultStatus, setResultStatus] = useState<
    "completed" | "failed" | "cancelled" | null
  >(null);
  const [resultMessage, setResultMessage] = useState("");
  const resultModalRef = useRef<BottomSheetModal>(null);

  const formattedAmount = useMemo(() => {
    const numericAmount = Number(amount || 0);
    if (!numericAmount) return "₦0";
    return `₦${numericAmount.toLocaleString()}`;
  }, [amount]);

  const handleContinue = () => {
    if (selectedMethod === "qr" || selectedMethod === "opay") {
      Alert.alert(
        "Coming Soon",
        `${selectedMethod === "qr" ? "QR" : "Opay"} payment is coming soon.`,
      );
      return;
    }

    if (selectedMethod === "ussd") {
      const normalizedAuthorizationUrl = authorizationUrl.trim();
      if (!normalizedAuthorizationUrl) {
        Alert.alert(
          "Checkout URL Required",
          "Paste the Paystack authorization_url from initialize transaction for USSD.",
        );
        return;
      }
      WebBrowser.openBrowserAsync(normalizedAuthorizationUrl);
      return;
    }

    const supportedNativeMethods: PaymentMethodId[] = [
      "card",
      "bank",
      "bank_transfer",
    ];

    if (!supportedNativeMethods.includes(selectedMethod)) {
      Alert.alert(
        "Coming Soon",
        `${selectedMethod} is added in UI. We'll wire channel flow next.`,
      );
      return;
    }

    const publicKey = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
    const normalizedAccessCode = accessCode.trim();

    if (!publicKey || !normalizedAccessCode) {
      Alert.alert(
        "Paystack Config Missing",
        "Set EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY and enter a valid access code.",
      );
      return;
    }

    initializePaystackAndroid(publicKey)
      .then(() => paystackPayWithAccessCodeAndroid(normalizedAccessCode))
      .then((result) => {
        if (result.status === "completed") {
          setResultStatus("completed");
          setResultMessage(
            `${selectedMethod} payment of ${formattedAmount} completed.`,
          );
          resultModalRef.current?.present();
          return;
        }
        if (result.status === "cancelled") {
          setResultStatus("cancelled");
          setResultMessage("You cancelled the payment.");
          resultModalRef.current?.present();
          return;
        }
        setResultStatus("failed");
        setResultMessage(result.error || "Payment failed.");
        resultModalRef.current?.present();
      })
      .catch((error: Error) => {
        setResultStatus("failed");
        setResultMessage(error.message);
        resultModalRef.current?.present();
      });
  };

  const closeResultModal = () => {
    resultModalRef.current?.dismiss();
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
            <ScreenHeader title="Payment Options" />
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            >
              <ScrollView
                className="flex-1 mx-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
              >
            <View className="border border-[#E3E6F0] rounded-xl p-4 mt-2 items-center">
              <Text className="text-xs text-[#6B6B6B] font-sf-pro-regular text-center">
                Deposit Amount
              </Text>
              <Text className="text-2xl text-[#031731] font-sf-pro-semibold mt-1 text-center">
                {formattedAmount}
              </Text>
            </View>

            <Text className="text-base text-black font-sf-pro-medium mt-5 mb-3">
              Choose Payment Method
            </Text>

            <View className="gap-3">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <TouchableOpacity
                    key={method.id}
                    onPress={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl border flex-row items-center justify-between ${
                      isSelected ? "border-[#0F73F7]" : "border-[#E3E6F0]"
                    }`}
                  >
                    <View className="flex-row items-center gap-3">
                      {method.icon}
                      <Text className="font-sf-pro-medium text-base text-[#031731]">
                        {method.label}
                      </Text>
                    </View>
                    <Ionicons
                      name={isSelected ? "radio-button-on" : "radio-button-off"}
                      size={20}
                      color={isSelected ? "#0F73F7" : "#A2A2A2"}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            {["card", "bank", "bank_transfer"].includes(selectedMethod) && (
              <View className="mt-5 border border-[#E3E6F0] rounded-xl p-4">
                <Text className="text-xs text-[#6B6B6B] font-sf-pro-regular mb-2">
                  Paystack Access Code (Temporary Testing)
                </Text>
                <TextInput
                  value={accessCode}
                  onChangeText={setAccessCode}
                  placeholder="Paste access_code from initialize transaction"
                  placeholderTextColor="#A2A2A2"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="font-sf-pro-regular text-sm text-[#031731] border border-[#E3E6F0] rounded-lg px-3 py-3"
                />
              </View>
            )}

            {selectedMethod === "ussd" && (
              <View className="mt-5 border border-[#E3E6F0] rounded-xl p-4">
                <Text className="text-xs text-[#6B6B6B] font-sf-pro-regular mb-2">
                  Paystack authorization_url (USSD Web Fallback)
                </Text>
                <TextInput
                  value={authorizationUrl}
                  onChangeText={setAuthorizationUrl}
                  placeholder="Paste authorization_url from initialize transaction"
                  placeholderTextColor="#A2A2A2"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="font-sf-pro-regular text-sm text-[#031731] border border-[#E3E6F0] rounded-lg px-3 py-3"
                />
              </View>
            )}
              </ScrollView>

              <View className="px-5 pb-6">
                <ButtonPrimary title="Continue" onPress={handleContinue} />
              </View>
            </KeyboardAvoidingView>
          </LinearGradient>

          <PaymentResultModal
            modalRef={resultModalRef}
            status={resultStatus}
            message={resultMessage}
            onClose={closeResultModal}
            buttonTitle="Go To Payment Options"
          />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
