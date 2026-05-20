import { Ionicons } from "@expo/vector-icons";
import ButtonPrimary from "@/components/ButtonPrimary";
import ScreenHeader from "@/components/ScreenHeader";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { SafeAreaView } from "react-native-safe-area-context";

const UpdateEmail = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ value: otp, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value: otp, setValue: setOtp });

  useEffect(() => {
    if (otp.length === CELL_COUNT) {
      setOtpVerified(true);
    }
  }, [otp]);

  useEffect(() => {
    if (otpSent && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [otpSent, timer]);

  const handleSendOtp = useCallback(() => {
    if (!email) return;
    setSendingOtp(true);
    setTimeout(() => {
      setSendingOtp(false);
      setOtpSent(true);
      setTimer(30);
      setOtp("");
      setOtpVerified(false);
    }, 3000);
  }, [email]);

  const canSendOtp = email.length > 0 && !otpSent && !sendingOtp;

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />
      <LinearGradient colors={["#D3E6FF", "#FFFFFF"]} locations={[0, 0.4]} style={{ flex: 1 }}>
        <ScreenHeader title="Update email address" />
        <ScrollView
          className="flex-1 mx-5"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View>
            <Text className="mt-5 text-sm">
              Your email is used for delivery receipts and account recovery.
            </Text>

            <Text className="mt-3.5 text-sm font-sf-pro-medium">Email Address</Text>
            <View className="flex-row items-center gap-3">
              <TextInput
                className="flex-1 mt-2 p-4 px-5 border border-[#E3E6F0] rounded-xl bg-white"
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
              />
              {otpVerified && (
                <Ionicons name="checkmark-outline" size={16} color="#16A34A" />
              )}
            </View>

            {canSendOtp && !otpVerified && (
              <TouchableOpacity onPress={handleSendOtp} className="mt-3 items-center">
                <Text className="text-[#0F73F7] text-sm font-sf-pro-medium">Send OTP</Text>
              </TouchableOpacity>
            )}

            {sendingOtp && (
              <Text className="mt-3 text-[#0F73F7] text-sm font-sf-pro-medium text-center">
                Sending OTP...
              </Text>
            )}

            {otpSent && !otpVerified && (
              <View className="mt-6">
                <View className="flex-row items-center justify-center gap-2">
                  <Text className="text-sm font-sf-pro-medium">Resend OTP in</Text>
                  <Text className="text-sm font-sf-pro-semibold text-[#0F73F7]">{timer}s</Text>
                </View>

                <View className="items-center mt-4">
                  <CodeField
                    ref={ref}
                    {...props}
                    value={otp}
                    onChangeText={setOtp}
                    cellCount={CELL_COUNT}
                    rootStyle={{ gap: 16, width: 300, justifyContent: "center" }}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                      <View
                        key={index}
                        onLayout={getCellOnLayoutHandler(index)}
                        className={`flex-1 h-14 justify-center items-center border-2 rounded-xl ${
                          isFocused
                            ? "border-[#0F73F7]"
                            : symbol
                              ? "border-[#0F73F7]"
                              : "border-[#E3E6F0]"
                        } bg-white`}
                      >
                        <Text className="text-2xl font-sf-pro-semibold text-[#031731]">
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      </View>
                    )}
                  />
                </View>

                {timer === 0 && (
                  <TouchableOpacity onPress={handleSendOtp} className="self-center mt-3">
                    <Text className="text-[#0F73F7] text-sm font-sf-pro-medium">Resend OTP</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          <View style={{ flex: 1 }} />

          <View className="pb-8 pt-3">
            <ButtonPrimary title="Save" disabled={!otpVerified} onPress={() => router.back()} />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default UpdateEmail;
