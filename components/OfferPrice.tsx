import AddressCard from "@/components/AddressCard";
import ButtonPrimary from "@/components/ButtonPrimary";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonSecondary from "./ButtonSecondary";

interface OfferPriceProps {
  suggestedPrice: string;
  onNext: (offeredPrice: string) => void;
  onBack: () => void;
  handleCancelRide: () => void;
  onCashPress: () => void;
}

const OfferPrice: React.FC<OfferPriceProps> = ({
  selectedVehicleData,
  onCashPress,
  suggestedPrice,
  onNext,
  onBack,
  handleCancelRide,
}) => {
  const [offeredPrice, setOfferedPrice] = useState(suggestedPrice);
  const insets = useSafeAreaInsets();

  // console.log("from offer price", selectedVehicleData);

  const [price, setPrice] = useState(150);
  const handlePrice = (status) => {
    if (status === "plus") {
      setPrice(price + 1);
    } else if (status === "minus") {
      setPrice(price - 1);
    }
  };

  return (
    <View className="flex-1">
      <View>
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={onBack} className="p-2">
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-xl font-sf-pro-medium">Offer Your Price</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* address details */}
        <AddressCard />

        {/* price calculator */}
        <Text className="text-sm font-sf-pro-regular mt-4 mb-3">
          Offer your price
        </Text>

        <View className="flex-row items-center px-3 py-2 border border-[#E3E6F0] rounded-lg mb-6">
          <TouchableOpacity onPress={() => handlePrice("minus")}>
            <SimpleLineIcons name="minus" size={30} color="black" />
          </TouchableOpacity>

          <View className="items-center flex-1">
            <Text className="font-sf-pro-regular text-base">₦{price}</Text>
            <Text className="font-sf-pro-regular text-[10px]">
              Recommended fare: ₦150
            </Text>
          </View>

          <TouchableOpacity onPress={() => handlePrice("plus")}>
            <SimpleLineIcons name="plus" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Button */}
      <View className="flex-row items-center gap-2">
        <ButtonSecondary
          title="Cancel"
          onPress={handleCancelRide}
          className="w-[48%]"
        />

        <ButtonPrimary
          title="Confirm"
          onPress={() => onNext(offeredPrice)}
          className="w-[48%]"
        />
      </View>
    </View>
  );
};

export default OfferPrice;
