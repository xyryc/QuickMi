import ButtonPrimary from "@/components/ButtonPrimary";
import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ButtonSecondary from "./ButtonSecondary";
import RideCard from "./RideCard";

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

        {/* selected vehicle data */}
        <RideCard vehicle={selectedVehicleData} />

        {/* price calculator */}
        <View className="flex-row items-center px-3 py-2 border border-[#E3E6F0] mt-2 rounded-lg mb-6">
          <TouchableOpacity onPress={() => handlePrice("minus")}>
            <SimpleLineIcons name="minus" size={30} color="black" />
          </TouchableOpacity>

          <View className="items-center flex-1">
            <Text className="font-sf-pro-regular text-base">${price}</Text>
            <Text className="font-sf-pro-regular text-[10px]">
              Recommended fare: $150
            </Text>
          </View>

          <TouchableOpacity onPress={() => handlePrice("plus")}>
            <SimpleLineIcons name="plus" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* who will pay */}
        <View className="flex-row items-center justify-between mb-2.5">
          <Text className="text-base font-sf-pro-medium">Who will pay?</Text>

          <View className="flex-row items-center gap-2 bg-[#9FC7FC40] p-1 rounded-xl">
            <ButtonPrimary
              title="Sender"
              icon={
                <Ionicons name="checkmark-circle" size={16} color="white" />
              }
              iconPosition="left"
              className="px-3 !py-2"
            />
            <ButtonPrimary
              title="Receiver"
              // icon={<Ionicons name="checkmark-circle" size={16} color="white" />}
              iconPosition="left"
              className="px-3 !py-2 !bg-transparent"
              textClassName="!text-gray-600"
            />
          </View>
        </View>

        <View className="border-t border-gray-200 " />

        {/* Quick Price Options */}
        <TouchableOpacity
          onPress={onCashPress} // NEW PROP
          className="flex-row justify-between items-center px-2 py-3"
        >
          <View className="flex-row items-center gap-2">
            <Ionicons name="cash-outline" size={16} color="#008364" />
            <Text className="font-sf-pro-regular text-base">Cash</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
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
