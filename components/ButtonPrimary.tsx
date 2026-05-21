import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ButtonPrimaryProps {
  className?: string;
  textClassName?: string;
  onPress: () => void;
  title: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  timer?: number;
  onTimerEnd?: () => void;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  textClassName = "",
  onPress,
  title,
  icon,
  iconPosition,
  loading = false,
  disabled = false,
  timer,
  onTimerEnd,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(timer || 0);
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    if (timer && timer > 0) {
      // Reset timer and progress
      setTimeRemaining(timer);
      progress.setValue(0);

      // Animate progress from 0 to 100%
      Animated.timing(progress, {
        toValue: 100,
        duration: timer * 1000,
        useNativeDriver: false,
      }).start();

      // Countdown timer
      let currentTime = timer;
      const interval = setInterval(() => {
        currentTime -= 1;
        setTimeRemaining(currentTime);

        if (currentTime <= 0) {
          clearInterval(interval);
          if (onTimerEnd) {
            onTimerEnd();
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || (timer && timeRemaining <= 0) || loading}
      className={`${timeRemaining <= 0 ? "bg-[#0F73F7]" : "bg-[#6FABFA]"}
      ${className} relative overflow-hidden items-center justify-center gap-2 py-3 rounded-2xl`}
    >
      {/* Animated Progress Background */}
      {timer && timer > 0 && (
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: progressWidth,
            backgroundColor: "#0F73F7",
          }}
        />
      )}

      {/* Button Content */}
      <View
        className={`${iconPosition === "left" ? "flex-row-reverse" : "flex-row"} items-center gap-2 z-10`}
      >
        {loading ? (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator size="small" color="#fff" />
            <Text className="font-sf-pro-semibold text-white">
              Please wait...
            </Text>
          </View>
        ) : (
          <Text className={`${textClassName} font-sf-pro-semibold text-white`}>
            {title}
          </Text>
        )}

        {timer && timer > 0 && (
          <Text className="font-sf-pro-semibold text-white">
            ({timeRemaining}s)
          </Text>
        )}

        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
