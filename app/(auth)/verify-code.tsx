import { getUserRole, setAuthCompleted } from "@/utils/storage";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      handleVerifySuccess();
    }
  }, [value]);

  const handleVerifySuccess = async () => {
    await setAuthCompleted();

    // Get user's selected role
    const role = await getUserRole();

    // Navigate based on role
    if (role === "agent") {
      router.replace("/(agent-verification)");
    } else {
      router.replace("/(user)/home");
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
            <TouchableOpacity>
              <Text className="p-2 font-sf-pro-regular text-custom-dark-gray text-base">
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
