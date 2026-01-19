import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ButtonSecondary = ({ className, onPress, title, icon, iconPosition }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${iconPosition === "left" ? "flex-row-reverse" : "flex-row"}
                    ${className} flex-row items-center justify-center gap-2 bg-white border-2 border-blue-500 py-2 rounded-2xl`}
    >
      <Text className="font-sf-pro-semibold text-lg text-[#0F73F7]">
        {title}
      </Text>
      {icon}
    </TouchableOpacity>
  );
};

export default ButtonSecondary;
