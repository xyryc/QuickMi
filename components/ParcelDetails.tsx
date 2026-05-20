import ButtonPrimary from "@/components/ButtonPrimary";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ParcelDetailsProps {
  parcelDetails: {
    parcelName: string;
    parcelNumber: string;
    phone: string;
    shortNote: string;
  };
  onDetailsChange: (details: {
    parcelName: string;
    parcelNumber: string;
    phone: string;
    shortNote: string;
  }) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

const ParcelDetails: React.FC<ParcelDetailsProps> = ({
  parcelDetails,
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
        <Text className="text-xl font-sf-pro-medium">Parcel Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <View className="flex-1">
        {/* Parcel name */}
        <BottomSheetTextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Enter parcel name"
          value={parcelDetails.parcelName}
          onChangeText={(text) =>
            onDetailsChange({ ...parcelDetails, parcelName: text })
          }
        />

        {/* Parcel number */}
        <BottomSheetTextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Enter parcel number"
          value={parcelDetails.parcelNumber}
          onChangeText={(text) =>
            onDetailsChange({ ...parcelDetails, parcelNumber: text })
          }
        />

        {/* Contact phone */}
        <BottomSheetTextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Enter phone number"
          value={parcelDetails.phone}
          onChangeText={(text) =>
            onDetailsChange({ ...parcelDetails, phone: text })
          }
          keyboardType="phone-pad"
        />

        {/* Additional note */}
        <BottomSheetTextInput
          className="border border-gray-300 placeholder:text-black/40 rounded-lg p-4 font-sf-pro-regular text-base mb-3"
          placeholder="Short note/details (Optional)"
          value={parcelDetails.shortNote}
          onChangeText={(text) =>
            onDetailsChange({ ...parcelDetails, shortNote: text })
          }
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      {/* Action Buttons */}
      <View className="pt-4">
        <ButtonPrimary title="Confirm Parcel Details" onPress={onNext} />
      </View>
    </View>
  );
};

export default ParcelDetails;
