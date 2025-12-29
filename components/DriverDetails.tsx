import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

interface DriverDetailsProps {
  driverDetails: {
    driverName: string;
    driverPhoto: string;
    rating: number;
    phoneNumber: string;
    vehicleType: string;
    vehicleNumber: string;
    vehicleColor: string;
    estimatedArrival: string;
  };
  onBack: () => void;
  onShare: () => void;
}

const DriverDetails: React.FC<DriverDetailsProps> = ({
  driverDetails,
  onBack,
  onShare,
}) => {
  const handleCall = () => {
    Linking.openURL(`tel:${driverDetails.phoneNumber}`);
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={onBack} className="p-2">
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-sf-pro-medium">Driver Details</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Driver Photo and Name */}
        <View className="flex-row justify-between items-center mb-8">
          <View className="flex-row items-center gap-2">
            <Image
              source="https://media.licdn.com/dms/image/v2/D5603AQFMeZ7i9ybZgw/profile-displayphoto-shrink_200_200/B56ZS29wLQHwAY-/0/1738236429558?e=2147483647&v=beta&t=RTX-UGEWSzuEb-Gv2bqXqREzQX15FMKi0TK1HJBAKuE"
              style={{
                width: 62,
                height: 62,
                borderRadius: 99,
              }}
              contentFit="cover"
            />

            <View>
              <Text className="text-lg font-sf-pro-medium text-gray-700">
                Md Talath Un Nabi Anik
              </Text>

              <View className="flex-row items-center gap-1 mt-1.5">
                <Octicons name="star-fill" size={16} color="#FFD700" />
                <Text className="font-sf-pro-medium text-sm">4.5</Text>

                <Text className="font-sf-pro-regular text-xs text-[#4D4D4D]">
                  |
                </Text>

                <Text className="font-sf-pro-regular text-xs text-[#4D4D4D]">
                  150 Delivery
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center gap-3">
            <View className="w-11 h-11 rounded-full items-center justify-center bg-[#CFE3FD42] border border-[#0F73F724]">
              <Ionicons
                name="chatbox-ellipses-outline"
                size={20}
                color="#4D4D4D"
              />
            </View>

            <View className="w-11 h-11 rounded-full items-center justify-center bg-[#CFE3FD42] border border-[#0F73F724]">
              <Ionicons name="call-outline" size={20} color="#4D4D4D" />
            </View>
          </View>
        </View>

        {/* Driver Information */}
        <View className="p-4 border border-[#E3E6F0] rounded-xl">
          <TouchableOpacity onPress={handleCall}>
            <Text className="text-sm font-sf-pro-medium mb-2">
              Phone number
            </Text>
            <Text className="font-sf-pro-regular text-sm">
              +(880) 1570 233 979
            </Text>
          </TouchableOpacity>

          <View className="border-t border-gray-200 my-3" />

          <View>
            <Text className="text-sm font-sf-pro-medium mb-2">
              License plate number
            </Text>
            <Text className="font-sf-pro-regular text-sm">SK 7776-41</Text>
          </View>

          <View className="border-t border-gray-200 my-3" />

          <View>
            <Text className="text-sm font-sf-pro-medium mb-2">Vehicle</Text>
            <Text className="font-sf-pro-regular text-sm">
              Toyota Vitz, Black
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DriverDetails;
