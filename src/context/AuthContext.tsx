"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { AuthContextType, UserProfile } from "@/lib/types";
import { formatInternalUrl, setCookie } from "@/lib/utils";

const AuthContext = createContext<AuthContextType>({
  isAuth: null,
  userProfile: null,
  loading: true,
  setAuthState: () => {},
  removeAuthState: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration state

  const fetchUserProfile = useCallback(async () => {
    const token = Cookies.get("authToken");

    try {
      // prevent error throw on initial login
      if (!token) {
        setIsAuth(false);
        setLoading(false);
        return;
      }

      const apiUrl = formatInternalUrl("/api/current-user");

      const response = await fetch(apiUrl, {
        cache: "no-store", // More aggressive no-cache
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
      console.error(err);
      setIsAuth(false);
      Cookies.remove("authToken"); // clear token if its invalid
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
    setIsHydrated(true); // Ensure that content is rendered after hydration
  }, [fetchUserProfile]);

  const setAuthState = useCallback(
    (token: string) => async () => {
      await setCookie(token);
      setIsAuth(true);
      fetchUserProfile();
    },
    [fetchUserProfile]
  );

  const removeAuthState = useCallback(() => {
    Cookies.remove("authToken");
    setIsAuth(false);
    setUserProfile(null);
  }, []);

  // Wrap the context value in useMemo to avoid unnecessary recalculations
  const contextValue = useMemo(
    () => ({
      isAuth,
      userProfile,
      loading,
      setAuthState,
      removeAuthState,
    }),
    [isAuth, userProfile, loading, setAuthState, removeAuthState]
  );

  // Delay rendering until hydrated
  if (!isHydrated) {
    return null; // Prevent rendering during SSR
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
