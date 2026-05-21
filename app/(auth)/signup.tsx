import ButtonPrimary from "@/components/ButtonPrimary";
import { useSignupMutation } from "@/store/api/authApi";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { isValidPhoneNumber } from "libphonenumber-js";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-international-phone-number";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [signup, { isLoading }] = useSignupMutation();

  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneError, setPhoneError] = useState("");

  const validatePhoneNumber = (phone: string, country: any) => {
    if (!phone || phone.length === 0) {
      setPhoneError("Phone number is required");
      return false;
    }

    if (!country || !country.idd?.root) {
      setPhoneError("Please select a country");
      return false;
    }

    try {
      // Remove spaces from phone number
      const cleanPhone = phone.replace(/\s/g, "");

      // Use idd.root which already includes the +
      const fullNumber = `${country.idd.root}${cleanPhone}`;

      // console.log("Validating:", fullNumber);
      const isValid = isValidPhoneNumber(fullNumber);

      if (!isValid) {
        setPhoneError("Please enter a valid phone number");
        return false;
      }
      setPhoneError("");
      return true;
    } catch (error) {
      // console.log("Validation error:", error);
      setPhoneError("Invalid phone number format");
      return false;
    }
  };

  const handleSignup = async () => {
    const isPhoneValid = validatePhoneNumber(phoneNumber, selectedCountry);

    if (!isPhoneValid) {
      return;
    }

    const cleanPhone = phoneNumber.replace(/\s/g, "");
    // @ts-ignore
    const fullPhoneNumber = `${selectedCountry.idd.root}${cleanPhone}`;

    console.log("User entered", fullPhoneNumber, name);

    try {
      const res = await signup({
        fullName: name.trim(),
        role: "USER",
        phone: fullPhoneNumber.trim(),
      }).unwrap();

      // Alert.alert("Success", res.message);

      router.push({
        pathname: "/(auth)/verify-code",
        params: { phoneNumber: fullPhoneNumber },
      });
    } catch (error: any) {
      Alert.alert("Signup failed", error?.data?.message);
      // console.log("signup error", error?.data?.message);
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
          <Text className="text-2xl font-sf-pro-medium text-custom-blue-900 mb-3 text-center">
            Welcome Back!
          </Text>
          <Text className="font-sf-pro-regular text-custom-gray-dark text-center">
            By continuing, you agree to calls, including by autodialer,
            WhatsApp, or texts from Quickmi and its affiliates.
          </Text>

          {/* inputs */}
          <View className="mt-7">
            <Text className="text-custom-blue-900 font-sf-pro-medium mb-3">
              Enter Your Full Name
            </Text>

            <TextInput
              placeholder="Enter your name"
              className="mb-4 border border-custom-soft-gray rounded-lg p-4 font-sf-pro-regular text-base placeholder:text-gray-500"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <Text className="text-custom-blue-900 font-sf-pro-medium mb-3">
              Enter Your Phone Number
            </Text>

            <PhoneInput
              className="placeholder:text-[#6b7280]"
              value={phoneNumber}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={(country) => {
                // console.log("Country selected:", country);
                // console.log("Has callingCode?", country.callingCode);
                // console.log("IDD root:", country.idd?.root);
                setSelectedCountry(country);
                if (phoneNumber.length > 0) {
                  validatePhoneNumber(phoneNumber, country);
                }
              }}
              onChangePhoneNumber={(text) => {
                // console.log(
                //   "Phone changed:",
                //   text,
                //   "Country:",
                //   selectedCountry
                // );
                setPhoneNumber(text);
                if (text.length > 0 && selectedCountry) {
                  validatePhoneNumber(text, selectedCountry);
                } else if (text.length === 0) {
                  setPhoneError("");
                }
              }}
              defaultCountry="US"
              placeholder="Enter phone number"
              phoneInputStyles={{
                container: {
                  backgroundColor: "white",
                  borderRadius: 8,
                  borderColor: phoneError ? "#EF4444" : "#E5E7EB",
                  borderWidth: 1,
                  marginBottom: 28,
                },
                input: {
                  fontFamily: "SF-Pro-Regular",
                  fontSize: 14,
                  fontWeight: "400",
                },
              }}
            />
          </View>

          <ButtonPrimary onPress={handleSignup} title="Continue" />

          <View className="my-4 flex-row items-center gap-2">
            <View className="w-[46%] h-[1px] bg-gray-200" />
            <Text className="font-sf-pro-regular text-sm text-custom-dark-gray">
              Or
            </Text>
            <View className="w-[46%] h-[1px] bg-gray-200" />
          </View>

          {/* social logins */}
          <View>
            <TouchableOpacity className="flex-row justify-center items-center gap-2 py-4 rounded-2xl border border-gray-300 mb-2">
              <Image
                source={require("@/assets/images/google.svg")}
                style={{
                  width: 20,
                  height: 20,
                }}
                contentFit="contain"
              />
              <Text className="font-sf-pro-regular text-sm text-custom-blue-900">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row justify-center items-center gap-2 py-4 rounded-2xl border border-gray-300">
              <Image
                source={require("@/assets/images/apple.svg")}
                style={{
                  width: 20,
                  height: 20,
                }}
                contentFit="contain"
              />
              <Text className="font-sf-pro-regular text-sm text-custom-blue-900">
                Continue with Apple
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignUp;
