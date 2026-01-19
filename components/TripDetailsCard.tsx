import ButtonPrimary from "@/components/ButtonPrimary";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import DropoffCard from "./DropoffCard";
import PickupCard from "./PickupCard";

interface TripDetailsProps {
  tripId: string;
  estimatedTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: string;
  price: string;
  onStartTrip: () => void;
  onCancelTrip: () => void;
}

const TripDetailsCard: React.FC<TripDetailsProps> = ({
  tripId,
  estimatedTime,
  pickupLocation,
  dropoffLocation,
  distance,
  price,
  onStartTrip,
  onCancelTrip,
}) => {
  const router = useRouter();

  return (
    <View className="flex-1">
      {/* Header */}
      <Text className="text-xl font-sf-pro-medium mb-4">16min(1.4mi) away</Text>

      {/* pickup from */}
      <PickupCard />

      {/* Drop off */}
      <DropoffCard />

      {/* Action Buttons */}
      <ButtonPrimary title="Complete Delivery" className="mt-5" />
    </View>
  );
};

export default TripDetailsCard;
