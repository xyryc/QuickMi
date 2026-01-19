import {
  getAuthCompleted,
  getHasCompletedOnboarding,
  getHasSelectedRole,
  getUserRole,
} from "@/utils/storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSelectedRole, setHasSelectedRole] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"user" | "agent" | null>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    const role = await getHasSelectedRole();
    const onboarding = await getHasCompletedOnboarding();
    const auth = await getAuthCompleted();
    const selectedRole = await getUserRole();

    setHasSelectedRole(!!role);
    setHasCompletedOnboarding(!!onboarding);
    setIsAuthenticated(!!auth);
    setUserRole(selectedRole);
    setIsLoading(false);
  };

  if (isLoading) {
    return null; // Splash screen shows while loading
  }

  // Step 1: Check if role selected
  if (!hasSelectedRole) {
    return <Redirect href="/role-selection" />;
  }

  // Step 2: Check if onboarding completed
  if (!hasCompletedOnboarding) {
    return <Redirect href="/(onboarding)/step1" />;
  }

  // Step 3: Check if authenticated
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/signup" />;
  }

  // Step 4: Navigate based on role
  if (userRole === "agent") {
    return <Redirect href="/(agent-verification)" />;
  }

  return <Redirect href="/(user)/home" />;
}
