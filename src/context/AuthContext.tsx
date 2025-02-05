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
import { AuthContextType, UserProfile } from "@/lib/types";
import { formatInternalUrl } from "@/lib/utils";
import Cookie from "js-cookie";

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
  const [loading, setLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = formatInternalUrl("/api/auth/current-user");

      const response = await fetch(apiUrl, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        setIsAuth(true);
        // Set a flag cookie when authentication is successful
        Cookie.set("hasAuth", "true", { path: "/", sameSite: "strict" });
      } else {
        // throw error
        throw new Error("Failed to fetch user profile");
      }
    } catch (err) {
      console.error(err);
      setUserProfile(null);
      setIsAuth(false);
      // Remove the flag cookie on authentication failure
      Cookie.remove("hasAuth", { path: "/" });
    } finally {
      setLoading(false);
    }
  }, [setUserProfile, setIsAuth, setLoading]);

  const checkAuthFlag = useCallback(() => {
    return Cookie.get("hasAuth") === "true";
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsHydrated(true);
      // Only fetch if there's an indication of authentication
      if (checkAuthFlag()) {
        await fetchUserProfile();
      } else {
        setIsAuth(false);
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchUserProfile, checkAuthFlag]);

  const setAuthState = useCallback(async () => {
    setIsAuth(true);
    await fetchUserProfile();
  }, [fetchUserProfile]);

  const removeAuthState = useCallback(async () => {
    const apiUrl = formatInternalUrl("/api/auth/logout");
    await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
    });
    setIsAuth(false);
    setUserProfile(null);
    window.location.href = "/";
  }, []);

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

  if (!isHydrated) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
