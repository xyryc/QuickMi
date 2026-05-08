import ButtonPrimary from "@/components/ButtonPrimary";
import SearchBar from "@/components/Searchbar";
import {
  getInstantDeliveryLocations,
  setInstantDeliveryLocations,
} from "@/utils/storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

  useEffect(() => {
    const loadSavedLocations = async () => {
      const savedLocations = await getInstantDeliveryLocations();
      console.log("[SelectLocation] loaded from storage:", savedLocations);

      setPickupLocation(savedLocations.pickupLocation);
      setDropoffLocation(savedLocations.dropoffLocation);
      setIsHydrated(true);
      console.log("[SelectLocation] hydration complete");
    };

    loadSavedLocations();
  }, []);

  useEffect(() => {
    if (pickupLocationParam !== undefined || dropoffLocationParam !== undefined) {
      console.log("[SelectLocation] applying direct location params:", {
        pickupLocationParam,
        dropoffLocationParam,
      });
      if (pickupLocationParam !== undefined) {
        setPickupLocation(pickupLocationParam);
      }
      if (dropoffLocationParam !== undefined) {
        setDropoffLocation(dropoffLocationParam);
      }
      return;
    }

    console.log("[SelectLocation] params changed:", {
      selectedLocationField,
      selectedLocationLabel,
    });
    if (!selectedLocationLabel || !selectedLocationField) return;

    if (selectedLocationField === "pickup") {
      console.log("[SelectLocation] applying pickup from params");
      setPickupLocation(selectedLocationLabel);
      return;
    }

    console.log("[SelectLocation] applying dropoff from params");
    setDropoffLocation(selectedLocationLabel);
  }, [
    dropoffLocationParam,
    pickupLocationParam,
    selectedLocationField,
    selectedLocationLabel,
  ]);

  useEffect(() => {
    if (!isHydrated) return;
    console.log("[SelectLocation] persisting to storage:", {
      pickupLocation,
      dropoffLocation,
    });
    void setInstantDeliveryLocations(pickupLocation, dropoffLocation);
  }, [isHydrated, pickupLocation, dropoffLocation]);

  useEffect(() => {
    console.log("[SelectLocation] state snapshot:", {
      pickupLocation,
      dropoffLocation,
      isHydrated,
      activeField,
    });
  }, [pickupLocation, dropoffLocation, isHydrated, activeField]);

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
            query
          )}&key=${GOOGLE_PLACES_API_KEY}`
        );
        const data = await response.json();

        if (data?.status && data.status !== "OK" && data.status !== "ZERO_RESULTS") {
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
      pathname: "/(user)/select-vehicle",
      params: {
        returnTo: "/(user)/instant-delivery/select-location",
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
                returnTo: "/(user)/instant-delivery/select-location",
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
                returnTo: "/(user)/instant-delivery/select-location",
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
