import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { getColorPalette, useSystemTheme } from "../../theme/Colors";

interface NetworkStatusBannerProps {
  onRetry?: () => void;
  showConnectionType?: boolean;
}

export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({
  onRetry,
  showConnectionType = false,
}) => {
  const { isOffline, isOnline, type, isLoading } = useNetworkStatus();
  const theme = useSystemTheme();
  const colors = getColorPalette(theme);

  if (isLoading || isOnline) return null;

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: colors.error.main,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text.inverse }]}>
            No Internet Connection
          </Text>
          <Text style={[styles.subtitle, { color: colors.text.inverse }]}>
            Please check your network settings
            {showConnectionType && type && ` (${type})`}
          </Text>
        </View>

        {onRetry && (
          <TouchableOpacity
            style={[styles.retryButton, { borderColor: colors.text.inverse }]}
            onPress={onRetry}
          >
            <Text style={[styles.retryText, { color: colors.text.inverse }]}>
              Retry
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.9,
  },
  retryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 12,
  },
  retryText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
