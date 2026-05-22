import { useSendOtpMutation, useVerifyOtpMutation } from "@/store/api/authApi";
import { getUserRole, setAuthCompleted, setAuthTokens } from "@/utils/storage";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
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

const VerifyCode = () => {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();

  const router = useRouter();
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      handleVerifySuccess();
    }
  }, [value]);

  const handleVerifySuccess = async () => {
    if (!phoneNumber || value.length !== CELL_COUNT || isVerifying) return;

    try {
      const res = await verifyOtp({
        phone: phoneNumber,
        code: value,
      }).unwrap();

      // store token
      const { accessToken, refreshToken } = res.data;
      console.log("verifycode", accessToken, refreshToken);
      await setAuthTokens(accessToken, refreshToken);
      await setAuthCompleted();

      const role = await getUserRole();
      // Navigate based on role
      if (role === "RIDER") {
        router.replace("/(agent-verification)");
      } else {
        router.replace("/(user)/(tabs)/home");
      }
    } catch (error) {
      Alert.alert("Verification failed", error?.data?.message);
      setValue("");
    }
  };

  const handleResendCode = async () => {
    if (!phoneNumber || isResending) return;

    try {
      await sendOtp({ phone: phoneNumber }).unwrap();
      Alert.alert("Success", "OTP sent successfully");
    } catch (err: any) {
      Alert.alert("Resend Failed", err?.data?.message || "Please try again");
    }
  };

  return (
    <SafeAreaView className="border flex-1" edges={["left", "right", "bottom"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.3]}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerClassName="mx-5 flex-1"
          contentContainerStyle={{ justifyContent: "center" }}
        >
          {/* header text */}
          <Text className="text-2xl font-sf-pro-medium text-custom-blue-900 mb-2 text-center">
            Enter <Text className="text-custom-blue-500">Verification</Text>{" "}
            Code.
          </Text>
          <Text className="font-sf-pro-regular text-custom-gray-dark text-center">
            We’ve sent an OTP code to your number, {phoneNumber}
          </Text>

          <View className="items-center mt-8">
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={{
                gap: 16,
                width: 300,
                justifyContent: "center",
              }}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  onLayout={getCellOnLayoutHandler(index)}
                  className={`flex-1 h-14 justify-center items-center border-2 rounded-xl ${
                    isFocused
                      ? "border-custom-blue-500"
                      : symbol
                        ? "border-custom-blue-300"
                        : "border-custom-soft-gray"
                  } bg-white`}
                >
                  <Text className="text-2xl font-sf-pro-semibold text-custom-blue-900">
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>

          <View className="flex-row items-center justify-center mt-8">
            <Text className="font-sf-pro-regular text-custom-dark-gray text-center">
              Didn’t receive any code?
            </Text>
            <TouchableOpacity onPress={handleResendCode} disabled={isResending}>
              <Text className="p-2 font-sf-pro-regular text-blue-600 text-base">
                Resend
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default VerifyCode;
