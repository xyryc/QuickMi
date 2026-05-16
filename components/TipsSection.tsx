import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const tipsCards = [
  {
    id: "offers",
    title: "Get partner offers",
    subtitle: "Save more on weekly deliveries",
    image: require("@/assets/images/mock1.jpg"),
    icon: "pricetag-outline" as const,
  },
  {
    id: "verification",
    title: "Verify email",
    subtitle: "Keep account secure and active",
    image: require("@/assets/images/mock2.jpg"),
    icon: "shield-checkmark-outline" as const,
  },
  {
    id: "support",
    title: "Support ready",
    subtitle: "Get help for any active trip",
    image: require("@/assets/images/mock3.jpg"),
    icon: "chatbubble-ellipses-outline" as const,
  },
  {
    id: "send-better",
    title: "Send smarter",
    subtitle: "Use right vehicle for better fare",
    image: require("@/assets/images/mock2.jpg"),
    icon: "cube-outline" as const,
  },
];

const TipsSection = () => {
  return (
    <View className="mt-8">
      <Text className="font-sf-pro-semibold text-lg mb-4">
        Tips about Quickmi
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {tipsCards.map((card) => (
          <TouchableOpacity
            key={card.id}
            activeOpacity={0.9}
            style={{
              marginRight: 12,
              width: 210,
              height: 270,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <Image
              source={card.image}
              style={{ width: "100%", height: "100%", position: "absolute" }}
              contentFit="cover"
            />

            <LinearGradient
              colors={["rgba(3,23,49,0.15)", "rgba(3,23,49,0.88)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{ flex: 1, padding: 14 }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 999,
                  backgroundColor: "rgba(255,255,255,0.25)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name={card.icon} size={20} color="white" />
              </View>

              <View style={{ marginTop: "auto" }}>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 25,
                    lineHeight: 29,
                    fontWeight: "700",
                  }}
                  numberOfLines={2}
                >
                  {card.title}
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    color: "rgba(255,255,255,0.92)",
                    fontSize: 14,
                    lineHeight: 20,
                    fontWeight: "500",
                  }}
                  numberOfLines={2}
                >
                  {card.subtitle}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TipsSection;
