"use client";

// hooks/useDashboard.ts
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useAlert } from './useAlert';


export function useAllDashboard() {
  const { user, isLoading, userError } = useAuth();
  const { setError, AlertUI } = useAlert();

  // Handle service unavailable and unauthorized errors
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
    AlertUI
  };
}