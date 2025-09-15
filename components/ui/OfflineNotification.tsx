import { scaleSize } from "@/theme";
import React from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";
import { useThemeColor } from "../../hooks/useThemeColor";

const { width } = Dimensions.get("window");

interface OfflineNotificationProps {
  showWhenOffline?: boolean;
  position?: "top" | "bottom";
  message?: string;
}

export const OfflineNotification: React.FC<OfflineNotificationProps> = ({
  showWhenOffline = true,
  position = "top",
  message = "You are offline. Some features may not be available.",
}) => {
  const { isOffline, isLoading } = useNetworkStatus();
  const [slideAnim] = React.useState(new Animated.Value(-100));

  const backgroundColor = useThemeColor(
    { light: "#f44336", dark: "#d32f2f" },
    "background"
  );

  const textColor = useThemeColor(
    { light: "#ffffff", dark: "#ffffff" },
    "text"
  );

  React.useEffect(() => {
    if (isOffline && showWhenOffline && !isLoading) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: position === "top" ? -100 : 100,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [isOffline, showWhenOffline, isLoading, slideAnim, position]);

  if (isLoading) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          transform: [{ translateY: slideAnim }],
          [position]: 0,
        },
      ]}
      pointerEvents={isOffline ? "auto" : "none"}
    >
      <View style={styles.content}>
        <View style={styles.indicator} />
        <Text style={[styles.text, { color: textColor }]}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: scaleSize(50),
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginRight: 8,
    opacity: 0.8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
});
