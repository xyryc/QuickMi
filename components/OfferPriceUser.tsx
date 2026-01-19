import ButtonPrimary from "@/components/ButtonPrimary";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonSecondary from "./ButtonSecondary";
import PriceCalculator from "./PriceCalculator";
import RideCard from "./RideCard";

interface OfferPriceUserProps {
  selectedVehicleData: any;
  suggestedPrice: number;
  onNext: (offeredPrice: number) => void;
  onBack: () => void;
  handleCancelRide: () => void;
  onCashPress: () => void;
}

const OfferPriceUser: React.FC<OfferPriceUserProps> = ({
  selectedVehicleData,
  onCashPress,
  suggestedPrice,
  onNext,
  onBack,
  handleCancelRide,
}) => {
  const [price, setPrice] = useState(suggestedPrice);
  const [tab, setTab] = useState("sender");

  // console.log("from offer price", selectedVehicleData);

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

        {/* ride card */}
        <RideCard vehicle={selectedVehicleData} />

        {/* price calculator */}
        <Text className="text-sm font-sf-pro-regular mt-4 mb-3">
          Offer your price
        </Text>

        <PriceCalculator
          price={price}
          setPrice={setPrice}
          suggestedPrice={suggestedPrice}
        />

        <View className="flex-row items-center justify-between mb-3">
          <Text className="font-sf-pro-medium text-base">Who will pay?</Text>

          {/* sender receiver tabs */}
          <View className="flex-row items-center bg-[#9FC7FC40] rounded-xl p-1 gap-2">
            <TouchableOpacity
              className={`flex-row items-center gap-2 py-2 px-3 rounded-xl
                ${tab === "sender" ? "bg-[#0F73F7]" : "bg-transparent"}
                `}
              onPress={() => setTab("sender")}
            >
              {tab === "sender" && (
                <Ionicons name="checkmark-circle" size={20} color="white" />
              )}
              <Text
                className={`text-xs font-sf-pro-regular ${tab === "sender" ? "text-white" : "text-black"}`}
              >
                Sender
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row items-center gap-2 py-2 px-3 rounded-xl
                   ${tab === "receiver" ? "bg-[#0F73F7]" : "bg-transparent"}
                `}
              onPress={() => setTab("receiver")}
            >
              {tab === "receiver" && (
                <Ionicons name="checkmark-circle" size={20} color="white" />
              )}
              <Text
                className={`text-xs font-sf-pro-regular ${tab === "receiver" ? "text-white" : "text-black"}`}
              >
                Receiver
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={onCashPress}
          className="flex-row justify-between items-center px-2 py-3 border-t border-gray-200 mb-2"
        >
          <View className="flex-row items-center gap-1.5">
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
          onPress={() => onNext(price)}
          className="w-[48%]"
        />
      </View>
    </View>
  );
};

export default OfferPriceUser;
