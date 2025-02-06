"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
  useMemo,
  useCallback,
} from "react";
import type { AuthContextType, UserProfile } from "@/lib/types";
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

  const checkAuthFlag = useCallback(() => {
    return Cookie.get("hasAuth") === "true"
  }, [])

  const removeCookies = useCallback(() => {
    Cookie.remove("hasAuth", { path: "/" });
    Cookie.remove("authToken", { path: "/" });
  }, [])

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
        console.log("You are authenticated");
        // Set a flag cookie when authentication is successful
        Cookie.set("hasAuth", "true", { path: "/", sameSite: "strict" });
      } else {
        throw new Error("Authentication failed");
      }
    } catch (err) {
      console.error(err);
      setUserProfile(null);
      setIsAuth(false);
      // Remove the flag cookie and authToken on authentication failure
      removeCookies();
    } finally {
      setLoading(false);
    }
  }, [removeCookies]);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsHydrated(true);
      // Only fetch if there's an indication of authentication
      if (checkAuthFlag()) {
        try {
          await fetchUserProfile();
        } catch (error) {
          // If fetchUserProfile fails, remove both hasAuth and authToken
          removeCookies();
          setIsAuth(false);
          setUserProfile(null);
        }
      } else {
        setIsAuth(false);
        setLoading(false);
      }
    };

    initializeAuth();
  }, [fetchUserProfile, checkAuthFlag, removeCookies]);

  // will set auth state if fetchUserProfile is complete
  const setAuthState = useCallback(async () => {
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
    // Remove both hasAuth and authToken cookies
    removeCookies();
    window.location.href = "/";
  }, [removeCookies]);

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
