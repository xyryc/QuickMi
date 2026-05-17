import ButtonPrimary from "@/components/ButtonPrimary";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ParcelOngoing = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  // Sample data - replace with actual data from params
  const pickupLocation = {
    latitude: 23.7808,
    longitude: 90.4211,
    address: "Block B, Banasree, Dhaka.",
  };

  const dropoffLocation = {
    latitude: 23.7461,
    longitude: 90.3742,
    address: "Green Road, Dhanmondi, Dhaka.",
  };

  // Create a ref for the bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Define snap points: 20% and 80% of screen
  const snapPoints = useMemo(() => ["20%", "70%"], []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View className="flex-1">
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              latitude:
                (pickupLocation.latitude + dropoffLocation.latitude) / 2,
              longitude:
                (pickupLocation.longitude + dropoffLocation.longitude) / 2,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {/* Pickup Marker */}
            <Marker coordinate={pickupLocation}>
              <View className="items-center">
                <View className="bg-black rounded-full p-2">
                  <FontAwesome6 name="person" size={16} color="white" />
                </View>
                <View className="w-0.5 h-4 bg-black" />
              </View>
            </Marker>

            {/* Dropoff Marker */}
            <Marker coordinate={dropoffLocation}>
              <View className="items-center">
                <View className="bg-blue-500 rounded-full p-2">
                  <Ionicons name="location-sharp" size={20} color="white" />
                </View>
                <View className="w-1 h-1 bg-blue-500 rounded-full" />
              </View>
            </Marker>

            {/* Route Line */}
            <Polyline
              coordinates={[pickupLocation, dropoffLocation]}
              strokeColor="#0F73F7"
              strokeWidth={3}
              lineDashPattern={[1]}
            />
          </MapView>

          {/* Back Button */}
          <TouchableOpacity
            onPress={() => {
              router.replace("/(agent)/home");
              console.log("back");
            }}
            className="absolute top-4 left-4 bg-white rounded-full p-3 shadow-lg border border-[#0F73F7E5]"
            style={{
              marginTop: insets.top,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <MaterialIcons name="keyboard-arrow-left" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0} // Start at first snap point (20%)
          snapPoints={snapPoints}
          enablePanDownToClose={false}
        >
          {/* Scrollable content section */}
          <BottomSheetScrollView>
            <View className="px-5 py-4">
              <View>
                {/* time  */}
                <View className="flex-row justify-between">
                  <Text className="text-lg font-sf-pro-medium">
                    Arriving in 7 minutes
                  </Text>
                  <FontAwesome6 name="location-dot" size={20} color="#0F73F7" />
                </View>

                {/* location */}
                <View className="flex-row items-center gap-2 mt-1.5 mb-4">
                  <View className="flex-row items-center gap-1.5">
                    <Ionicons
                      name="car-sport-outline"
                      size={24}
                      color="black"
                    />
                    <Text className="text-xs font-sf-pro-medium text-gray-600">
                      Lamborghini Aventador
                    </Text>
                  </View>
                  <View className="bg-[#0F73F7] px-2 py-1 rounded-lg">
                    <Text className="font-sf-pro-semibold text-xs text-white">
                      SK 7776-41
                    </Text>
                  </View>
                </View>

                {/* profile with message call */}
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center gap-2">
                    <Image
                      source="https://media.licdn.com/dms/image/v2/D5603AQFMeZ7i9ybZgw/profile-displayphoto-shrink_200_200/B56ZS29wLQHwAY-/0/1738236429558?e=2147483647&v=beta&t=RTX-UGEWSzuEb-Gv2bqXqREzQX15FMKi0TK1HJBAKuE"
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: 99,
                      }}
                      contentFit="cover"
                    />

                    <View>
                      <Text className="text-lg font-sf-pro-medium text-gray-700">
                        Md Talath Un Nabi Anik
                      </Text>

                      <View className="flex-row items-center gap-1 mt-1.5">
                        <Octicons name="star-fill" size={16} color="#FFD700" />
                        <Text className="font-sf-pro-medium text-sm">4.5</Text>
                      </View>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-3">
                    <View className="w-11 h-11 rounded-full items-center justify-center bg-[#CFE3FD42] border border-[#0F73F724]">
                      <Ionicons
                        name="chatbox-ellipses-outline"
                        size={20}
                        color="#4D4D4D"
                      />
                    </View>

                    <View className="w-11 h-11 rounded-full items-center justify-center bg-[#CFE3FD42] border border-[#0F73F724]">
                      <Ionicons name="call-outline" size={20} color="#4D4D4D" />
                    </View>
                  </View>
                </View>

                {/* receiver details */}
                <View className="border border-[#005FDC24] p-4 rounded-xl mt-3.5">
                  <View className="flex-row items-center gap-1 ">
                    <Text className="font-sf-pro-semibold text-base">
                      #5R9G87R
                    </Text>

                    <Octicons name="dot-fill" size={6} color="#BABFC5" />

                    <Text className="text-gray-400 text-sm font-sf-pro-regular">
                      14 may 2023
                    </Text>
                  </View>

                  <View className="flex-row gap-2 mt-3.5 pr-4">
                    <Octicons name="location" size={24} color="#0F73F7" />

                    <View>
                      <Text className="text-base font-sf-pro-semibold">To</Text>
                      <Text className="font-sf-pro-regular text-xs text-blue-500">
                        Receiver Details
                      </Text>

                      <Text className="font-sf-pro-regular text-sm mt-2">
                        2nd Floor 01, 25 Mao Tse Toung Blvd (245), Phnom Penh
                        12302, Cambodia
                      </Text>
                    </View>
                  </View>
                </View>

                {/* distance and fair details */}
                <View className="border border-[#005FDC24] mt-3.5 p-4 rounded-xl">
                  <View className="flex-row justify-between">
                    <Text className="text-sm font-sf-pro-regular text-gray-400">
                      Distance
                    </Text>

                    <View className="flex-row items-center gap-1">
                      <Text className="text-sm font-sf-pro-regular text-gray-400">
                        Charge
                      </Text>
                      <Ionicons
                        name="information-circle"
                        size={14}
                        color="#0F73F7"
                      />
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center mt-1">
                    <Text className="font-sf-pro-medium text-lg ">5.53 KM</Text>

                    <View className="flex-row items-center">
                      <Text className="font-sf-pro-medium text-sm text-red-500 line-through">
                        ₦150
                      </Text>
                      <Text className="font-sf-pro-medium text-lg">₦140</Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center pt-1.5">
                    <Text className="font-sf-pro-medium text-base">
                      Who will pay?
                    </Text>

                    <ButtonPrimary
                      title="Sender"
                      className="!py-2 px-3"
                      iconPosition="left"
                      icon={
                        <Ionicons
                          name="checkmark-circle"
                          size={24}
                          color="white"
                        />
                      }
                    />
                  </View>
                </View>

                {/* driver details, cancel delivery */}
                <View className="border border-[#005FDC24] flex-row items-center gap-2 bg-[#CFE3FD] mt-4 py-3 px-4 rounded-t-xl">
                  <Ionicons name="share-outline" size={24} color="black" />
                  <Text className="font-sf-pro-regular text-base">
                    Share driver details
                  </Text>
                </View>
                <TouchableOpacity className="flex-row items-center gap-2 px-4 border border-[#005FDC24] py-3 rounded-b-xl">
                  <MaterialCommunityIcons
                    name="archive-cancel-outline"
                    size={24}
                    color="black"
                  />
                  <Text>Cancel Delivery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default ParcelOngoing;
