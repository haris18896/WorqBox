import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { getColorPalette, useSystemTheme } from "../../theme/Colors";
import {
  isTablet,
  isWeb,
  scaleFontSize,
  scaleSize,
} from "../../theme/responsive";

interface NetworkStatusBannerProps {
  onRetry?: () => Promise<void>;
  showConnectionType?: boolean;
}

export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({
  onRetry,
  showConnectionType = false,
}) => {
  const { isOnline, type, isLoading } = useNetworkStatus();
  const theme = useSystemTheme();
  const colors = getColorPalette(theme);
  const [isRetrying, setIsRetrying] = React.useState(false);

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
            style={[
              styles.retryButton,
              {
                borderColor: colors.text.inverse,
                opacity: isRetrying ? 0.6 : 1,
              },
            ]}
            onPress={async () => {
              if (isRetrying) {
                return;
              }

              if (!onRetry) {
                alert("Error: onRetry function is missing!");
                return;
              }

              if (typeof onRetry !== "function") {
                alert("Error: onRetry is not a function!");
                return;
              }

              setIsRetrying(true);

              try {
                await onRetry();
              } catch (error) {
                alert(
                  "Retry failed: " +
                    (error instanceof Error ? error.message : String(error))
                );
              } finally {
                setIsRetrying(false);
              }
            }}
            disabled={isRetrying}
          >
            <Text style={[styles.retryText, { color: colors.text.inverse }]}>
              {isRetrying ? "Retrying..." : "Retry"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    paddingHorizontal: Platform.select({
      web: isTablet() ? scaleSize(24) : isWeb() ? scaleSize(32) : scaleSize(16),
      default: scaleSize(16),
    }),
    paddingVertical: Platform.select({
      web: isTablet() ? scaleSize(16) : isWeb() ? scaleSize(20) : scaleSize(12),
      default: scaleSize(12),
    }),
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
    fontSize: scaleFontSize(16),
    fontWeight: "600",
    marginBottom: scaleSize(2),
  },
  subtitle: {
    fontSize: scaleFontSize(12),
    opacity: 0.9,
  },
  retryButton: {
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(6),
    borderWidth: 1,
    borderRadius: scaleSize(4),
    marginLeft: scaleSize(12),
  },
  retryText: {
    fontSize: scaleFontSize(12),
    fontWeight: "600",
  },
});
