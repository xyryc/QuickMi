import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PriceCalculatorProps {
  price: number;
  setPrice: (price: number) => number;
  suggestedPrice: number;
}

const PriceCalculator = ({
  price,
  setPrice,
  suggestedPrice,
}: PriceCalculatorProps) => {
  const handlePrice = (status: string) => {
    if (status === "plus") {
      setPrice(price + 1);
    } else if (status === "minus") {
      setPrice(price - 1);
    }
  };

  return (
    <View className="flex-row items-center px-3 py-2 border border-[#E3E6F0] rounded-lg mb-6">
      <TouchableOpacity
        className="border border-[#0F73F7E5] rounded-full p-2"
        onPress={() => handlePrice("minus")}
      >
        <AntDesign name="minus" size={24} color="black" />
      </TouchableOpacity>

      <View className="items-center flex-1">
        <Text className="font-sf-pro-semibold text-base">{price}</Text>
        <Text className="font-sf-pro-medium text-sm">
          Recommended fare: ${suggestedPrice}
        </Text>
      </View>

      <TouchableOpacity
        className="border border-[#0F73F7E5] rounded-full p-2"
        onPress={() => handlePrice("plus")}
      >
        <AntDesign name="plus" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default PriceCalculator;
