import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  iconSize?: number;
  iconColor?: string;
  containerClassName?: string;
  inputClassName?: string;
  showLocationPicker?: boolean;
  locationPickerPath?: any;
}

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChangeText,
  iconSize = 24,
  iconColor = "#A2A2A2",
  containerClassName,
  inputClassName,
  showLocationPicker,
  locationPickerPath,
  ...rest
}: SearchBarProps) {
  return (
    <View
      className={`flex-row items-center bg-gray-100 rounded-xl px-4 py-3 gap-2 border border-[#E3E6F0]      
  ${containerClassName}`}
    >
      <Feather name="search" size={iconSize} color={iconColor} />
      <TextInput
        className={`flex-1 text-base font-sf-regular text-[#A2A2A2] ${inputClassName}`}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />

      {showLocationPicker && (
        <TouchableOpacity onPress={locationPickerPath}>
          <Ionicons name="location" size={24} color="#0F73F7" />
        </TouchableOpacity>
      )}
    </View>
  );
}
