"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { AuthContextType, UserProfile } from "@/lib/types";
import { formatExternalUrl } from "@/lib/utils";

const AuthContext = createContext<AuthContextType>({
  isAuth: null,
  userProfile: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");

    const fetchUserProfile = async () => {
      try {
        if (!token) {
          setIsAuth(false);
          setLoading(false);
          return;
        }

        const apiUrl = formatExternalUrl("/current-user-profile");

        const response = await fetch(apiUrl, {
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Unauthorized");

        const data: UserProfile = await response.json();
        setUserProfile(data);
        setIsAuth(true);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        }
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Wrap the context value in useMemo to avoid unnecessary recalculations
  const contextValue = useMemo(
    () => ({
      isAuth,
      userProfile,
      loading,
    }),
    [isAuth, userProfile, loading]
  );
  console.log(userProfile);
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
