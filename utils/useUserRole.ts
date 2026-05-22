import { useEffect, useState } from "react";
import { getUserRole } from "./storage";

export const useUserRole = () => {
  const [role, setRole] = useState<"USER" | "RIDER" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRole = async () => {
      try {
        const userRole = await getUserRole();
        setRole(userRole);
      } catch (error) {
        console.error("Error loading user role:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRole();
  }, []);

  return { role, loading };
};
