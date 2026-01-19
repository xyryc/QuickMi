import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import DriverProfileHeader from "./DriverProfileHeader";

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
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity onPress={onBack} className="p-2">
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-sf-pro-medium">Driver Details</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Driver Photo and Name */}
      <DriverProfileHeader />

      {/* Driver Information */}
      <View className="p-4 border border-[#E3E6F0] rounded-xl mt-6">
        <TouchableOpacity onPress={handleCall}>
          <Text className="font-sf-pro-medium text-lg mb-1">Phone number</Text>
          <Text className="font-sf-pro-regular">+(880) 1570 233 979</Text>
        </TouchableOpacity>

        <View className="border-t border-gray-200 my-3" />

        <View>
          <Text className="font-sf-pro-medium text-lg mb-1">
            License plate number
          </Text>
          <Text className="font-sf-pro-regular">SK 7776-41</Text>
        </View>

        <View className="border-t border-gray-200 my-3" />

        <View>
          <Text className="font-sf-pro-medium mb-1">Vehicle</Text>
          <Text className="font-sf-pro-regular">Toyota Vitz, Black</Text>
        </View>
      </View>
    </View>
  );
};

export default DriverDetails;
