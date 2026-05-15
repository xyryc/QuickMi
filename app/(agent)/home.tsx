import ButtonSecondary from "@/components/ButtonSecondary";
import EarningsCard from "@/components/EarningsCard";
import TripDetailsCard from "@/components/TripDetailsCard";
import TripOfferCard from "@/components/TripOfferCard";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AgentStatus =
  | "offline"
  | "online"
  | "finding_trips"
  | "trip_offer"
  | "trip_accepted"
  | "enroute_pickup"
  | "pickup_photo_required"
  | "enroute_dropoff"
  | "dropoff_photo_required";

const AgentHome = () => {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const phaseTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Agent status state
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("offline");

  // Mock trip data
  const [currentTrip, setCurrentTrip] = useState<any>(null);
  const [pickupPhotoUri, setPickupPhotoUri] = useState<string | null>(null);
  const [dropoffPhotoUri, setDropoffPhotoUri] = useState<string | null>(null);
  const [phaseCountdown, setPhaseCountdown] = useState<number>(5);
  const [capturingPickupPhoto, setCapturingPickupPhoto] = useState(false);
  const [capturingDropoffPhoto, setCapturingDropoffPhoto] = useState(false);

  // user location
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Add heading state for rotation
  const [heading, setHeading] = useState<number>(0);

  // Get user location and watch for updates
  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;
    let headingSubscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationError("Permission to access location was denied");
          Alert.alert(
            "Location Permission",
            "Please enable location permissions to see your current location on the map.",
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

        if (
          location.coords.heading !== null &&
          location.coords.heading !== undefined
        ) {
          setHeading(location.coords.heading);
        }

        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            },
            1000,
          );
        }

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            const newLocation = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
            setUserLocation(newLocation);

            if (
              location.coords.heading !== null &&
              location.coords.heading !== undefined
            ) {
              setHeading(location.coords.heading);
            }
          },
        );

        headingSubscription = await Location.watchHeadingAsync(
          (headingData) => {
            setHeading(headingData.trueHeading);
          },
        );
      } catch (error) {
        console.error("Error getting location:", error);
        setLocationError("Failed to get current location");
        Alert.alert(
          "Location Error",
          "Unable to retrieve your current location. Please try again.",
        );
      }
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      if (headingSubscription) {
        headingSubscription.remove();
      }
    };
  }, []);

  // Handle Go Online button press
  const handleGoOnline = () => {
    setAgentStatus("online");

    // Show "You are online" for 2 seconds
    setTimeout(() => {
      setAgentStatus("finding_trips");

      // Show "Finding trips" for 3 seconds, then show trip offer
      setTimeout(() => {
        // Mock trip data
        setCurrentTrip({
          tripId: "5R9G87R",
          fromLocation: "123 Main St, Downtown, Dhaka 1000",
          toLocation: "456 Park Ave, Gulshan, Dhaka 1212",
          distance: "5.39 KM",
          suggestedPrice: "₦150",
          pickupTime: "14 May 2023, 2:30 PM",
          estimatedTime: "15 minutes",
        });
        setAgentStatus("trip_offer");
      }, 3000);
    }, 2000);
  };

  // Handle trip acceptance
  const handleAcceptTrip = () => {
    setCurrentTrip((prev: any) => ({
      ...prev,
      offeredPrice: prev?.suggestedPrice,
    }));
    setPickupPhotoUri(null);
    setDropoffPhotoUri(null);
    setPhaseCountdown(5);
    setAgentStatus("trip_accepted");
  };

  // Handle trip decline
  const handleDeclineTrip = () => {
    setCurrentTrip(null);
    setAgentStatus("finding_trips");

    // Search again after 2 seconds
    // setTimeout(() => {
    //   Alert.alert("Info", "Searching for another trip...");
    // }, 1000);
  };

  // Handle trip timeout
  const handleTripTimeout = () => {
    setCurrentTrip(null);
    setAgentStatus("finding_trips");
  };

  const clearPhaseTimer = () => {
    if (phaseTimerRef.current) {
      clearInterval(phaseTimerRef.current);
      phaseTimerRef.current = null;
    }
  };

  const startPhaseCountdown = (
    initialValue: number,
    onComplete: () => void,
  ) => {
    clearPhaseTimer();
    setPhaseCountdown(initialValue);

    phaseTimerRef.current = setInterval(() => {
      setPhaseCountdown((prev) => {
        if (prev <= 1) {
          clearPhaseTimer();
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStartPickup = () => {
    setAgentStatus("enroute_pickup");
    startPhaseCountdown(5, () => {
      setAgentStatus("pickup_photo_required");
    });
  };

  const handleStartDelivery = () => {
    setAgentStatus("enroute_dropoff");
    startPhaseCountdown(5, () => {
      setAgentStatus("dropoff_photo_required");
    });
  };

  const requestCameraPermission = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Camera Permission Required",
        "Please enable camera permission to capture delivery photos.",
      );
      return false;
    }
    return true;
  };

  const handleCapturePickupPhoto = async () => {
    try {
      setCapturingPickupPhoto(true);
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setPickupPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Pickup photo capture failed:", error);
      Alert.alert("Camera Error", "Could not open camera. Please try again.");
    } finally {
      setCapturingPickupPhoto(false);
    }
  };

  const handleCaptureDropoffPhoto = async () => {
    try {
      setCapturingDropoffPhoto(true);
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        setDropoffPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Dropoff photo capture failed:", error);
      Alert.alert("Camera Error", "Could not open camera. Please try again.");
    } finally {
      setCapturingDropoffPhoto(false);
    }
  };

  const handleCompleteDelivery = () => {
    Alert.alert("Delivery Completed", "Trip completed successfully.");
    clearPhaseTimer();
    setPickupPhotoUri(null);
    setDropoffPhotoUri(null);
    setCurrentTrip(null);
    setPhaseCountdown(5);
    setAgentStatus("offline");
  };

  // Handle cancel trip
  const handleCancelTrip = () => {
    Alert.alert("Cancel Trip", "Are you sure you want to cancel this trip?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          clearPhaseTimer();
          setPickupPhotoUri(null);
          setDropoffPhotoUri(null);
          setCurrentTrip(null);
          setAgentStatus("online");
        },
      },
    ]);
  };

  useEffect(() => {
    return () => {
      clearPhaseTimer();
    };
  }, []);

  // Define snap points based on status
  const snapPoints = useMemo(() => {
    switch (agentStatus) {
      case "offline":

      case "online":

      case "finding_trips":
        return ["20%", "40%"];

      case "trip_offer":
        return ["60%", "80%"];

      case "trip_accepted":
      case "enroute_pickup":
      case "enroute_dropoff":
        return ["40%", "70%"];

      case "pickup_photo_required":
      case "dropoff_photo_required":
        return ["30%", "80%"];

      default:
        return ["40%", "60%"];
    }
  }, [agentStatus]);

  // Render bottom sheet content based on status
  const renderBottomSheetContent = () => {
    switch (agentStatus) {
      case "offline":
        return (
          <View className="flex-1 justify-center">
            <ButtonSecondary title="Go Online" onPress={handleGoOnline} />
          </View>
        );

      case "online":
        return (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl font-sf-pro-medium">You are Online!</Text>

            <View className="border-2 border-[#005FDC24] w-full mt-4" />
          </View>
        );

      case "finding_trips":
        return (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl font-sf-pro-medium">Finding Trips</Text>

            <View className="border-2 border-[#005FDC24] w-full mt-4" />
          </View>
        );

      case "trip_offer":
        return currentTrip ? (
          <TripOfferCard
            tripId={currentTrip.tripId}
            fromLocation={currentTrip.fromLocation}
            toLocation={currentTrip.toLocation}
            distance={currentTrip.distance}
            suggestedPrice={currentTrip.suggestedPrice}
            pickupTime={currentTrip.pickupTime}
            onAccept={handleAcceptTrip}
            onDecline={handleDeclineTrip}
            onTimeout={handleTripTimeout}
          />
        ) : null;

      case "trip_accepted":
        return currentTrip ? (
          <View>
            <TripDetailsCard
              estimatedTime={currentTrip.estimatedTime}
              pickupLocation={currentTrip.fromLocation}
              dropoffLocation={currentTrip.toLocation}
              distance={currentTrip.distance}
              price={currentTrip.offeredPrice || currentTrip.suggestedPrice}
              agentStatus={agentStatus}
              pickupPhotoUri={pickupPhotoUri}
              dropoffPhotoUri={dropoffPhotoUri}
            />
            <TouchableOpacity
              onPress={handleStartPickup}
              className="mt-4 py-3 rounded-2xl items-center bg-[#0F73F7]"
            >
              <Text className="text-white font-sf-pro-semibold">Start Pickup</Text>
            </TouchableOpacity>
            <ButtonSecondary
              title="Cancel Trip"
              onPress={handleCancelTrip}
              className="mt-3"
            />
          </View>
        ) : null;

      case "enroute_pickup":
        return (
          <View className="py-2">
            {currentTrip ? (
              <TripDetailsCard
                estimatedTime={currentTrip.estimatedTime}
                pickupLocation={currentTrip.fromLocation}
                dropoffLocation={currentTrip.toLocation}
                distance={currentTrip.distance}
                price={currentTrip.offeredPrice || currentTrip.suggestedPrice}
                agentStatus={agentStatus}
                pickupPhotoUri={pickupPhotoUri}
                dropoffPhotoUri={dropoffPhotoUri}
              />
            ) : null}
            <Text className="text-lg font-sf-pro-semibold text-center text-[#031731]">
              Arriving at Pickup
            </Text>
            <Text className="text-center mt-2 text-[#4D4D4D]">
              Arriving in {phaseCountdown}s
            </Text>
            <Text className="text-center mt-4 text-[#6B6B6B] text-sm">
              {currentTrip?.fromLocation}
            </Text>
          </View>
        );

      case "pickup_photo_required":
        return (
          <View className="py-2">
            {currentTrip ? (
              <TripDetailsCard
                estimatedTime={currentTrip.estimatedTime}
                pickupLocation={currentTrip.fromLocation}
                dropoffLocation={currentTrip.toLocation}
                distance={currentTrip.distance}
                price={currentTrip.offeredPrice || currentTrip.suggestedPrice}
                agentStatus={agentStatus}
                pickupPhotoUri={pickupPhotoUri}
                dropoffPhotoUri={dropoffPhotoUri}
              />
            ) : null}
            <Text className="text-lg font-sf-pro-semibold text-center text-[#031731]">
              Pickup Arrived
            </Text>
            <Text className="text-center mt-2 text-[#4D4D4D]">
              Capture pickup photo to continue.
            </Text>

            <ButtonSecondary
              title={capturingPickupPhoto ? "Opening Camera..." : "Capture Pickup Photo"}
              onPress={handleCapturePickupPhoto}
              className="mt-4"
            />

            <TouchableOpacity
              disabled={!pickupPhotoUri}
              onPress={handleStartDelivery}
              className={`mt-3 py-3 rounded-2xl items-center ${
                pickupPhotoUri ? "bg-[#0F73F7]" : "bg-[#BBD6FC]"
              }`}
            >
              <Text className="text-white font-sf-pro-semibold">Start Delivery</Text>
            </TouchableOpacity>
          </View>
        );

      case "enroute_dropoff":
        return (
          <View className="py-2">
            {currentTrip ? (
              <TripDetailsCard
                estimatedTime={currentTrip.estimatedTime}
                pickupLocation={currentTrip.fromLocation}
                dropoffLocation={currentTrip.toLocation}
                distance={currentTrip.distance}
                price={currentTrip.offeredPrice || currentTrip.suggestedPrice}
                agentStatus={agentStatus}
                pickupPhotoUri={pickupPhotoUri}
                dropoffPhotoUri={dropoffPhotoUri}
              />
            ) : null}
            <Text className="text-lg font-sf-pro-semibold text-center text-[#031731]">
              Delivering Parcel
            </Text>
            <Text className="text-center mt-2 text-[#4D4D4D]">
              Arriving in {phaseCountdown}s
            </Text>
            <Text className="text-center mt-4 text-[#6B6B6B] text-sm">
              {currentTrip?.toLocation}
            </Text>
          </View>
        );

      case "dropoff_photo_required":
        return (
          <View className="py-2">
            {currentTrip ? (
              <TripDetailsCard
                estimatedTime={currentTrip.estimatedTime}
                pickupLocation={currentTrip.fromLocation}
                dropoffLocation={currentTrip.toLocation}
                distance={currentTrip.distance}
                price={currentTrip.offeredPrice || currentTrip.suggestedPrice}
                agentStatus={agentStatus}
                pickupPhotoUri={pickupPhotoUri}
                dropoffPhotoUri={dropoffPhotoUri}
              />
            ) : null}
            <Text className="text-lg font-sf-pro-semibold text-center text-[#031731]">
              Dropoff Arrived
            </Text>
            <Text className="text-center mt-2 text-[#4D4D4D]">
              Capture dropoff photo to complete delivery.
            </Text>

            <ButtonSecondary
              title={capturingDropoffPhoto ? "Opening Camera..." : "Capture Dropoff Photo"}
              onPress={handleCaptureDropoffPhoto}
              className="mt-4"
            />

            <TouchableOpacity
              disabled={!dropoffPhotoUri}
              onPress={handleCompleteDelivery}
              className={`mt-3 py-3 rounded-2xl items-center ${
                dropoffPhotoUri ? "bg-[#0F73F7]" : "bg-[#BBD6FC]"
              }`}
            >
              <Text className="text-white font-sf-pro-semibold">
                Complete Delivery
              </Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
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
              latitude: userLocation?.latitude || 23.8103,
              longitude: userLocation?.longitude || 90.4125,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation={false}
            showsMyLocationButton={true}
            followsUserLocation={true}
          >
            {userLocation && (
              <Marker
                coordinate={userLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
              >
                <View
                  style={{
                    transform: [{ rotate: `${heading}deg` }],
                  }}
                >
                  <Image
                    source={require("@/assets/images/map-car.svg")}
                    style={{
                      width: 25,
                      height: 45,
                    }}
                    contentFit="scale-down"
                  />
                </View>
              </Marker>
            )}
          </MapView>

          {/* drawer Button */}
          <TouchableOpacity
            onPress={() => router.push("/(agent)/profile/profile")}
            className="absolute top-4 left-4 z-10 bg-white rounded-full w-11 h-11 items-center justify-center shadow-lg border border-[#0F73F7E5]"
            style={{
              marginTop: insets.top,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Ionicons name="reorder-three-outline" size={24} color="black" />
          </TouchableOpacity>

          {/* earning card */}
          <EarningsCard
            className="absolute inset-x-0"
            earnings="₦8.07"
            hours="3"
            acceptanceRate="60%"
            trips="03"
          />

          {/* notification */}
          <TouchableOpacity
            onPress={() => router.push("/(shared)/notification")}
            className="absolute top-4 right-4 z-10 bg-white rounded-full w-11 h-11 items-center justify-center shadow-lg border border-[#0F73F7E5]"
            style={{
              marginTop: insets.top,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <SimpleLineIcons
              className="p-1.5 rounded-full bg-white"
              name="bell"
              size={18}
              color="black"
            />

            <Text className="absolute -top-1 -right-1.5 w-[16px] h-[16px] items-center text-center text-white bg-custom-custom-red rounded-full font-sf-pro-medium text-[9px]">
              06
            </Text>
          </TouchableOpacity>
        </View>

        {/* bottom sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          backgroundStyle={{ backgroundColor: "white" }}
          handleIndicatorStyle={{ backgroundColor: "#D1D5DB" }}
        >
          <BottomSheetView
            className="flex-1 px-5"
            style={{
              paddingBottom: insets.bottom + 20,
            }}
          >
            {renderBottomSheetContent()}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default AgentHome;
