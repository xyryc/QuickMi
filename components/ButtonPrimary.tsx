import React from "react";
import { Text, TouchableOpacity } from "react-native";

const ButtonPrimary = ({
  className,
  textClassName,
  onPress,
  title,
  icon,
  iconPosition,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${iconPosition === "left" ? "flex-row-reverse" : "flex-row"}
        ${className} flex-row items-center justify-center gap-2 bg-custom-blue-500 py-3 rounded-2xl`}
    >
      <Text className={`${textClassName} font-sf-pro-semibold text-white`}>
        {title}
      </Text>

      {icon}
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
