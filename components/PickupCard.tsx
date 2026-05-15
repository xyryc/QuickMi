import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

type StepStatus = "pending" | "in_progress" | "completed";

interface PickupCardProps {
  address: string;
  status: StepStatus;
  photoUri?: string | null;
}

const statusConfig: Record<
  StepStatus,
  {
    label: string;
    badgeClassName: string;
    dotColor: string;
    borderClassName: string;
  }
> = {
  pending: {
    label: "Pending",
    badgeClassName: "bg-[#F3F4F6]",
    dotColor: "#9CA3AF",
    borderClassName: "border-[#E3E6F0]",
  },
  in_progress: {
    label: "In Progress",
    badgeClassName: "bg-[#DBEAFE]",
    dotColor: "#0F73F7",
    borderClassName: "border-[#0F73F7]",
  },
  completed: {
    label: "Completed",
    badgeClassName: "bg-[#DCFCE7]",
    dotColor: "#16A34A",
    borderClassName: "border-[#86EFAC]",
  },
};

const PickupCard: React.FC<PickupCardProps> = ({ address, status, photoUri }) => {
  const statusUI = statusConfig[status];

  return (
    <View className={`border p-4 rounded-xl mt-4 ${statusUI.borderClassName}`}>
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-sf-pro-medium text-[#031731]">
          Pick-up From
        </Text>
        <View
          className={`px-3 py-1 rounded-full flex-row items-center gap-1 ${statusUI.badgeClassName}`}
        >
          <View
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: statusUI.dotColor }}
          />
          <Text className="text-xs font-sf-pro-medium text-[#031731]">
            {statusUI.label}
          </Text>
        </View>
      </View>

      <Text className="mt-3 text-[#3F8FF9] font-sf-pro-regular text-xs">
        Pickup address
      </Text>
      <Text className="mt-2 text-[#031731] font-sf-pro-regular text-sm">
        {address}
      </Text>

      {photoUri ? (
        <View className="mt-3 relative">
          <Image
            source={{ uri: photoUri }}
            style={{ width: "100%", height: 120, borderRadius: 12 }}
            contentFit="cover"
          />
          <View className="absolute bottom-2 left-2 bg-black/60 px-3 py-1 rounded-full flex-row items-center gap-1">
            <Ionicons name="checkmark-circle" size={14} color="#10B981" />
            <Text className="text-white text-xs font-sf-pro-medium">
              Pickup photo captured
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default PickupCard;

