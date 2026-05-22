import ActivityCard from "@/components/ActivityCard";
import TipsSection from "@/components/TipsSection";
import { useGetMeQuery } from "@/store/api/authApi";
import { getHomeLocationLabel } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { data, isLoading, isFetching, error, refetch } = useGetMeQuery();

  const router = useRouter();
  const [locationLabel, setLocationLabel] = useState("Set location");

  const handleOpenLocationPicker = () => {
    router.push("/(user)/location-picker");
  };

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const loadHomeLocation = async () => {
        const savedLabel = await getHomeLocationLabel();
        if (!isMounted) return;
        setLocationLabel(savedLabel || "Set location");
      };

      void loadHomeLocation();

      return () => {
        isMounted = false;
      };
    }, []),
  );

  const serviceCardShadowStyle = {
    shadowColor: "#031731",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    ...(Platform.OS === "android" ? { backgroundColor: "#FFFFFF" } : {}),
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
        {/* <View className="flex-row justify-between items-center py-3 px-5 bg-white rounded-b-[30px]"> */}
        <View className="flex-row justify-between items-center py-3 px-5">
          <View className="flex-row items-center gap-2 flex-1 min-w-0">
            <TouchableOpacity
              onPress={() => router.push("/(user)/(tabs)/profile")}
            >
              <Image
                source={
                  data?.data?.profileImag
                    ? { uri: data.data.profileImag }
                    : require("@/assets/images/user.webp")
                }
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 999,
                }}
                contentFit="cover"
              />
            </TouchableOpacity>

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
          {/* service cards */}
          <View className="flex-row flex-wrap justify-between">
            {/* send item */}
            <TouchableOpacity
              onPress={() => router.push("/(user)/send-item/route-details")}
              className="w-[48.5%] bg-white rounded-2xl p-4 mb-3"
              style={serviceCardShadowStyle}
            >
              <View className="flex-row items-start justify-between">
                <View className="w-20 h-20 items-center justify-center">
                  <Image
                    source={require("@/assets/images/send_item.png")}
                    style={{ width: 76, height: 76 }}
                    contentFit="contain"
                  />
                </View>
                <View className="w-7 h-7 rounded-full bg-[#F5F8FF] items-center justify-center">
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={18}
                    color="#031731"
                  />
                </View>
              </View>
              <Text className="mt-5 font-sf-pro-medium text-[15px] text-custom-blue-900">
                Send Item
              </Text>
              <Text className="mt-1 font-sf-pro-medium text-[11px] text-gray-500">
                Fast same-day drop
              </Text>
            </TouchableOpacity>

            {/* receive item */}
            <TouchableOpacity
              onPress={() => router.push("/(user)/receive-item/route-details")}
              className="w-[48.5%] bg-white rounded-2xl p-4 mb-3"
              style={serviceCardShadowStyle}
            >
              <View className="flex-row items-start justify-between">
                <View className="w-20 h-20 items-center justify-center">
                  <Image
                    source={require("@/assets/images/receive_item.png")}
                    style={{ width: 76, height: 76 }}
                    contentFit="contain"
                  />
                </View>
                <View className="w-7 h-7 rounded-full bg-[#F5F8FF] items-center justify-center">
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={18}
                    color="#031731"
                  />
                </View>
              </View>
              <Text className="mt-5 font-sf-pro-medium text-[15px] text-custom-blue-900">
                Receive Item
              </Text>
              <Text className="mt-1 font-sf-pro-medium text-[11px] text-gray-500">
                Pickup from seller
              </Text>
            </TouchableOpacity>

            {/* receive parcel */}
            <TouchableOpacity
              onPress={() =>
                router.push("/(user)/receive-parcel/route-details")
              }
              className="w-[48.5%] bg-white rounded-2xl p-4 mb-3"
              style={serviceCardShadowStyle}
            >
              <View className="flex-row items-start justify-between">
                <View className="w-20 h-20 items-center justify-center">
                  <Image
                    source={require("@/assets/images/receive_parcel.png")}
                    style={{ width: 76, height: 76 }}
                    contentFit="contain"
                  />
                </View>
                <View className="w-7 h-7 rounded-full bg-[#F5F8FF] items-center justify-center">
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={18}
                    color="#031731"
                  />
                </View>
              </View>
              <Text className="mt-5 font-sf-pro-medium text-[15px] text-custom-blue-900">
                Receive Parcel
              </Text>
              <Text className="mt-1 font-sf-pro-medium text-[11px] text-gray-500">
                Collect package quick
              </Text>
            </TouchableOpacity>

            {/* schedule delivery */}
            <TouchableOpacity
              onPress={() =>
                router.push("/(user)/schedule-delivery/route-details")
              }
              className="w-[48.5%] bg-white rounded-2xl p-4 mb-3"
              style={serviceCardShadowStyle}
            >
              <View className="flex-row items-start justify-between">
                <View className="w-20 h-20 items-center justify-center">
                  <Image
                    source={require("@/assets/images/schedule_delivery.png")}
                    style={{ width: 76, height: 76 }}
                    contentFit="contain"
                  />
                </View>
                <View className="w-7 h-7 rounded-full bg-[#F5F8FF] items-center justify-center">
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={18}
                    color="#031731"
                  />
                </View>
              </View>
              <Text className="mt-5 font-sf-pro-medium text-[15px] text-custom-blue-900">
                Schedule
              </Text>
              <Text className="mt-1 font-sf-pro-medium text-[11px] text-gray-500">
                Pick time, deliver later
              </Text>
            </TouchableOpacity>
          </View>

          {/* history */}
          <View className="flex-row justify-between mb-4 mt-8">
            <Text className="font-sf-pro-semibold text-lg">Activity</Text>

            <TouchableOpacity
              onPress={() => router.push("/(user)/(tabs)/activity")}
            >
              <Ionicons name="arrow-forward" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* history cards container */}
          <View>
            <ActivityCard />

            <ActivityCard />
          </View>

          <TipsSection />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
