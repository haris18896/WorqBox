import React, { createContext, useCallback, useContext } from "react";
import { NetworkStatus, useNetworkStatus } from "../hooks/useNetworkStatus";
import { storageService } from "../services/storage";

interface NetworkContextType extends NetworkStatus {
  isOnline: boolean | null;
  isOffline: boolean | null;
  isLoading: boolean;
  retryConnection: () => void;
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

  const retryConnection = useCallback(() => {
    // Force a network check by accessing NetInfo again
    // This is mainly for UI feedback, the hook automatically monitors
    console.log("Retrying network connection...");
  }, []);

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
