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

        const baseUrl =
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_GO_DEV_URL
            : process.env.NEXT_PUBLIC_GO_API_URL;

        const apiUrl = new URL("/current-user-profile", baseUrl).toString();

        const response = await fetch(apiUrl, {
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
        console.error(err.message);
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
