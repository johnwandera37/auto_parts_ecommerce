"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { endpoints, pages, stringConstants } from "@/config/constants";
import { getErrorMessage } from "@/utils/errMsg";
import { errLog, log } from "@/utils/logger";
import Loader from "@/components/ui/loader";
import { toast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
  setIsLoggingOut: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  isLoading: boolean;
  userError: any;
  setUserError: (error: any) => void;
  isDefaultAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Helper hook for public routes that might not have a user
export const useAuthOptional = () => {
  const context = useContext(AuthContext);
  return context; // Could be null or undefined
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userError, setUserError] = useState<
    null | "service-unavailable" | "unauthorized" | "network" | "other"
  >(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false); //global state for the logout

  // 👇 derived flag (recomputed whenever `user` changes)
  const isDefaultAdmin = !!(
    user &&
    user.email === stringConstants.defaultEmail &&
    user.role === "ADMIN"
  );

  // Set is logged in based on user, depending on getMe route
  const isLoggedIn = !!user;

  // Fetch user from backend fn
  const fetchUser = async () => {
    try {
      // The get me endpoint runs with the help of the axios interceptor such that it will be able to refresh access token if it has expired
      const res = await api.get(endpoints.getMe);
      if (res?.data?.user) {
        setUser(res.data.user);
        setUserError(null);
      } else {
        setUser(null);
        setUserError("unauthorized");
      }
    } catch (error: any) {
      const axiosMessage = getErrorMessage(error);
      const backendErrMsg = error?.response?.data.error;
      const status = error?.response?.status;
      errLog(
        "Fetch user error: ",
        `Axios message: ${axiosMessage} Backennd Error Messgae: ${backendErrMsg}`
      );

      setUser(null);

      if (status === 503) {
        setUserError("service-unavailable");
      } else if (status === 401 || status === 404) {
        setUserError("unauthorized");
      } else if (!error.response) {
        setUserError("network");
      } else {
        setUserError("other");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await api.post(endpoints.logout);
      setUser(null);
      // Trigger storage event to sync across tabs
      window.localStorage.setItem("auth_event", "logout_" + Date.now());
      toast({
        title: "Success",
        description: res?.data?.message ?? "Logout successful!",
      });
      router.push(pages.login);
    } catch (err: any) {
      const errMsg = err?.response?.data?.error
      errLog("Logout failed:", err);
      toast({
        title: "Error",
        description: errMsg ?? "Logout Failed!",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Handle refresh errors from middleware
  const checkAllRefreshErrors = () => {
    // Check for middleware refresh errors
    const middlewareRefreshFailed = document.cookie.includes(
      "refresh_attempt_failed=true"
    );
    const middlewareErrorType = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refresh_error_type="))
      ?.split("=")[1];

    // Check for axios refresh errors
    const axiosRefreshFailed = document.cookie.includes(
      "axios_refresh_failed=true"
    );
    const axiosErrorType = document.cookie
      .split("; ")
      .find((row) => row.startsWith("axios_refresh_error="))
      ?.split("=")[1];

    // Clear all cookies immediately
    document.cookie =
      "refresh_attempt_failed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refresh_error_type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "axios_refresh_failed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "axios_refresh_error=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Handle errors (prioritize middleware errors if both exist)
    const errorSource = middlewareRefreshFailed
      ? "middleware"
      : axiosRefreshFailed
      ? "axios"
      : null;
    const errorType = middlewareErrorType || axiosErrorType;

    if (errorSource && errorType) {
      switch (errorType) {
        case "service-unavailable":
        case "SERVICE_UNAVAILABLE":
          toast({
            title: "Service Unavailable",
            description:
              "Authentication service is temporarily down. Some features may not work properly.",
            variant: "destructive",
          });
          break;
        case "server-error":
          toast({
            title: "Temporary Issue",
            description:
              "Unable to refresh session. Please try again in a moment.",
            variant: "destructive",
          });
          break;
        case "network-error":
        case "NETWORK_ERROR":
          toast({
            title: "Connection Issue",
            description:
              "Unable to connect to authentication service. Please check your internet connection.",
            variant: "destructive",
          });
          break;
        case "UNAUTHORIZED":
        case "FORBIDDEN":
        case "NOT_FOUND":
          // Session expiry - middleware will handle redirect, just show toast
          toast({
            title: "Session Invalid or Expired",
            description: "Invalid or expired session. Please log in.",
            variant: "destructive",
          });
          break;
        default:
          toast({
            title: "Authentication Issue",
            description:
              "There was a problem with your session. Please try refreshing the page.",
            variant: "destructive",
          });
          break;
      }
    }
  };

  useEffect(() => {
    // const pathname = window.location.pathname;
    // const publicRoutes = [pages.home, pages.register, pages.login];
    // Only fetch user if not on public route
    // if (publicRoutes.includes(pathname)) {
    //   setIsLoading(false); // Skip fetching user, since it's a public route
    //   return;
    // }

    // 1. Always fetch user on every page and on mount
    fetchUser();

    // 2. Check for errors on initial load
    checkAllRefreshErrors();

    // 3. Check periodically for a few seconds (in case cookies are set after initial render)
    //Cookies have 5 seconds before they expire
    const errorInterval = setInterval(checkAllRefreshErrors, 1000);
    setTimeout(() => clearInterval(errorInterval), 5000);

    
    // 4. Listen for storage events (cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      log("Storage event:", e.key, e.newValue, e.oldValue);
      if (e.key === "auth_event") {
        log("Auth event detected:", e.newValue);
        if (e.newValue?.startsWith("login_")) {
          fetchUser(); // User logged in another tab
        } else if (e.newValue?.startsWith("logout_")) {
          setUser(null); // Immediate logout UI update
          setUserError("unauthorized");
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

      // 5. Cleanup old auth events (optional)
    const cleanupInterval = setInterval(() => {
      const hourAgo = Date.now() - 60 * 60 * 1000;
      const authEvent = localStorage.getItem("auth_event");
      if (authEvent) {
        const timestamp = parseInt(authEvent.split('_')[1]);
        if (timestamp && timestamp < hourAgo) {
          localStorage.removeItem("auth_event");
        }
      }
    }, 300000); // Every 5 minutes

     // Cleanup function
    return () => {
      clearInterval(errorInterval);
      clearInterval(cleanupInterval);
      window.removeEventListener('storage', handleStorageChange);
    };

  }, []); // Empty dependency array - runs once on mount

  return (
    <AuthContext.Provider
      value={{
        user: user!, // ✅ Non-null assertion - middleware guarantees this
        setUser: setUser as (user: User) => void,
        logout,
        isLoggingOut,
        setIsLoggingOut,
        isLoggedIn,
        isLoading,
        userError,
        setUserError,
        isDefaultAdmin,
      }}
    >
      {isLoading ? <Loader variant="fullscreen" size="lg" /> : children}
    </AuthContext.Provider>
  );
};
