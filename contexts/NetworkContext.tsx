import NetInfo from "@react-native-community/netinfo";
import React, { createContext, useCallback, useContext, useState } from "react";
import { Alert, Platform } from "react-native";
import { NetworkStatus, useNetworkStatus } from "../hooks/useNetworkStatus";
import { storageService } from "../services/storage";

interface NetworkContextType extends NetworkStatus {
  isOnline: boolean | null;
  isOffline: boolean | null;
  isLoading: boolean;
  isRetrying: boolean;
  retryConnection: () => Promise<void>;
  getOfflineData: <T>(key: string) => Promise<T | null>;
  setOfflineData: <T>(key: string, data: T) => Promise<void>;
  clearOfflineData: (key: string) => Promise<void>;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

interface NetworkProviderProps {
  children: React.ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({
  children,
}) => {
  const networkStatus = useNetworkStatus();
  const [isRetrying, setIsRetrying] = useState(false);

  const retryConnection = useCallback(async (): Promise<void> => {
    if (isRetrying) {
      return;
    }

    setIsRetrying(true);

    try {
      const networkState = await NetInfo.fetch();

      // Test actual internet connectivity with a reliable endpoint
      const createTimeoutPromise = (url: string) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        return fetch(url, {
          method: "GET",
          signal: controller.signal,
          headers: { "Cache-Control": "no-cache" },
        }).finally(() => clearTimeout(timeoutId));
      };

      const connectivityTests = [
        // Google's public DNS (fast and reliable)
        createTimeoutPromise(
          "https://dns.google/resolve?name=google.com&type=A"
        ),
        // Cloudflare's public DNS as backup
        createTimeoutPromise("https://1.1.1.1/cdn-cgi/trace"),
      ];

      // Try multiple endpoints for better reliability
      const testResults = await Promise.allSettled(connectivityTests);
      const hasConnectivity = testResults.some(
        (result) => result.status === "fulfilled"
      );

      if (hasConnectivity) {
        // Show success feedback on native platforms
        if (Platform.OS !== "web") {
          Alert.alert(
            "Connection Restored",
            "Your internet connection has been restored.",
            [{ text: "OK", style: "default" }]
          );
        }
      } else {
        // Show helpful error message
        if (Platform.OS !== "web") {
          Alert.alert(
            "Still Offline",
            "Unable to establish internet connection. Please check your network settings and try again.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Try Again", onPress: () => retryConnection() },
            ]
          );
        }
      }
    } catch (error) {
      // Handle different error types
      const errorMessage =
        error instanceof Error ? error.message : "Unknown network error";

      if (Platform.OS !== "web") {
        Alert.alert(
          "Connection Error",
          `Failed to check network status: ${errorMessage}`,
          [{ text: "OK", style: "default" }]
        );
      }
    } finally {
      // Add a small delay to prevent UI flickering
      setTimeout(() => {
        setIsRetrying(false);
      }, 1000);
    }
  }, [isRetrying]);

  const getOfflineData = useCallback(
    async <T,>(key: string): Promise<T | null> => {
      try {
        const data = await storageService.getItem(`offline_${key}`);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error("Error getting offline data:", error);
        return null;
      }
    },
    []
  );

  const setOfflineData = useCallback(
    async <T,>(key: string, data: T): Promise<void> => {
      try {
        await storageService.setItem(`offline_${key}`, JSON.stringify(data));
      } catch (error) {
        console.error("Error setting offline data:", error);
      }
    },
    []
  );

  const clearOfflineData = useCallback(async (key: string): Promise<void> => {
    try {
      await storageService.removeItem(`offline_${key}`);
    } catch (error) {
      console.error("Error clearing offline data:", error);
    }
  }, []);

  const contextValue: NetworkContextType = {
    ...networkStatus,
    isRetrying,
    retryConnection,
    getOfflineData,
    setOfflineData,
    clearOfflineData,
  };

  return (
    <NetworkContext.Provider value={contextValue}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }
  return context;
};
