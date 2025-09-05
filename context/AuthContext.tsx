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

  // 👇 derived flag (recomputed whenever `user` changes)
  const isDefaultAdmin = !!(
    user &&
    user.email === stringConstants.defaultEmail &&
    user.role === "ADMIN"
  );

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
    try {
      await api.post(endpoints.logout);
      setUser(null);
      router.push("/");
    } catch (err) {
      errLog("Logout failed:", getErrorMessage(err));
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
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
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
    const pathname = window.location.pathname;
    const publicRoutes = [pages.home, pages.register, pages.login];

    if (publicRoutes.includes(pathname)) {
      setIsLoading(false); // Skip fetching user, since it's a public route
      return;
    }

    // Only fetch user if not on public route
    fetchUser();

    // Check for errors on initial load
    checkAllRefreshErrors();
    // / Also check periodically for a few seconds (in case cookies are set after initial render)
    const interval = setInterval(checkAllRefreshErrors, 1000);
    setTimeout(() => clearInterval(interval), 5000);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user!, // ✅ Non-null assertion - middleware guarantees this
        setUser: setUser as (user: User) => void,
        logout,
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
