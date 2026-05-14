import AddressCard from "@/components/AddressCard";
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";
import { Octicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

interface TripOfferProps {
  tripId: string;
  fromLocation: string;
  toLocation: string;
  distance: string;
  suggestedPrice: string;
  pickupTime: string;
  onAccept: () => void;
  onDecline: () => void;
  onTimeout: () => void;
}

const TripOfferCard: React.FC<TripOfferProps> = ({
  tripId,
  fromLocation,
  toLocation,
  distance,
  suggestedPrice,
  pickupTime,
  onAccept,
  onDecline,
  onTimeout,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(20);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasTimedOut = useRef(false);

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Reset state
    hasTimedOut.current = false;
    setTimeRemaining(20);

    // Start new timer
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;

        // Check if time's up
        if (newTime <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          if (!hasTimedOut.current) {
            hasTimedOut.current = true;
            onTimeout();
          }
          return 0;
        }

        return newTime;
      });
    }, 1000);

    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [tripId]);

  return (
    <View className="flex-1">
      <View className="flex-row items-start justify-between mb-2">
        <View className="bg-[#0F73F7] flex-row items-center rounded-md p-2 gap-1">
          <Octicons name="dot-fill" size={10} color="white" />
          <Text className="text-sm font-sf-pro-regular text-white">Trip</Text>
        </View>

        <View className="flex items-end">
          <Text className="font-sf-pro-medium text-2xl mb-1">₦150</Text>
          <View className="flex-row items-center gap-2">
            <Octicons name="clock-fill" size={16} color="#0F73F7" />
            <Text className="text-sm font-sf-pro-medium">
              16 min (1.4 mi) away
            </Text>
          </View>
        </View>
      </View>

      {/* address */}
      <AddressCard />

      {/* Action Buttons */}
      <View className="flex gap-2 mt-3">
        <ButtonPrimary title="Accept Trip" onPress={onAccept} timer={20} />

        <ButtonSecondary title="Decline" onPress={onDecline} />
      </View>
    </View>
  );
};

export default TripOfferCard;
