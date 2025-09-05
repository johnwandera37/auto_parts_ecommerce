import { baseURL, endpoints, pages } from "@/config/constants";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/utils/errMsg";
import { errLog, log } from "@/utils/logger";
import {
  isTokenExpired,
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "@/utils/tokenStore";
import axios, { AxiosError } from "axios";

// Create instance
const api = axios.create({
  baseURL, // or full URL if needed
  withCredentials: true, // 🔥 send cookies like access_token, refresh_token
});

let isRefreshing = false; // A flag to prevent infinite refresh loops
let failedQueue: any[] = [];

// Queue handler for waiting requests
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error); // Something went wrong, reject all
    else prom.resolve(token); // Token refreshed successfully, retry all
  });
  failedQueue = [];
};

// 🔒 Enforce absolute API path
const enforceApiPath = (url?: string) => {
  if (!url) return url;
  // Prevent accidental relative paths like "api/auth/refresh"
  if (!url.startsWith("/")) url = `/${url}`;
  // Ensure all API calls hit /api, not /account/api
  if (!url.startsWith("/api/")) {
    if (url.includes("api/")) {
      const idx = url.indexOf("api/");
      url = `/${url.slice(idx)}`; // strip any prefix before api/
    } else {
      // fallback: prefix with /api
      url = `/api${url}`;
    }
  }
  return url;
};

// Helper to determine error type
const getErrorType = (error: AxiosError) => {
  if (!error.response) return "NETWORK_ERROR";
  const status = error.response.status;
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND"; // ✅ added explicit 404
  if (status === 503) return "SERVICE_UNAVAILABLE";
  return "OTHER_ERROR";
};

// 1️⃣ Request Interceptor
api.interceptors.request.use(
  async (config) => {
    // 🔒 Enforce absolute path
    config.url = enforceApiPath(config.url);

    let accessToken = getAccessToken();

    // Get access token existing in cookies and inject it in the interceptor
    if (!accessToken || isTokenExpired()) {
      try {
        const { data } = await axios.get(endpoints.accessToken, {
          withCredentials: true,
        });

        if (data?.token) {
          setAccessToken(data.token, data.expiresIn);
          accessToken = data.token;
        }
      } catch (error) {
        errLog(`Token fetch error: ${getErrorMessage(error)}`);
      }
    }

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 2️⃣ Response interceptor for handling auth errors 401s + refresh etc
api.interceptors.response.use(
  (response) => response, // normal response from an endpoint
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    // Suppose it fails,
    const errorType = getErrorType(error);
    const isRefreshRequest = originalRequest?.url?.includes("/refresh");

    errLog("Inspect error response", error);
    errLog("Inspect error type", errorType);

    // Handle network errors immediately(could come from  any endpoint)
    if (errorType === "NETWORK_ERROR") {
      toast({
        title: "Network Error",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }

    // Handle service unavailable (Redis down)(Login, refresh and logout route handler use redis)
    if (errorType === "SERVICE_UNAVAILABLE") {
      toast({
        title: "Service Temporarily Unavailable",
        description:
          "We're experiencing technical difficulties. Please try again later.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }

    // Handle 404 explicitly(if endpoint not found)
    if (errorType === "NOT_FOUND") {
      toast({
        title: "API Not Found",
        description: "The requested endpoint was not found. Contact support.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }

    // Handle forbidden errors
    // ✅ Handle 403 for normal requests (role-based restriction in most endpoints that authorize access permissions)
    if (errorType === "FORBIDDEN" && !isRefreshRequest) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to perform this action.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }

    // Handle unauthorized errors (enire token refresh flow for any endpoint that needs an access token)
    // There should be no race condition with the middleware
    //Handle 401 and prevent loop if already trying to refresh
    if (
      errorType === "UNAUTHORIZED" &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(Promise.reject);
      }
      originalRequest._retry = true;
      isRefreshing = true;

      // Attempt to refresh tokens
      try {
        await axios.post(endpoints.refresh, null, {
          withCredentials: true,
        });

        // 🔥Retrieve the access token + expiry
        const { data } = await axios.get(endpoints.accessToken, {
          withCredentials: true,
        });

        if (data?.token) {
          setAccessToken(data.token, data.expiresIn);
          originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
        }

        processQueue(null);
        return api(originalRequest); // Retry original request
      } catch (refreshError: any) {
        processQueue(refreshError, null);

        let backendErrorMsg: string; // This could be added to the cookies so as
        // to be displayed to toasts in Auth context
        //  but for now it can be used for debugging
        if (
          typeof refreshError.response?.data === "string" &&
          refreshError.response.data.startsWith("<!DOCTYPE html>")
        ) {
          backendErrorMsg = "Unexpected HTML response (API misconfigured)";
        } else {
          backendErrorMsg =
            refreshError.response?.data?.error || "Unknown error";
        }

        const refreshErrorType = getErrorType(refreshError);

        errLog("Refresh error check: ", refreshError);
        errLog("Refresh error msg from backend: ", backendErrorMsg);
        errLog("Refresh error type ", refreshErrorType);

        // ✅ CRITICAL CHANGE: Don't show toasts or redirect here!
        // Just clear the token and let middleware handle the UI
        clearAccessToken();

        // ✅ Set a flag that middleware/AuthContext can detect
        document.cookie = `axios_refresh_failed=true; path=/; max-age=5`;
        document.cookie = `axios_refresh_error=${refreshErrorType}; path=/; max-age=5`;

        // ✅ For session expiry, let middleware handle the redirect
        // For other errors, the next navigation will trigger middleware checks
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    // For all other errors
    return Promise.reject(error);
  }
);

export default api;
