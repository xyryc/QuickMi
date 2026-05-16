import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type StepStatus = "pending" | "in_progress" | "completed";

interface DropoffCardProps {
  address: string;
  status: StepStatus;
  photoUri?: string | null;
  etaText?: string;
  distanceText?: string;
  showCaptureButton?: boolean;
  captureButtonDisabled?: boolean;
  captureButtonLoading?: boolean;
  onCapturePhoto?: () => void;
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

const DropoffCard: React.FC<DropoffCardProps> = ({
  address,
  status,
  photoUri,
  etaText,
  distanceText,
  showCaptureButton,
  captureButtonDisabled,
  captureButtonLoading,
  onCapturePhoto,
}) => {
  const statusUI = statusConfig[status];

  return (
    <View className={`border p-4 rounded-xl mt-4 ${statusUI.borderClassName}`}>
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-sf-pro-medium text-[#031731]">Dropoff</Text>
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
        Dropoff address
      </Text>
      <Text className="mt-2 text-[#031731] font-sf-pro-regular text-sm">
        {address}
      </Text>

      {(etaText || distanceText) && (
        <Text className="mt-2 text-[#6B6B6B] font-sf-pro-regular text-xs">
          {[etaText, distanceText].filter(Boolean).join(" • ")}
        </Text>
      )}

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
              Dropoff photo captured
            </Text>
          </View>
        </View>
      ) : null}

      {showCaptureButton ? (
        <TouchableOpacity
          disabled={captureButtonDisabled || captureButtonLoading}
          onPress={onCapturePhoto}
          className={`mt-4 py-3 rounded-2xl items-center ${
            captureButtonDisabled || captureButtonLoading
              ? "bg-[#BBD6FC]"
              : "bg-[#0F73F7]"
          }`}
        >
          <Text className="text-white font-sf-pro-semibold">
            {captureButtonLoading
              ? "Opening Camera..."
              : captureButtonDisabled
                ? "Capture Dropoff Photo"
                : "Capture Dropoff Photo"}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default DropoffCard;
