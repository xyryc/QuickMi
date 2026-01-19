import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import ButtonPrimary from "./ButtonPrimary";
import DriverProfileHeader from "./DriverProfileHeader";

interface DriverDetails {
  driverId: string;
  driverName: string;
  driverPhoto: string;
  rating: number;
  phoneNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  vehicleColor: string;
  currentLocation: string;
  estimatedArrival: string;
  price: number;
}

interface ArrivingDetailsProps {
  offeredPrice: number;
  suggestedPrice: number;
  driverDetails: DriverDetails;
  onCallDriver: () => void;
  onCancelRide: () => void;
  bottomInset: number;
  onShareDriverDetails: () => void;
}

const ArrivingDetails: React.FC<ArrivingDetailsProps> = ({
  offeredPrice,
  suggestedPrice,
  driverDetails,
  onCallDriver,
  onCancelRide,
  onShareDriverDetails,
  bottomInset,
}) => {
  const handleCall = () => {
    Linking.openURL(`tel:${driverDetails.phoneNumber}`);
    onCallDriver();
  };

  return (
    <View className="flex-1">
      {/* time  */}
      <View className="flex-row justify-between">
        <Text className="text-lg font-sf-pro-semibold">
          Arriving in 7 minutes
        </Text>
        <FontAwesome6 name="location-dot" size={20} color="#0F73F7" />
      </View>

      {/* location */}
      <View className="flex-row items-center gap-2 mt-1.5 mb-4">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="car-outline" size={24} color="black" />
          <Text className="text-sm font-sf-pro-medium text-gray-600">
            Lamborghini Aventador
          </Text>
        </View>
        <View className="bg-[#0F73F7] px-2 py-1 rounded-lg">
          <Text className="font-sf-pro-semibold text-sm text-white">
            SK 7776-41
          </Text>
        </View>
      </View>

      {/* content section */}
      <View>
        {/* profile with message call */}
        <DriverProfileHeader />

        {/* receiver details */}
        <View className="border border-[#005FDC24] p-4 rounded-xl mt-3.5">
          <View className="flex-row items-center gap-1 ">
            <Text className="font-sf-pro-semibold text-base">#5R9G87R</Text>

            <Octicons name="dot-fill" size={6} color="#6b7280" />

            <Text className="text-gray-500 font-sf-pro-regular">
              14 may 2023
            </Text>
          </View>

          <View className="flex-row gap-2 mt-3.5 pr-4">
            <Octicons name="location" size={24} color="#0F73F7" />

            <View>
              <Text className="text-base font-sf-pro-semibold">To</Text>
              <Text className="font-sf-pro-semibold text-sm text-blue-500">
                Receiver Details
              </Text>

              <Text className="font-sf-pro-semibold text-sm mt-2">
                2nd Floor 01, 25 Mao Tse Toung Blvd (245), Phnom Penh 12302,
                Cambodia
              </Text>
            </View>
          </View>
        </View>

        {/* distance and fair details */}
        <View className="border border-[#005FDC24] mt-3.5 p-4 rounded-xl">
          <View className="flex-row justify-between">
            <Text className="font-sf-pro-regular text-gray-500">Distance</Text>

            <View className="flex-row items-center gap-1">
              <Text className="font-sf-pro-regular text-gray-500">Charge</Text>
              <Ionicons name="information-circle" size={14} color="#0F73F7" />
            </View>
          </View>

          <View className="flex-row justify-between items-center mt-1">
            <Text className="font-sf-pro-medium text-lg ">5.53 KM</Text>

            <View className="flex-row items-center gap-2">
              <Text className="font-sf-pro-medium text-sm text-red-500 line-through">
                ${suggestedPrice}
              </Text>
              <Text className="font-sf-pro-medium text-lg">
                ${offeredPrice}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center pt-1.5">
            <Text className="font-sf-pro-medium text-base">Who will pay?</Text>

            <ButtonPrimary
              title="Sender"
              className="!py-2 px-3"
              iconPosition="left"
              icon={
                <Ionicons name="checkmark-circle" size={24} color="white" />
              }
            />
          </View>
        </View>

        {/* driver details, cancel delivery */}
        <TouchableOpacity
          onPress={onShareDriverDetails}
          className="border border-[#005FDC24] flex-row items-center gap-2 bg-[#CFE3FD] mt-4 py-3 px-4 rounded-t-xl"
        >
          <Ionicons name="share-outline" size={24} color="black" />
          <Text className="font-sf-pro-semibold text-base">
            Share driver details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCancelRide}
          className="flex-row items-center gap-2 px-4 border border-[#005FDC24] py-3 rounded-b-xl"
        >
          <MaterialCommunityIcons
            name="archive-cancel-outline"
            size={24}
            color="black"
          />
          <Text className="font-sf-pro-semibold text-base">
            Cancel Delivery
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ArrivingDetails;
