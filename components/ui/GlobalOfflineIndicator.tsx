import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useNetwork } from "../../contexts/NetworkContext";
import { NetworkStatusBanner } from "./NetworkStatusBanner";
import { OfflineNotification } from "./OfflineNotification";

interface GlobalOfflineIndicatorProps {
  variant?: "notification" | "banner";
  position?: "top" | "bottom";
  showRetryButton?: boolean;
  showConnectionType?: boolean;
}

export const GlobalOfflineIndicator: React.FC<GlobalOfflineIndicatorProps> = ({
  variant = "notification",
  position = "top",
  showRetryButton = true,
  showConnectionType = false,
}) => {
  const { retryConnection } = useNetwork();

  if (variant === "banner") {
    return (
      <NetworkStatusBanner
        onRetry={showRetryButton ? retryConnection : undefined}
        showConnectionType={showConnectionType}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} pointerEvents="none">
      <OfflineNotification position={position} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
});
