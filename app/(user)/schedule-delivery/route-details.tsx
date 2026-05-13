import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import SearchBar from "@/components/Searchbar";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const SelectLocation = () => {
  const router = useRouter();

  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleConfirm = () => {
    router.push({
      pathname: "/(user)/delivery-booking",
      params: { returnTo: "/(user)/schedule-delivery/route-details" },
    });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <View className="mx-5 my-5">
        <Text className="font-sf-pro-medium text-lg mb-4">Select Location</Text>

        <SearchBar
          placeholder="Search Pickup"
          showLocationPicker
          containerClassName="mb-3"
          locationPickerPath={() =>
            router.push({
              pathname: "/(user)/location-picker",
              params: { returnTo: "/(user)/schedule-delivery/route-details" },
            })
          }
        />

        <SearchBar
          placeholder="Search Drop Off"
          showLocationPicker
          locationPickerPath={() =>
            router.push({
              pathname: "/(user)/location-picker",
              params: { returnTo: "/(user)/schedule-delivery/route-details" },
            })
          }
        />

        {/* schedule time */}
        <Text className="font-sf-pro-medium text-base my-3.5">
          Schedule your time
        </Text>
        {/* date time picker */}
        <View className="flex-row gap-3 mb-4">
          {/* Pickup Date */}
          <TouchableOpacity
            onPress={() => {
              setTempDate(pickupDate);
              setShowDatePicker(true);
            }}
            className="flex-1 flex-row items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3"
          >
            <Text className="text-gray-500 text-sm">
              {formatDate(pickupDate)}
            </Text>
            <Feather name="calendar" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Pickup Time */}
          <TouchableOpacity
            onPress={() => {
              setTempTime(pickupTime);
              setShowTimePicker(true);
            }}
            className="flex-1 flex-row items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3"
          >
            <Text className="text-gray-500 text-sm">
              {formatTime(pickupTime)}
            </Text>
            <Feather name="clock" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons name="information-circle" size={16} color="#0F73F7" />
          <Text className="text-xs font-sf-pro-regular text-gray-500">
            Schedule your trip at least 1 hour in advance.
          </Text>
        </View>

        <View className="border-t border-gray-200 my-3" />

        <View className="flex-row gap-2.5">
          <TouchableOpacity className="bg-[#9FC7FC40] px-3.5 py-2 rounded-xl">
            <Text className="text-xs font-sf-pro-medium">Recent</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#9FC7FC40] px-3.5 py-2 rounded-xl">
            <Text className="text-xs font-sf-pro-medium">Saved</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-yellow-600 mt-10 mb-3">
          Below confirm button will be removed in the backend+API integration
          phase. This button is for development purposes only.
        </Text>
        <ButtonPrimary title="Confirm" onPress={handleConfirm} />

        {/* Date Picker Modal */}
        <Modal
          visible={showDatePicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <Pressable
            onPress={() => setShowDatePicker(false)}
            className="flex-1 bg-black/50 justify-end"
          >
            <Pressable
              onPress={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl"
            >
              {/* Modal Header */}
              <View className="px-6 py-4">
                <Text className="text-lg font-sf-pro-medium">Pickup Date</Text>
              </View>

              {/* Date Picker */}
              <View className="items-center py-4">
                <DatePicker
                  date={tempDate}
                  onDateChange={setTempDate}
                  mode="date"
                  minimumDate={new Date()}
                  textColor="#0F73F7"
                  fadeToColor="white"
                />
              </View>

              {/* Buttons */}
              <View className="flex-row gap-3 px-6 pb-6">
                <ButtonSecondary
                  className="flex-1"
                  title="Cancel"
                  onPress={() => setShowDatePicker(false)}
                />

                <ButtonPrimary
                  className="flex-1"
                  title="Confirm"
                  onPress={() => {
                    setPickupDate(tempDate);
                    setShowDatePicker(false);
                  }}
                />
              </View>
            </Pressable>
          </Pressable>
        </Modal>

        {/* Time Picker Modal */}
        <Modal
          visible={showTimePicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowTimePicker(false)}
        >
          <Pressable
            onPress={() => setShowTimePicker(false)}
            className="flex-1 bg-black/50 justify-end"
          >
            <Pressable
              onPress={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl"
            >
              {/* Modal Header */}
              <View className="px-6 py-4">
                <Text className="text-lg font-sf-pro-medium">Pickup Time</Text>
              </View>

              {/* Time Picker */}
              <View className="items-center py-4">
                <DatePicker
                  date={tempTime}
                  onDateChange={setTempTime}
                  mode="time"
                  textColor="#000000"
                  fadeToColor="white"
                />
              </View>

              {/* Buttons */}
              <View className="flex-row gap-3 px-6 pb-6">
                <ButtonSecondary
                  className="flex-1"
                  title="Cancel"
                  onPress={() => setShowTimePicker(false)}
                />

                <ButtonPrimary
                  className="flex-1"
                  title="Confirm"
                  onPress={() => {
                    setPickupTime(tempTime);
                    setShowTimePicker(false);
                  }}
                />
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SelectLocation;
