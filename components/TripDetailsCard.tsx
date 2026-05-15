import React from "react";
import { Text, View } from "react-native";
import DropoffCard from "./DropoffCard";
import PickupCard from "./PickupCard";

type AgentStatus =
  | "trip_accepted"
  | "enroute_pickup"
  | "pickup_photo_required"
  | "enroute_dropoff"
  | "dropoff_photo_required";

type StepStatus = "pending" | "in_progress" | "completed";

interface TripDetailsProps {
  estimatedTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: string;
  price: string;
  agentStatus: AgentStatus;
  pickupPhotoUri?: string | null;
  dropoffPhotoUri?: string | null;
}

const getStepStatuses = (
  status: AgentStatus,
): { pickup: StepStatus; dropoff: StepStatus } => {
  switch (status) {
    case "trip_accepted":
    case "enroute_pickup":
    case "pickup_photo_required":
      return { pickup: "in_progress", dropoff: "pending" };

    case "enroute_dropoff":
    case "dropoff_photo_required":
      return { pickup: "completed", dropoff: "in_progress" };

    default:
      return { pickup: "pending", dropoff: "pending" };
  }
};

const TripDetailsCard: React.FC<TripDetailsProps> = ({
  estimatedTime,
  pickupLocation,
  dropoffLocation,
  distance,
  price,
  agentStatus,
  pickupPhotoUri,
  dropoffPhotoUri,
}) => {
  const stepStatuses = getStepStatuses(agentStatus);

  return (
    <View className="flex-1">
      <Text className="text-xl font-sf-pro-medium mb-1 text-[#031731]">
        {estimatedTime} away
      </Text>
      <Text className="text-sm font-sf-pro-regular text-[#6B6B6B]">
        {distance} • {price}
      </Text>

      <PickupCard
        address={pickupLocation}
        status={stepStatuses.pickup}
        photoUri={pickupPhotoUri}
      />

      <DropoffCard
        address={dropoffLocation}
        status={stepStatuses.dropoff}
        photoUri={dropoffPhotoUri}
      />
    </View>
  );
};

export default TripDetailsCard;

