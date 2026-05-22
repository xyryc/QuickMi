import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const setAuthTokens = async (
  accessToken: string,
  refreshToken: string,
) => {
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, accessToken],
    [REFRESH_TOKEN_KEY, refreshToken],
  ]);
};

export const getAccessToken = async () => {
  return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = async () => {
  return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

export const clearAuthTokens = async () => {
  await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
};

export const STORAGE_KEYS = {
  HAS_SELECTED_ROLE: "hasSelectedRole",
  USER_ROLE: "userRole",
  HAS_COMPLETED_ONBOARDING: "hasCompletedOnboarding",
  AUTH_COMPLETED: "authCompleted",
  INSTANT_PICKUP_LOCATION: "instantPickupLocation",
  INSTANT_DROPOFF_LOCATION: "instantDropoffLocation",
  HOME_LOCATION_LABEL: "homeLocationLabel",
};

export const setHasSelectedRole = async (role: "USER" | "RIDER") => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_SELECTED_ROLE, "true");
    await AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  } catch (error) {
    console.error("Error saving role:", error);
  }
};

export const getHasSelectedRole = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.HAS_SELECTED_ROLE);
  } catch (error) {
    console.error("Error getting role selection status:", error);
    return null;
  }
};

export const getUserRole = async (): Promise<"USER" | "RIDER" | null> => {
  try {
    const role = await AsyncStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return role as "USER" | "RIDER" | null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
};

export const setUserRole = async (role: "USER" | "RIDER") => {
  await AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
};

export const setHasCompletedOnboarding = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING, "true");
  } catch (error) {
    console.error("Error saving onboarding status:", error);
  }
};

export const getHasCompletedOnboarding = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.HAS_COMPLETED_ONBOARDING);
  } catch (error) {
    console.error("Error getting onboarding status:", error);
    return null;
  }
};

export const setAuthCompleted = async (completed: boolean = true) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.AUTH_COMPLETED,
      completed ? "true" : "false",
    );
  } catch (error) {
    console.error("Error saving auth status:", error);
  }
};

export const getAuthCompleted = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_COMPLETED);
  } catch (error) {
    console.error("Error getting auth status:", error);
    return null;
  }
};

export const setInstantDeliveryLocations = async (
  pickupLocation: string,
  dropoffLocation: string,
) => {
  try {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.INSTANT_PICKUP_LOCATION, pickupLocation],
      [STORAGE_KEYS.INSTANT_DROPOFF_LOCATION, dropoffLocation],
    ]);
  } catch (error) {
    console.error("Error saving instant delivery locations:", error);
  }
};

export const getInstantDeliveryLocations = async (): Promise<{
  pickupLocation: string;
  dropoffLocation: string;
}> => {
  try {
    const values = await AsyncStorage.multiGet([
      STORAGE_KEYS.INSTANT_PICKUP_LOCATION,
      STORAGE_KEYS.INSTANT_DROPOFF_LOCATION,
    ]);

    const pickupLocation = values[0]?.[1] || "";
    const dropoffLocation = values[1]?.[1] || "";

    return { pickupLocation, dropoffLocation };
  } catch (error) {
    console.error("Error getting instant delivery locations:", error);
    return { pickupLocation: "", dropoffLocation: "" };
  }
};

export const setHomeLocationLabel = async (label: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.HOME_LOCATION_LABEL, label);
  } catch (error) {
    console.error("Error saving home location label:", error);
  }
};

export const getHomeLocationLabel = async (): Promise<string> => {
  try {
    return (await AsyncStorage.getItem(STORAGE_KEYS.HOME_LOCATION_LABEL)) || "";
  } catch (error) {
    console.error("Error getting home location label:", error);
    return "";
  }
};
