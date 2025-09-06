"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useAlert } from "./useAlert";
import Loader from "@/components/ui/loader";


export function useAuthBoundary() {
  const { user, isLoading, userError } = useAuth();
  const { setError, AlertUI } = useAlert();

  useEffect(() => {
    if (userError === "service-unavailable") {
      setError("Service is temporarily unavailable. Some features may not work properly. Check your connection and try again");
    } else if (userError === "unauthorized") {
      setError("Your session has expired. Please log in again.");
    } else if (userError === "network") {
      setError("Network connection issue. Please check your internet connection.");
    } else if (userError === "other") {
      setError("An unexpected error occurred. Please try again.");
    }
  }, [userError, setError]);

  return {
    user,
    isLoading,
    userError,
    AlertUI,
    LoaderUI: <Loader variant="fullscreen" size="lg" />,
    ErrorUI: (
      <div className="min-h-screen bg-dp-black flex items-center justify-center">
        <div className="max-w-md w-full">
          <AlertUI />
        </div>
      </div>
    ),
  };
}
