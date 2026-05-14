import HistoryCard from "@/components/HistoryCard";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const router = useRouter();
  const { selectedLocationLabel } = useLocalSearchParams<{
    selectedLocationLabel?: string;
  }>();
  const locationLabel = selectedLocationLabel || "Set location";

  const handleOpenLocationPicker = () => {
    router.push({
      pathname: "/(user)/location-picker",
      params: { returnTo: "/(user)/home" },
    });
  };

  return (
    <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
      <StatusBar backgroundColor="#D3E6FF" barStyle="dark-content" />

      <LinearGradient
        colors={["#D3E6FF", "#FFFFFF"]}
        locations={[0, 0.3]}
        style={{ flex: 1 }}
      >
        {/* home header */}
        <View className="flex-row justify-between items-center py-3 px-5 bg-white rounded-b-[30px]">
          <View className="flex-row items-center gap-2 flex-1 min-w-0">
            <Image
              source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXpdpAD2WforjNOXjrovpTAGSJKeFFn3AhKCYndxUUGoepbo36bvFeDhYYiv2EXdlauQtHqMjsrKvn103gY57FgYUN1xNrSnTW1h9bt_TqPQ&s=10"
              style={{
                width: 45,
                height: 45,
                borderRadius: 999,
              }}
              contentFit="cover"
            />

            <TouchableOpacity
              onPress={handleOpenLocationPicker}
              className="flex-1 min-w-0"
            >
              <View className="flex-row items-center gap-1">
                <Text className="text-custom-blue-800">My Location</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={16}
                  color="black"
                />
              </View>

              <View className="flex-row gap-1 mt-1">
                <SimpleLineIcons name="location-pin" size={14} color="black" />
                <Text
                  className="font-sf-pro-medium text-sm text-custom-blue-900"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {locationLabel}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* notification */}
          <TouchableOpacity
            onPress={() => router.push("/(shared)/notification")}
            className="w-9 h-9 items-center justify-center shrink-0 ml-2"
          >
            <SimpleLineIcons
              className="p-1.5 border border-[#0A66C224] rounded-full bg-white"
              name="bell"
              size={18}
              color="black"
            />

            <Text className="absolute -top-1 -right-1.5 w-[16px] h-[16px] items-center text-center text-white bg-custom-custom-red rounded-full font-sf-pro-medium text-[9px]">
              06
            </Text>
          </TouchableOpacity>
        </View>

        {/* main content */}
        <ScrollView
          className="px-5 pt-5"
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        >
          {/* send item */}
          <TouchableOpacity
            onPress={() => router.push("/(user)/send-item/route-details")}
            className="py-3 px-4 bg-white flex-row items-center justify-between gap-3 rounded-xl mb-3 elevation-md"
          >
            <View className="flex-row items-center gap-3">
              <View className="p-3 border border-[#0F73F724] rounded-full">
                <Image
                  source={require("@/assets/images/instant_delivery.svg")}
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  contentFit="contain"
                />
              </View>

              <View>
                <Text className="font-sf-pro-medium text-base text-custom-blue-900 mb-1">
                  Send Item
                </Text>
                <Text className="font-sf-pro-medium text-xs text-gray-400">
                  Immediate Pickup, Fast Delivery
                </Text>
              </View>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {/* receive item */}
          <TouchableOpacity
            onPress={() => router.push("/(user)/receive-item/route-details")}
            className="py-3 px-4 bg-white flex-row items-center justify-between gap-3 rounded-xl mb-3 elevation-md"
          >
            <View className="flex-row items-center gap-3">
              <View className="p-3 border border-[#0F73F724] rounded-full">
                <Image
                  source={require("@/assets/images/instant_delivery.svg")}
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  contentFit="contain"
                />
              </View>

              <View>
                <Text className="font-sf-pro-medium text-base text-custom-blue-900 mb-1">
                  Receive Item
                </Text>
                <Text className="font-sf-pro-medium text-xs text-gray-400">
                  Immediate Pickup, Fast Delivery
                </Text>
              </View>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {/* receive parcel */}
          <TouchableOpacity
            onPress={() => router.push("/(user)/receive-parcel/route-details")}
            className="py-3 px-4 bg-white flex-row items-center justify-between gap-3 rounded-xl mb-3 elevation-md"
          >
            <View className="flex-row items-center gap-3">
              <View className="p-3 border border-[#0F73F724] rounded-full">
                <Image
                  source={require("@/assets/images/instant_delivery.svg")}
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  contentFit="contain"
                />
              </View>

              <View>
                <Text className="font-sf-pro-medium text-base text-custom-blue-900 mb-1">
                  Receive Parcel
                </Text>
                <Text className="font-sf-pro-medium text-xs text-gray-400">
                  Immediate Pickup, Fast Delivery
                </Text>
              </View>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {/* schedule delivery */}
          <TouchableOpacity
            onPress={() =>
              router.push("/(user)/schedule-delivery/route-details")
            }
            className="py-3 px-4 bg-white flex-row items-center justify-between gap-3 rounded-xl elevation-md"
          >
            <View className="flex-row items-center gap-3">
              <View className="p-3 border border-[#0F73F724] rounded-full">
                <Image
                  source={require("@/assets/images/schedule_delivery.svg")}
                  style={{
                    width: 36,
                    height: 36,
                  }}
                  contentFit="contain"
                />
              </View>

              <View>
                <Text className="font-sf-pro-medium text-base text-custom-blue-900 mb-1">
                  Schedule Delivery
                </Text>
                <Text className="font-sf-pro-medium text-xs text-gray-400">
                  Plan Ahead, Get On-Time Delivery
                </Text>
              </View>
            </View>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </TouchableOpacity>

          {/* history */}
          <View className="flex-row justify-between mb-4 mt-8">
            <Text className="font-sf-pro-medium text-base">History</Text>

            <Text className="font-sf-pro-medium text-base text-blue-600">
              View All
            </Text>
          </View>

          {/* history cards container */}
          <View>
            <HistoryCard />

            <HistoryCard />

            <HistoryCard />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
