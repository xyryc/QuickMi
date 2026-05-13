import ButtonPrimary from "@/components/ButtonPrimary";
import SearchBar from "@/components/Searchbar";
import {
  getInstantDeliveryLocations,
  setInstantDeliveryLocations,
} from "@/utils/storage";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LocationField = "pickup" | "dropoff";

type PlacePrediction = {
  place_id: string;
  description: string;
};

const SelectLocation = () => {
  const router = useRouter();
  const {
    selectedLocationLabel,
    selectedLocationField,
    pickupLocation: pickupLocationParam,
    dropoffLocation: dropoffLocationParam,
  } = useLocalSearchParams<{
    selectedLocationLabel?: string;
    selectedLocationField?: LocationField;
    pickupLocation?: string;
    dropoffLocation?: string;
  }>();
  const GOOGLE_PLACES_API_KEY =
    process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || "";

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeField, setActiveField] = useState<LocationField | null>(null);
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const formatAddressLabel = (
    place?: Location.LocationGeocodedAddress | null,
  ) => {
    if (!place) return "";

    const parts = [
      place.name,
      place.street,
      place.district,
      place.city,
      place.region,
      place.country,
    ].filter(Boolean);

    return parts.join(", ");
  };

  useEffect(() => {
    const loadSavedLocations = async () => {
      const savedLocations = await getInstantDeliveryLocations();
      setPickupLocation((prev) => prev || savedLocations.pickupLocation);
      setDropoffLocation((prev) => prev || savedLocations.dropoffLocation);
      setIsHydrated(true);
    };

    loadSavedLocations();
  }, []);

  useEffect(() => {
    if (
      pickupLocationParam !== undefined ||
      dropoffLocationParam !== undefined
    ) {
      if (pickupLocationParam && pickupLocationParam.trim().length > 0) {
        setPickupLocation(pickupLocationParam);
      }
      if (dropoffLocationParam && dropoffLocationParam.trim().length > 0) {
        setDropoffLocation(dropoffLocationParam);
      }
      return;
    }

    if (!selectedLocationLabel || !selectedLocationField) return;

    if (selectedLocationField === "pickup") {
      setPickupLocation(selectedLocationLabel);
      return;
    }

    setDropoffLocation(selectedLocationLabel);
  }, [
    dropoffLocationParam,
    pickupLocationParam,
    selectedLocationField,
    selectedLocationLabel,
  ]);

  useEffect(() => {
    if (!isHydrated) return;
    void setInstantDeliveryLocations(pickupLocation, dropoffLocation);
  }, [isHydrated, pickupLocation, dropoffLocation]);

  useEffect(() => {
    const autoDetectDropoff = async () => {
      if (!isHydrated) return;
      if (dropoffLocation.trim().length > 0) return;

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Location Permission",
            "Please enable location permission to auto-detect your drop-off location.",
          );
          return;
        }

        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        });

        const label = formatAddressLabel(reverseGeocode[0]);
        if (label) {
          setDropoffLocation(label);
        }
      } catch (error) {
        console.error("Error auto detecting drop-off location:", error);
        Alert.alert(
          "Location Error",
          "Unable to auto-detect your drop-off location. Please set it manually.",
        );
      }
    };

    autoDetectDropoff();
  }, [dropoffLocation, isHydrated]);

  useEffect(() => {
    const query = activeField === "pickup" ? pickupLocation : dropoffLocation;

    if (!activeField || query.trim().length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      setSearchError("");
      return;
    }

    if (!GOOGLE_PLACES_API_KEY) {
      setSuggestions([]);
      setIsSearching(false);
      setSearchError("Missing Google Places API key");
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            query,
          )}&key=${GOOGLE_PLACES_API_KEY}`,
        );
        const data = await response.json();

        if (
          data?.status &&
          data.status !== "OK" &&
          data.status !== "ZERO_RESULTS"
        ) {
          const errorMessage = data?.error_message
            ? `${data.status}: ${data.error_message}`
            : data.status;
          setSearchError(errorMessage);
          setSuggestions([]);
          return;
        }

        setSearchError("");
        const predictionList = Array.isArray(data?.predictions)
          ? data.predictions
          : [];
        setSuggestions(predictionList);
      } catch (error) {
        console.error("Error searching places:", error);
        setSearchError("Unable to fetch suggestions");
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [activeField, dropoffLocation, pickupLocation, GOOGLE_PLACES_API_KEY]);

  const handleChangeSearch = (field: LocationField, value: string) => {
    setActiveField(field);
    if (field === "pickup") {
      setPickupLocation(value);
      return;
    }
    setDropoffLocation(value);
  };

  const handleSelectSuggestion = (prediction: PlacePrediction) => {
    if (activeField === "pickup") {
      setPickupLocation(prediction.description);
    } else if (activeField === "dropoff") {
      setDropoffLocation(prediction.description);
    }

    setSuggestions([]);
    setSearchError("");
    setActiveField(null);
  };

  const handleConfirm = () => {
    router.push({
      pathname: "/(user)/receive-parcel/delivery-booking",
      params: {
        returnTo: "/(user)/receive-parcel/route-details",
        pickupAddress: pickupLocation,
        dropoffAddress: dropoffLocation,
      },
    });
  };

  return (
    <SafeAreaView>
      <View className="mx-5 my-5">
        <Text className="font-sf-pro-medium text-lg mb-4">Select Location</Text>

        <SearchBar
          placeholder="Search Pickup"
          value={pickupLocation}
          onChangeText={(value) => handleChangeSearch("pickup", value)}
          showLocationPicker
          containerClassName="mb-3"
          locationPickerPath={() =>
            router.push({
              pathname: "/(user)/location-picker",
              params: {
                returnTo: "/(user)/receive-parcel/route-details",
                locationField: "pickup",
                pickupLocation,
                dropoffLocation,
              },
            })
          }
        />

        <SearchBar
          placeholder="Search Drop Off"
          value={dropoffLocation}
          onChangeText={(value) => handleChangeSearch("dropoff", value)}
          showLocationPicker
          locationPickerPath={() =>
            router.push({
              pathname: "/(user)/location-picker",
              params: {
                returnTo: "/(user)/receive-item/route-details",
                locationField: "dropoff",
                pickupLocation,
                dropoffLocation,
              },
            })
          }
        />

        {activeField &&
          (activeField === "pickup"
            ? pickupLocation.trim().length >= 2
            : dropoffLocation.trim().length >= 2) && (
            <View className="bg-white border border-gray-200 rounded-xl mb-3 max-h-52">
              {isSearching && (
                <View className="py-3 items-center">
                  <ActivityIndicator color="#0F73F7" />
                </View>
              )}

              {!isSearching && searchError ? (
                <View className="px-4 py-3">
                  <Text className="text-xs text-red-500 font-sf-pro-regular">
                    {searchError}
                  </Text>
                </View>
              ) : null}

              {!isSearching && !searchError && suggestions.length === 0 ? (
                <View className="px-4 py-3">
                  <Text className="text-xs text-gray-500 font-sf-pro-regular">
                    No suggestions found
                  </Text>
                </View>
              ) : null}

              {!isSearching && !searchError && suggestions.length > 0 && (
                <FlatList
                  data={suggestions}
                  keyExtractor={(item) => item.place_id}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSelectSuggestion(item)}
                      className="px-4 py-3 border-b border-gray-100"
                    >
                      <Text
                        className="text-sm font-sf-pro-regular text-[#031731]"
                        numberOfLines={2}
                      >
                        {item.description}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}

        <View className="border-t border-gray-200 my-3" />

        <View className="flex-row gap-2.5">
          <TouchableOpacity className="bg-[#9FC7FC40] px-3.5 py-2 rounded-xl">
            <Text className="text-xs font-sf-pro-medium">Recent</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-[#9FC7FC40] px-3.5 py-2 rounded-xl">
            <Text className="text-xs font-sf-pro-medium">Saved</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-yellow-600 mt-10 mb-3">
          Below confirm button will be removed in the backend+API integration
          phase. This button is for development purposes only.
        </Text>
        <ButtonPrimary title="Confirm" onPress={handleConfirm} />
      </View>
    </SafeAreaView>
  );
};

export default SelectLocation;
