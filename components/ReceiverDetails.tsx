import ButtonPrimary from "@/components/ButtonPrimary";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ReceiverDetailsProps {
  receiverDetails: {
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

const ReceiverDetails: React.FC<ReceiverDetailsProps> = ({
  receiverDetails,
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
        <Text className="text-xl font-sf-pro-medium">Receiver's Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <View className="flex-1">
        {/* Receiver phone number */}
        <BottomSheetTextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Enter receiver's name"
          value={receiverDetails.name}
          onChangeText={(text) =>
            onDetailsChange({ ...receiverDetails, name: text })
          }
        />

        {/* Receiver name */}
        <BottomSheetTextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Enter phone number"
          value={receiverDetails.phone}
          onChangeText={(text) =>
            onDetailsChange({ ...receiverDetails, phone: text })
          }
          keyboardType="phone-pad"
        />

        {/* Additional note */}
        <BottomSheetTextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Additional Direction (Optional)"
          value={receiverDetails.address}
          onChangeText={(text) =>
            onDetailsChange({ ...receiverDetails, address: text })
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
        <ButtonPrimary title="Confirm Receiver" onPress={onNext} />
      </View>
    </View>
  );
};

export default ReceiverDetails;
