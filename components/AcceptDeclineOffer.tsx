import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import DriverProfileHeader from "./DriverProfileHeader";

interface DriverOffer {
  driverId: string;
  driverName: string;
  driverPhoto: string;
  rating: number;
  vehicleType: string;
  vehicleNumber: string;
  price: string;
  estimatedTime: string;
}

interface AcceptDeclineOfferProps {
  driverOffer: DriverOffer;
  onAccept: () => void;
  onDecline: () => void;
  bottomInset: number;
}

const AcceptDeclineOffer: React.FC<AcceptDeclineOfferProps> = ({
  driverOffer,
  onAccept,
  onDecline,
  bottomInset,
}) => {
  return (
    <View className="flex-1">
      <Text className="text-xl font-sf-pro-medium text-center mb-4">
        Driver Found!
      </Text>

      {/* location */}
      <View className="flex-row items-center gap-2 mt-1.5 mb-4">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="car-sport-outline" size={24} color="black" />
          <Text className="text-xs font-sf-pro-medium text-gray-600">
            Lamborghini Aventador
          </Text>
        </View>
        <View className="bg-[#0F73F7] px-2 py-1 rounded-lg">
          <Text className="font-sf-pro-semibold text-xs text-white">
            SK 7776-41
          </Text>
        </View>
      </View>

      {/* profile with message call */}
      <DriverProfileHeader />

      {/* pricing info */}
      <View className="p-4 border border-[#E3E6F0] my-3.5 rounded-xl">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="font-sf-pro-regular text-sm text-gray-400">
            Suggested Fare
          </Text>

          <Text className="text-lg font-sf-pro-medium">₦150</Text>
        </View>

        <View className="flex-row items-center justify-between mb-3">
          <Text className="font-sf-pro-regular text-sm text-gray-400">
            Distance
          </Text>

          <Text className="text-lg font-sf-pro-medium">5.39 KM</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Text className="font-sf-pro-regular text-sm text-gray-400">
              Charge
            </Text>
            <Ionicons name="alert-circle" size={16} color="#0f73f7" />
          </View>

          <View className="flex-row items-center gap-1">
            <Text className="text-lg font-sf-pro-medium text-red-500 line-through">
              ₦150
            </Text>
            <Text className="text-lg font-sf-pro-medium">₦140</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="pt-4">
        <ButtonPrimary title="Accept Offer" onPress={onAccept} />

        <ButtonSecondary
          title="Decline"
          onPress={onDecline}
          className="mt-3"
          icon={
            <MaterialCommunityIcons
              name="package-variant-closed-remove"
              size={16}
              color="#0F73F7"
            />
          }
          iconPosition="left"
        />
      </View>
    </View>
  );
};

export default AcceptDeclineOffer;
