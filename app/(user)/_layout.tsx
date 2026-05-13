import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="location-picker"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="send-item/delivery-booking"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="history/ongoing/[id]"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="history/completed/[id]"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="history/cancelled/[id]"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="profile/payment/payments"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="profile/payment/transaction"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="profile/payment/refer-discount"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="profile/wallet/wallet"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="profile/home-location"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="profile/work-location"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="profile/add-place"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="profile/permission"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="send-item/route-details"
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="schedule-delivery/route-details"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}
