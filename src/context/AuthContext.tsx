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
import { formatExternalUrl, formatInternalUrl } from "@/lib/utils";

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
  const [isHydrated, setIsHydrated] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    try {
      const apiUrl = formatExternalUrl("/current-user-profile");

      const response = await fetch(apiUrl, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data = await response.json();
      setUserProfile(data);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }, [setUserProfile]);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsHydrated(true);
      try {
        await fetchUserProfile();
      } catch (error) {
        setIsAuth(false);
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchUserProfile]);

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
