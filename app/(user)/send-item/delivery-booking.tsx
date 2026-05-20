import ArrivingDetails from "@/components/ArrivingDetails";
import DriverDetails from "@/components/DriverDetails";
import ReceiverDetails from "@/components/ReceiverDetails";
import SelectRide from "@/components/SelectRide";
import WaitForDriver from "@/components/WaitForDriver";
import { getInstantDeliveryLocations } from "@/utils/storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SelectVehicle = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const mapRef = useRef<MapView>(null);

  const { returnTo, pickupAddress, dropoffAddress } = useLocalSearchParams<{
    returnTo?: string;
    pickupAddress?: string;
    dropoffAddress?: string;
  }>();
  const [resolvedPickupAddress, setResolvedPickupAddress] = useState(
    pickupAddress || "",
  );
  const [resolvedDropoffAddress, setResolvedDropoffAddress] = useState(
    dropoffAddress || "",
  );
  const [pickupCoordinate, setPickupCoordinate] = useState({
    latitude: 23.7808,
    longitude: 90.4211,
  });
  const [dropoffCoordinate, setDropoffCoordinate] = useState({
    latitude: 23.7461,
    longitude: 90.3742,
  });
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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

  useEffect(() => {
    const geocodeLocations = async () => {
      try {
        if (resolvedPickupAddress) {
          const pickupResults = await Location.geocodeAsync(
            resolvedPickupAddress,
          );
          if (pickupResults.length > 0) {
            setPickupCoordinate({
              latitude: pickupResults[0].latitude,
              longitude: pickupResults[0].longitude,
            });
          }
        }

        if (resolvedDropoffAddress) {
          const dropoffResults = await Location.geocodeAsync(
            resolvedDropoffAddress,
          );
          if (dropoffResults.length > 0) {
            setDropoffCoordinate({
              latitude: dropoffResults[0].latitude,
              longitude: dropoffResults[0].longitude,
            });
          }
        }
      } catch (error) {
        console.error("Error geocoding trip locations:", error);
      }
    };

    geocodeLocations();
  }, [resolvedPickupAddress, resolvedDropoffAddress]);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.animateToRegion(
      {
        latitude: pickupCoordinate.latitude,
        longitude: pickupCoordinate.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      700,
    );
  }, [pickupCoordinate]);

  // Sample coordinates; address text comes from selected location params
  const pickupLocation = {
    latitude: pickupCoordinate.latitude,
    longitude: pickupCoordinate.longitude,
    address: resolvedPickupAddress || "Pickup location not selected",
  };

  const dropoffLocation = {
    latitude: dropoffCoordinate.latitude,
    longitude: dropoffCoordinate.longitude,
    address: resolvedDropoffAddress || "Drop-off location not selected",
  };

  // Create a ref for the bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["82%", "96%"], []);
  const animatedSheetPosition = useSharedValue(windowHeight * 0.5);
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 40,
    stiffness: 420,
    overshootClamping: true,
    restDisplacementThreshold: 0.2,
    restSpeedThreshold: 0.2,
  });

  const locateButtonAnimatedStyle = useAnimatedStyle(() => {
    const top = Math.max(0, animatedSheetPosition.value - 72);
    return { top };
  });

  // step flow
  const vehicles = [
    {
      id: "bike-1",
      type: "bike" as const,
      name: "Bike Dispatch",
      price: "₦100",
      time: "10 min away",
      description: "Affordable delivery for quick trips",
    },
    {
      id: "car-1",
      type: "car" as const,
      name: "Car Dispatch",
      price: "₦200",
      time: "5 min away",
      description: "Comfortable delivery for medium packages",
    },
    {
      id: "van-1",
      type: "van" as const,
      name: "Van Dispatch",
      price: "₦300",
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
    price: "₦150",
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
  const handleBack = () => {
    router.back();
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
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(0);
    setCurrentStep("wait-driver");
  };

  // Called when user clicks "Skip" button
  const handleReceiverDetailsSkip = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(0);
    setCurrentStep("wait-driver");
  };

  // Called when user clicks back arrow
  const handleReceiverDetailsBack = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.snapToIndex(0);
    setCurrentStep("select-ride");
  };

  // step 3
  // Called automatically when driver accepts (simulated after 5 seconds)
  const handleDriverAccepted = () => {
    setCurrentStep("arriving-details");
  };

  // Called when user clicks "Cancel Request" button
  const handleCancelSearch = () => {
    setCurrentStep("receiver-details");
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

  const handleLocateMe = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Location Permission",
          "Please enable location permissions to center the map on your location.",
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(currentLocation);

      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          700,
        );
      }
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        "Location Error",
        "Unable to retrieve your current location. Please try again.",
      );
    }
  };

  useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyboardHideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onKeyboardShow = Keyboard.addListener(keyboardShowEvent, () => {
      if (currentStep === "receiver-details") {
        bottomSheetRef.current?.snapToIndex(1);
      }
    });

    const onKeyboardHide = Keyboard.addListener(keyboardHideEvent, () => {
      if (currentStep === "receiver-details") {
        bottomSheetRef.current?.snapToIndex(0);
      }
    });

    return () => {
      onKeyboardShow.remove();
      onKeyboardHide.remove();
    };
  }, [currentStep]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View className="flex-1 pb-72">
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
              latitude:
                (pickupLocation.latitude + dropoffLocation.latitude) / 2,
              longitude:
                (pickupLocation.longitude + dropoffLocation.longitude) / 2,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
            }}
          >
            {/* Pickup Marker */}
            <Marker
              coordinate={pickupLocation}
              title="Pickup Location"
              description={pickupLocation.address}
            >
              <View className="items-center">
                <View className="bg-[#22C55E] rounded-full p-2.5 border-2 border-white">
                  <MaterialIcons name="my-location" size={16} color="white" />
                </View>
                <View className="w-1 h-3 bg-[#22C55E] rounded-full" />
              </View>
            </Marker>

            {/* Dropoff Marker */}
            <Marker
              coordinate={dropoffLocation}
              title="Drop-off Location"
              description={dropoffLocation.address}
            >
              <View className="items-center">
                <View className="bg-[#EF4444] rounded-full p-2.5 border-2 border-white">
                  <Ionicons name="flag" size={16} color="white" />
                </View>
                <View className="w-1 h-3 bg-[#EF4444] rounded-full" />
              </View>
            </Marker>

            {userLocation && (
              <Marker coordinate={userLocation} title="You are here">
                <View className="items-center">
                  <View className="w-11 h-11 rounded-full bg-[#0F73F722] items-center justify-center">
                    <View className="w-8 h-8 rounded-full bg-[#0F73F7] border-2 border-white items-center justify-center">
                      <MaterialIcons
                        name="person-pin-circle"
                        size={16}
                        color="white"
                      />
                    </View>
                  </View>
                  <View className="w-1 h-3 bg-[#0F73F7] rounded-full" />
                </View>
              </Marker>
            )}

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
          animatedPosition={animatedSheetPosition}
          enableDynamicSizing
          maxDynamicContentSize={windowHeight * 0.85}
          enablePanDownToClose={false}
          animateOnMount
          animationConfigs={animationConfigs}
          overDragResistanceFactor={3}
          enableOverDrag={false}
          handleIndicatorStyle={{
            width: 44,
            height: 5,
            backgroundColor: "#C7D2E5",
          }}
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

            {/* Step 3: Wait for Driver */}
            {currentStep === "wait-driver" && (
              <WaitForDriver
                onDriverAccepted={handleDriverAccepted}
                onCancel={handleCancelSearch}
                bottomInset={insets.bottom}
              />
            )}

            {/* Step 4: Arriving Details */}
            {currentStep === "arriving-details" && (
              <ArrivingDetails
                driverDetails={driverOffer}
                onCallDriver={handleCallDriver}
                onCancelRide={handleCancelRide}
                onShareDriverDetails={handleShareDriverDetails}
                bottomInset={insets.bottom}
              />
            )}

            {/* Step 5: Driver Details */}
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

        <Animated.View
          className="absolute right-4 z-50"
          style={[
            locateButtonAnimatedStyle,
            {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          ]}
        >
          <TouchableOpacity
            onPress={handleLocateMe}
            className="bg-white rounded-full w-14 h-14 items-center justify-center border border-[#0F73F7E5]"
          >
            <MaterialIcons name="my-location" size={24} color="#0F73F7" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
};

export default SelectVehicle;
