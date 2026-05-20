import ButtonPrimary from "@/components/ButtonPrimary";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface SenderDetailsProps {
  senderDetails: {
    name: string;
    phone: string;
    address: string;
  };
  onDetailsChange: (details: {
    name: string;
    phone: string;
    address: string;
  }) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

const SenderDetails: React.FC<SenderDetailsProps> = ({
  senderDetails,
  onDetailsChange,
  onNext,
  onSkip,
  onBack,
}) => {
  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={onBack} className="p-2">
          <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-sf-pro-medium">
          Sender&apos;s Details
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View className="flex-1">
        {/* Sender name */}
        <TextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Enter sender's name"
          value={senderDetails.name}
          onChangeText={(text) =>
            onDetailsChange({ ...senderDetails, name: text })
          }
        />

        {/* Sender phone */}
        <TextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Enter phone number"
          value={senderDetails.phone}
          onChangeText={(text) =>
            onDetailsChange({ ...senderDetails, phone: text })
          }
          keyboardType="phone-pad"
        />

        {/* Additional note */}
        <TextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Additional Direction (Optional)"
          value={senderDetails.address}
          onChangeText={(text) =>
            onDetailsChange({ ...senderDetails, address: text })
          }
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        <Text className="font-sf-pro-regular text-xs text-gray-400">
          Floor, House, Road, Landmark
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="pt-4">
        <ButtonPrimary title="Confirm Sender" onPress={onNext} />
      </View>
    </View>
  );
};

export default SenderDetails;
