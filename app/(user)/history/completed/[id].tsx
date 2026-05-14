import ScreenHeader from "@/components/ScreenHeader";
import StatusBadge from "@/components/StatusBadge";
import { AntDesign, Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ParcelCompleted = () => {
  // const { id } = useLocalSearchParams();
  // console.log("from parcel completed", id);

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.3]}
        style={{ flex: 1 }}
      >
        {/* header */}
        <ScreenHeader title="Parcel Details" />

        <View className="mx-5">
          {/* profile and rating */}
          <View className="rounded-xl flex-row items-center gap-3 border border-[#005FDC24] p-3 bg-white">
            <Image
              source="https://media.licdn.com/dms/image/v2/D5603AQFMeZ7i9ybZgw/profile-displayphoto-shrink_200_200/B56ZS29wLQHwAY-/0/1738236429558?e=2147483647&v=beta&t=RTX-UGEWSzuEb-Gv2bqXqREzQX15FMKi0TK1HJBAKuE"
              style={{
                width: 62,
                height: 62,
                borderRadius: 999,
              }}
              contentFit="cover"
            />

            <View>
              <Text className="font-sf-pro-medium text-lg text-gray-600 mb-2">
                Md Talath Un Nabi Anik
              </Text>

              <View className="flex-row items-center gap-1">
                <Octicons name="star-fill" size={16} color="#FFD700" />
                <Octicons name="star-fill" size={16} color="#FFD700" />
                <Octicons name="star-fill" size={16} color="#FFD700" />
                <Octicons name="star-fill" size={16} color="#D9D9D9" />
                <Octicons name="star-fill" size={16} color="#D9D9D9" />
              </View>
            </View>
          </View>

          {/* parcel tracking info */}
          <View className="border border-[#005FDC24] p-3 bg-white rounded-xl mt-4">
            {/* tracking code */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <View className="w-11 h-11 bg-[#CFE3FD] rounded-full items-center justify-center">
                  <Entypo name="box" size={20} color="#cb8252" />
                </View>

                <Text className="font-sf-pro-regular text-base">
                  Tracking ID:
                </Text>
                <Text className="font-sf-pro-medium text-base">#5R9G87R</Text>
              </View>

              <TouchableOpacity className="w-9 h-9 bg-[#CFE3FD] rounded-full items-center justify-center">
                <Ionicons name="copy-outline" size={16} color="black" />
              </TouchableOpacity>
            </View>

            {/* sender info */}
            <View className="mt-2">
              <View className="flex-row gap-2">
                {/* left */}
                <View>
                  <Octicons
                    className="mb-2"
                    name="location"
                    size={18}
                    color="#0F73F7"
                  />

                  <AntDesign
                    className="rotate-90"
                    name="dash"
                    size={16}
                    color="#80aad9"
                  />
                  <AntDesign
                    className="rotate-90"
                    name="dash"
                    size={16}
                    color="#80aad9"
                  />
                  <AntDesign
                    className="rotate-90"
                    name="dash"
                    size={16}
                    color="#80aad9"
                  />
                </View>

                {/* right */}
                <View className="flex-1">
                  {/* 1st row */}
                  <View className="flex-row items-start justify-between">
                    <View className="flex items-start">
                      <Text className="font-sf-pro-medium text-base">From</Text>
                      <Text className="font-sf-pro-medium text-blue-500 text-sm">
                        Sender Address
                      </Text>
                    </View>

                    <View>
                      <View className="flex-row items-center gap-1">
                        <Octicons name="dot-fill" size={6} color="#BABFC5" />
                        <Text className="text-gray-400 text-sm font-sf-pro-regular">
                          14 may 2023
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text className="text-sm font-sf-pro-regular mt-3">
                    Kilometer 6, 278H, Street 201R, Kroalkor Village, Unnamed
                    Road, Phnom Penh
                  </Text>
                </View>
              </View>
            </View>

            {/* receiver info */}
            <View className="mt-2">
              <View className="flex-row gap-2">
                {/* left */}
                <View>
                  <Octicons
                    className="mb-2"
                    name="location"
                    size={18}
                    color="#0F73F7"
                  />
                </View>

                {/* right */}
                <View className="flex-1">
                  {/* 1st row */}
                  <View className="flex items-start">
                    <Text className="font-sf-pro-medium text-base">To</Text>
                    <Text className="font-sf-pro-medium text-blue-500 text-sm">
                      Receiver Details
                    </Text>
                  </View>

                  <Text className="text-sm font-sf-pro-regular mt-3">
                    2nd Floor 01, 25 Mao Tse Toung Blvd (245), Phnom Penh 12302,
                    Cambodia
                  </Text>
                </View>
              </View>
            </View>

            {/* distance and delivery status */}
            <View className="ml-8 mt-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-sf-pro-medium">Distance:</Text>
                <Text className="text-sm font-sf-pro-medium">5.9 KM</Text>
              </View>

              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-sf-pro-medium">Travel Time:</Text>
                <Text className="text-sm font-sf-pro-medium">45 Minutes</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-sm font-sf-pro-medium">
                  Delivery Status:
                </Text>

                <StatusBadge status="completed" />
              </View>
            </View>
          </View>

          {/* receipt section */}
          <View className="border border-[#005FDC24] p-4 rounded-xl mt-3.5">
            <Text className="font-sf-pro-semibold text-base">Receipt</Text>

            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm font-sf-pro-regular">Base fare</Text>

              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-sf-pro-medium line-through text-red-500">
                  ₦140
                </Text>
                <Text className="text-sm font-sf-pro-medium">₦150</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm font-sf-pro-regular">Distance</Text>
              <Text className="text-sm font-sf-pro-medium">₦10</Text>
            </View>

            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm font-sf-pro-regular">Time</Text>
              <Text className="text-sm font-sf-pro-medium">₦0.60</Text>
            </View>

            {/* dotted line */}
            <View className="w-full my-2 border-t border-dashed border-gray-400" />

            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm font-sf-pro-medium">Subtotal</Text>
              <Text className="text-sm font-sf-pro-medium">₦17</Text>
            </View>

            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm font-sf-pro-regular">Discount</Text>
              <Text className="text-sm font-sf-pro-medium">-₦6</Text>
            </View>

            {/* dotted line */}
            <View className="w-full my-2 border-t border-dashed border-gray-500" />

            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-base font-sf-pro-medium">Net Fare</Text>
              <Text className="text-sm font-sf-pro-semibold">₦11</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ParcelCompleted;
