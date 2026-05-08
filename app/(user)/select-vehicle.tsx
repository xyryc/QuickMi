import AcceptDeclineOffer from "@/components/AcceptDeclineOffer";
import ArrivingDetails from "@/components/ArrivingDetails";
import DriverDetails from "@/components/DriverDetails";
import OfferPrice from "@/components/OfferPrice";
import PaymentMethodSelection from "@/components/PaymentMethodSelection";
import ReceiverDetails from "@/components/ReceiverDetails";
import SelectRide from "@/components/SelectRide";
import WaitForDriver from "@/components/WaitForDriver";
import { getInstantDeliveryLocations } from "@/utils/storage";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Type definition for booking steps
type BookingStep =
  | "select-ride"
  | "receiver-details"
  | "offer-price"
  | "payment-method-selection"
  | "wait-driver"
  | "accept-decline"
  | "arriving-details"
  | "driver-details";

const SelectVehicle = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const { returnTo, pickupAddress, dropoffAddress } = useLocalSearchParams<{
    returnTo?: string;
    pickupAddress?: string;
    dropoffAddress?: string;
  }>();
  const [resolvedPickupAddress, setResolvedPickupAddress] = useState(
    pickupAddress || ""
  );
  const [resolvedDropoffAddress, setResolvedDropoffAddress] = useState(
    dropoffAddress || ""
  );

  useEffect(() => {
    if (pickupAddress) {
      setResolvedPickupAddress(pickupAddress);
    }
    if (dropoffAddress) {
      setResolvedDropoffAddress(dropoffAddress);
    }
  }, [pickupAddress, dropoffAddress]);

  useEffect(() => {
    const loadSavedLocations = async () => {
      if (pickupAddress && dropoffAddress) return;

      const savedLocations = await getInstantDeliveryLocations();

      if (!pickupAddress && savedLocations.pickupLocation) {
        setResolvedPickupAddress(savedLocations.pickupLocation);
      }

      if (!dropoffAddress && savedLocations.dropoffLocation) {
        setResolvedDropoffAddress(savedLocations.dropoffLocation);
      }
    };

    loadSavedLocations();
  }, [pickupAddress, dropoffAddress]);

  // Sample coordinates; address text comes from selected location params
  const pickupLocation = {
    latitude: 23.7808,
    longitude: 90.4211,
    address: resolvedPickupAddress || "Pickup location not selected",
  };

  const dropoffLocation = {
    latitude: 23.7461,
    longitude: 90.3742,
    address: resolvedDropoffAddress || "Drop-off location not selected",
  };

  // Create a ref for the bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Define snap points: 20% and 80% of screen
  const snapPoints = useMemo(() => ["60%"], []);

  // step flow
  const vehicles = [
    {
      id: "bike-1",
      type: "bike" as const,
      name: "Bike",
      price: "$100",
      time: "10 min away",
      description: "Affordable delivery for quick trips",
    },
    {
      id: "car-1",
      type: "car" as const,
      name: "Car",
      price: "$200",
      time: "5 min away",
      description: "Comfortable delivery for medium packages",
    },
    {
      id: "van-1",
      type: "van" as const,
      name: "Van",
      price: "$300",
      time: "15 min away",
      description: "Spacious delivery for large items",
    },
  ];

  const driverOffer = {
    driverId: "driver-123",
    driverName: "John Doe",
    driverPhoto: "https://i.pravatar.cc/150?img=33",
    rating: 4.8,
    phoneNumber: "+1234567890",
    vehicleType: "Toyota Corolla",
    vehicleNumber: "ABC-1234",
    vehicleColor: "Silver",
    price: "$150",
    estimatedTime: "5 mins",
    currentLocation: "500m away from pickup point",
    estimatedArrival: "5 mins", // Added for ArrivingDetails
  };

  const [currentStep, setCurrentStep] = useState("select-ride");
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [receiverDetails, setReceiverDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [offeredPrice, setOfferedPrice] = useState<string>("$100");
  const selectedVehicleData = vehicles.find((v) => v.id === selectedVehicle);
  const suggestedPrice = selectedVehicleData?.price || "$100";
  const handleBack = () => {
    if (returnTo) {
      router.replace(returnTo);
    } else {
      router.back();
    }
  };

  // step 1
  // Called when user taps on a ride card
  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
  };

  // Called when user clicks "Choose Car" button
  const handleSelectRideNext = () => {
    if (selectedVehicle) {
      setCurrentStep("receiver-details");
    }
  };

  // step 2
  // Called when user clicks "Confirm Receiver" button
  const handleReceiverDetailsNext = () => {
    setCurrentStep("offer-price");
  };

  // Called when user clicks "Skip" button
  const handleReceiverDetailsSkip = () => {
    setCurrentStep("offer-price");
  };

  // Called when user clicks back arrow
  const handleReceiverDetailsBack = () => {
    setCurrentStep("select-ride");
  };

  // step 3
  // Called when user clicks "Submit Offer" button
  // Receives the price user entered/selected
  const handleOfferPriceNext = (price: string) => {
    setOfferedPrice(price);
    setCurrentStep("wait-driver");
  };

  // Called when user clicks back arrow
  const handleOfferPriceBack = () => {
    setCurrentStep("receiver-details");
  };

  // step 3.5
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  // Payment Method handlers
  const handlePaymentMethodNext = (method: string) => {
    setPaymentMethod(method);
    setCurrentStep("wait-driver");
  };

  const handlePaymentMethodBack = () => {
    setCurrentStep("offer-price");
  };

  const handleCashPress = () => {
    // Navigate to payment method or do something
    // console.log("Cash button pressed");
    setCurrentStep("payment-method-selection");
  };

  // step 4
  // Called automatically when driver accepts (simulated after 5 seconds)
  const handleDriverAccepted = () => {
    setCurrentStep("accept-decline");
  };

  // Called when user clicks "Cancel Request" button
  const handleCancelSearch = () => {
    setCurrentStep("offer-price");
  };

  // step 5
  // Called when user clicks "Accept Offer" button
  const handleAcceptOffer = () => {
    setCurrentStep("arriving-details");
  };

  // Called when user clicks "Decline" button
  const handleDeclineOffer = () => {
    setCurrentStep("wait-driver");
  };

  // step 6
  // Called when user clicks the phone call button
  const handleCallDriver = () => {
    console.log("Calling driver...");
    // Phone call is handled inside the component
  };

  // Called when user clicks "Cancel Ride" button
  const handleCancelRide = () => {
    // Reset to initial state
    setCurrentStep("select-ride");
    setSelectedVehicle(null);
    setReceiverDetails({ name: "", phone: "", address: "" });
  };

  // step 6.5
  // Driver Details handlers
  const handleShareDriverDetails = () => {
    setCurrentStep("driver-details");
  };

  const handleDriverDetailsBack = () => {
    setCurrentStep("arriving-details");
  };

  const handleShareDetails = () => {
    // Implement share functionality
    console.log("Sharing driver details...");
    setCurrentStep("driver-details");
    // You can use React Native Share API here
  };

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
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
          >
            {/* Pickup Marker */}
            <Marker
              coordinate={pickupLocation}
              title="Pickup Location"
              description={pickupLocation.address}
            >
              <View className="items-center">
                <View className="bg-black rounded-full p-2">
                  <FontAwesome6 name="person" size={16} color="white" />
                </View>
                <View className="w-0.5 h-4 bg-black" />
              </View>
            </Marker>

            {/* Dropoff Marker */}
            <Marker
              coordinate={dropoffLocation}
              title="Drop-off Location"
              description={dropoffLocation.address}
            >
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
            onPress={handleBack}
            className="absolute top-4 left-4 bg-white rounded-full w-11 h-11 items-center justify-center shadow-lg border border-[#0F73F7E5]"
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
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
        >
          {/* content section */}

          <BottomSheetView
            className="flex-1 px-5"
            style={{
              paddingBottom: insets.bottom + 20,
            }}
          >
            {/* Step 1: Select Ride */}
            {currentStep === "select-ride" && (
              <SelectRide
                vehicles={vehicles}
                selectedVehicle={selectedVehicle}
                onVehicleSelect={handleVehicleSelect}
                onNext={handleSelectRideNext}
              />
            )}

            {/* Step 2: Receiver Details */}
            {currentStep === "receiver-details" && (
              <ReceiverDetails
                receiverDetails={receiverDetails}
                onDetailsChange={setReceiverDetails}
                onNext={handleReceiverDetailsNext}
                onSkip={handleReceiverDetailsSkip}
                onBack={handleReceiverDetailsBack}
              />
            )}

            {/* Step 3: Offer Price */}
            {currentStep === "offer-price" && (
              <OfferPrice
                selectedVehicleData={selectedVehicleData}
                suggestedPrice={suggestedPrice}
                onNext={handleOfferPriceNext}
                onBack={handleOfferPriceBack}
                handleCancelRide={handleCancelRide}
                onCashPress={handleCashPress}
                bottomInset={insets.bottom}
              />
            )}
            {/* Step 3.5: Payment Method */}
            {currentStep === "payment-method-selection" && (
              <PaymentMethodSelection
                onNext={handlePaymentMethodNext}
                onBack={handlePaymentMethodBack}
              />
            )}

            {/* Step 4: Wait for Driver */}
            {currentStep === "wait-driver" && (
              <WaitForDriver
                onDriverAccepted={handleDriverAccepted}
                onCancel={handleCancelSearch}
                bottomInset={insets.bottom}
              />
            )}

            {/* Step 5: Accept/Decline Offer */}
            {currentStep === "accept-decline" && (
              <AcceptDeclineOffer
                driverOffer={driverOffer}
                onAccept={handleAcceptOffer}
                onDecline={handleDeclineOffer}
                bottomInset={insets.bottom}
              />
            )}

            {/* Step 6: Arriving Details */}
            {currentStep === "arriving-details" && (
              <ArrivingDetails
                driverDetails={driverOffer}
                onCallDriver={handleCallDriver}
                onCancelRide={handleCancelRide}
                onShareDriverDetails={handleShareDriverDetails}
                bottomInset={insets.bottom}
              />
            )}

            {/* Step 6.5: Driver Details */}
            {currentStep === "driver-details" && (
              <DriverDetails
                driverDetails={driverOffer}
                onBack={handleDriverDetailsBack}
                onShare={handleShareDetails}
              />
            )}
            {/* </View> */}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default SelectVehicle;
