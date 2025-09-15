import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export interface NetworkStatus {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string | null;
  isWifiEnabled: boolean | null;
}

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: null,
    isInternetReachable: null,
    type: null,
    isWifiEnabled: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkStatus({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        isWifiEnabled: state.isWifiEnabled ?? null,
      });
    });

    return () => unsubscribe();
  }, []);

  const isOnline =
    networkStatus.isConnected && networkStatus.isInternetReachable;
  const isOffline =
    networkStatus.isConnected === false ||
    networkStatus.isInternetReachable === false;

  return {
    ...networkStatus,
    isOnline,
    isOffline,
    isLoading: networkStatus.isConnected === null,
  };
};
