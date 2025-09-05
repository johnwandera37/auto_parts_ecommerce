import { treeifyError, ZodError } from "zod/v4";
import { errLog } from "./logger";
import { flattenTreeErrors } from "./flattenTreeErrors";

/**
 * Handles form errors consistently across forms.
 *
 * @param err - The caught error
 * @param setError - React state setter for error messages
 */
export function handleFormError(
  err: any,
  setError: (msg: string | null) => void,
  toast?: (opts: {
    title: string;
    description?: string;
    variant?: "destructive" | "default";
  }) => void
) {
  errLog("RAW ERROR CAUGHT:", err);

  if (err instanceof ZodError) {
    // Frontend Zod validation errors
    const tree = treeifyError(err);
    const errors = flattenTreeErrors(tree);
    errLog("Frontend Zod errors: ", errors);
    const message = Object.values(errors).join("\n");
    setError(message);
    toast?.({
      title: "Validation error",
      description: message,
      variant: "destructive",
    });
  } else if (err?.response?.data?.error?.properties) {
    // Axios error with backend Zod validation response
    const properties = err.response.data.error.properties;
    const errorMessages: string[] = [];

    // Extract error messages from each property
    Object.values(properties).forEach((prop: any) => {
      if (prop.errors && Array.isArray(prop.errors)) {
        errorMessages.push(...prop.errors);
      }
    });

    const message = errorMessages.join("\n");
    errLog("Backend Axios Zod validation errors: ", errorMessages);
    setError(message);
    toast?.({
      title: "Invalid input",
      description: message,
      variant: "destructive",
    });
  } else if (err?.error && typeof err.error === "object") {
    // Backend Zod errors (already treeified) (fetcher)
    const errors = flattenTreeErrors(err.error);
    const message = Object.values(errors).join("\n");
    setError(message);
    toast?.({
      title: "Invalid input",
      description: message,
      variant: "destructive",
    });
  } else if (err?.error && typeof err.error === "string") {
    // Backend plain error message
    errLog("Backend plain error: ", err.error);
    setError(err.error);
    toast?.({ title: "Error", description: err.error, variant: "destructive" });
  } else if (err?.response?.data?.error) {
    // Generic Axios error with error in response data
    const errorData = err.response.data.error;
    const message =
      typeof errorData === "string" ? errorData : JSON.stringify(errorData);
    errLog("Axios error response: ", message);
    setError(message);
    toast?.({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  } else {
    // Generic JS/Fetch error
    if (err instanceof Error) { //handles both fetch and axios err.message
      errLog("Generic error: ", err.message);
    }
    const fallback = "An unexpected error occurred";
    setError(fallback);
    toast?.({
      title: "Unexpected error",
      description: fallback,
      variant: "destructive",
    });
  }
}
