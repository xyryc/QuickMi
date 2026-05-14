import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface EarningsCardProps {
  className?: string;
  earnings: string;
  hours: string;
  acceptanceRate: string;
  trips: string;
}

const EarningsCard: React.FC<EarningsCardProps> = ({
  className,
  earnings = "₦8.07",
  hours = "3",
  acceptanceRate = "60%",
  trips = "03",
}) => {
  const insets = useSafeAreaInsets();
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isExpanded) {
      // Expand animation
      Animated.parallel([
        Animated.timing(heightAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          delay: 150,
          useNativeDriver: false,
        }),
      ]).start();

      // Auto-collapse after 3 seconds
      timerRef.current = setTimeout(() => {
        collapseCard();
      }, 3000);
    } else {
      // Collapse animation
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(heightAnim, {
          toValue: 0,
          duration: 300,
          delay: 100,
          easing: Easing.in(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isExpanded]);

  const handlePress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsExpanded(true);
  };

  const collapseCard = () => {
    setIsExpanded(false);
  };

  const maxHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120], // Adjust based on content height
  });

  return (
    <View
      className={`${className}
      ${isExpanded ? "bg-white" : ""}
      rounded-2xl mx-4 overflow-hidden`}
    >
      {/* Price - Always Visible */}
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className="items-center"
        style={{
          paddingTop: insets.top + 10,
        }}
      >
        <Text className="text-lg font-sf-pro-semibold rounded-full bg-white px-4 py-2 border border-[#0F73F724]">
          {earnings}
        </Text>
      </TouchableOpacity>

      {/* Expandable Content */}
      <Animated.View
        style={{
          maxHeight: maxHeight,
          opacity: opacityAnim,
          overflow: "hidden",
        }}
      >
        <View className="border-t border-gray-100 pb-4">
          {/* Today's Earnings Label */}
          <Text className="text-center text-sm font-sf-pro-regular text-gray-600 pt-3 pb-4">
            Today's earnings
          </Text>

          {/* Stats Row */}
          <View className="flex-row items-center justify-around px-4">
            {/* Hours */}
            <View className="items-center">
              <Text className="text-2xl font-sf-pro-semibold text-gray-900">
                {hours}
              </Text>
              <Text className="text-xs font-sf-pro-regular text-gray-500 mt-1">
                hours
              </Text>
            </View>

            {/* Divider */}
            <View className="w-px h-12 bg-gray-200" />

            {/* Acceptance Rate */}
            <View className="items-center">
              <Text className="text-2xl font-sf-pro-semibold text-gray-900">
                {acceptanceRate}
              </Text>
              <Text className="text-xs font-sf-pro-regular text-gray-500 mt-1">
                Acceptance rate
              </Text>
            </View>

            {/* Divider */}
            <View className="w-px h-12 bg-gray-200" />

            {/* Trips */}
            <View className="items-center">
              <Text className="text-2xl font-sf-pro-semibold text-gray-900">
                {trips}
              </Text>
              <Text className="text-xs font-sf-pro-regular text-gray-500 mt-1">
                Trips
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default EarningsCard;
