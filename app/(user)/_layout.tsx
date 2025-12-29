import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          height: 65 + insets.bottom,
          borderWidth: 0.1,
          // borderTopWidth: 0.7,
          borderColor: "#005FDCE5",
          // borderTopColor: "#005FDCE5",
          paddingTop: 12,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          overflow: "hidden",
          position: "absolute",
        },

        tabBarBackground: () => (
          <LinearGradient
            colors={["#D3E6FF", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.5 }}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View className="relative">
              <Octicons
                name="home-fill"
                size={24}
                color={focused ? "#0F73F7" : "#4D4D4D"}
              />

              {focused && (
                <View className="absolute -bottom-6 -left-2 h-0.5 w-12 bg-[#0F73F7]" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <View className="relative">
              <AntDesign
                name="history"
                size={24}
                color={focused ? "#0F73F7" : "#4D4D4D"}
              />
              {focused && (
                <View className="absolute -bottom-6 -left-2 h-0.5 w-12 bg-[#0F73F7]" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View className="relative">
              <FontAwesome6
                name="user-circle"
                size={24}
                color={focused ? "#0F73F7" : "#4D4D4D"}
              />
              {focused && (
                <View className="absolute -bottom-6 -left-2 h-0.5 w-12 bg-[#0F73F7]" />
              )}
            </View>
          ),
        }}
      />

      {/* nested screens */}

      <Tabs.Screen
        name="history/ongoing/[id]"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="history/completed/[id]"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="history/cancelled/[id]"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="profile/add-place"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="profile/inbox"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="profile/payment/payments"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/payment/transaction"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/payment/card-details"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/payment/refer-discount"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/home-location"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/permission"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/personal-info"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/update-email"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/update-name"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/update-phone-number"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/work-location"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/about"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/help"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/settings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/promo-code"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/terms-condition"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/support-requests"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/change-password"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/settings/privacy-policy"
        options={{
          href: null,
        }}
      />

      {/* instant delivery */}
      <Tabs.Screen
        name="instant-delivery/location-picker"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="instant-delivery/select-location"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="instant-delivery/select-vehicle"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
