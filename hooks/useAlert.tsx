"use client";

import { useState, useCallback } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function useAlert() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  // Renderable alert component
  const AlertUI = useCallback(() => {
    if (!error && !success) return null;

    if (error) {
      return (
        <Alert variant="destructive" className="bg-red-50 text-red-600">
          <AlertDescription>
            {typeof error === "string" && error.includes("\n") ? (
              <ul className="list-disc list-inside space-y-1">
                {error.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            ) : (
              error
            )}
          </AlertDescription>
        </Alert>
      );
    }

    if (success) {
      return (
        <Alert variant="default" className="bg-green-50 text-green-600">
          <AlertDescription>
            {typeof success === "string" && success.includes("\n") ? (
              <ul className="list-disc list-inside space-y-1">
                {success.split("\n").map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            ) : (
              success
            )}
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  }, [error, success]);

  return {
    error,
    success,
    setError,
    setSuccess,
    reset,
    AlertUI, // <-- component from hook
  };
}
