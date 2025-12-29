import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface WaitForDriverProps {
  onDriverAccepted: () => void;
  onCancel: () => void;
  bottomInset: number;
}

const WaitForDriver: React.FC<WaitForDriverProps> = ({
  onDriverAccepted,
  onCancel,
  bottomInset,
}) => {
  const [timeWaiting, setTimeWaiting] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeWaiting((prev) => prev + 1);
    }, 1000);

    // Simulate driver accepting after 5 seconds (for demo)
    const timeout = setTimeout(() => {
      onDriverAccepted();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onDriverAccepted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View className="flex-1">
      <Text className="text-xl font-sf-pro-medium text-center">
        Waiting for a Driver...
      </Text>

      {/* waiting time */}
      <Text className="text-xs text-center mt-2 mb-4">
        Elapsed time: {timeWaiting} seconds
      </Text>

      {/* progress */}
      <View></View>

      <View className="items-center">
        <View className="w-12 h-12 border border-[#0F73F724] rounded-full items-center justify-center">
          <MaterialCommunityIcons
            name="package-variant-closed-remove"
            size={22}
            color="#4D4D4D"
          />
        </View>

        <TouchableOpacity onPress={onCancel} className="mt-2">
          <Text className="font-sf-pro-semibold text-xs text-[#F34F4F]">
            Cancel order
          </Text>
        </TouchableOpacity>
      </View>

      {/* receiver info */}
      <View className="mt-2 border border-[#E3E6F0] rounded-xl p-4">
        {/* 1st row */}
        <View className="flex-row justify-between items-center mb-3.5">
          <Text className="font-sf-pro-semibold text-base">#5R9G87R</Text>
          <View className="flex-row items-center gap-1">
            <Octicons name="dot-fill" size={6} color="#BABFC5" />
            <Text className="text-gray-400 text-sm font-sf-pro-regular">
              14 may 2023
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          {/* left */}
          <View>
            <Octicons
              className="mb-2"
              name="location"
              size={20}
              color="#0F73F7"
            />
          </View>

          {/* right */}
          <View className="flex-1">
            {/* 1st row */}
            <View className="flex items-start">
              <Text className="font-sf-pro-semibold text-base">To</Text>
              <Text className="font-sf-pro-regular text-blue-400 text-xs">
                Receiver Details
              </Text>
            </View>

            <Text className="text-sm font-sf-pro-regular mt-3">
              2nd Floor 01, 25 Mao Tse Toung Blvd (245), Phnom Penh 12302,
              Cambodia
            </Text>
          </View>
        </View>
      </View>

      {/* pricing info */}
      <View className="p-4 border border-[#E3E6F0] mt-3.5 rounded-xl">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="font-sf-pro-regular text-sm text-gray-400">
            Suggested Fare
          </Text>

          <Text className="text-lg font-sf-pro-medium">$150</Text>
        </View>

        <View className="flex-row items-center justify-between mb-3">
          <Text className="font-sf-pro-regular text-sm text-gray-400">
            Distance
          </Text>

          <Text className="text-lg font-sf-pro-medium">5.39 KM</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="font-sf-pro-regular text-sm text-gray-400">
            Your offer price
          </Text>

          <View className="flex-row items-center">
            <Text className="text-lg font-sf-pro-medium text-red-500 line-through">
              $150
            </Text>
            <Text className="text-lg font-sf-pro-medium">$140</Text>
          </View>
        </View>
      </View>

      {/* Cancel Button */}
      {/* <View
        className="border-t border-gray-200 pt-4"
        style={{
          marginBottom: bottomInset + 20,
        }}
      >
        <TouchableOpacity
          className="bg-red-500 rounded-xl py-4 items-center"
          onPress={onCancel}
        >
          <Text className="text-white font-sf-pro-medium text-base">
            Cancel Request
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default WaitForDriver;
