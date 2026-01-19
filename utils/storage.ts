import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  HAS_SELECTED_ROLE: "hasSelectedRole",
  USER_ROLE: "userRole",
  HAS_COMPLETED_ONBOARDING: "hasCompletedOnboarding",
  AUTH_COMPLETED: "authCompleted",
};

export const setHasSelectedRole = async (role: "user" | "agent") => {
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

export const getUserRole = async (): Promise<"user" | "agent" | null> => {
  try {
    const role = await AsyncStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return role as "user" | "agent" | null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
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

export const setAuthCompleted = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_COMPLETED, "true");
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
