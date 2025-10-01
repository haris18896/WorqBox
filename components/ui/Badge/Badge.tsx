import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

// ** Theme
import { useTheme } from "@/theme";
import { badgeSize } from "@/theme/stylingConstants";
import { BadgeProps } from "./Badge.d";

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "medium",
  style,
  textStyle,
}) => {
  const { palette } = useTheme();

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: palette.secondary.main,
        };
      case "success":
        return {
          backgroundColor: palette.success.main,
        };
      case "warning":
        return {
          backgroundColor: palette.warning.main,
        };
      case "error":
        return {
          backgroundColor: palette.error.main,
        };
      case "info":
        return {
          backgroundColor: palette.info.main,
        };
      case "neutral":
        return {
          backgroundColor: palette.neutral.main,
        };
      default: // primary
        return {
          backgroundColor: palette.primary.main,
        };
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case "secondary":
      case "success":
      case "warning":
      case "error":
      case "info":
      case "primary":
        return palette.text.inverse;
      case "neutral":
        return palette.text.primary;
      default:
        return palette.text.inverse;
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case "small":
        return {
          paddingHorizontal: badgeSize.sm.paddingHorizontal,
          paddingVertical: badgeSize.sm.paddingVertical,
          borderRadius: badgeSize.sm.borderRadius,
        };
      case "large":
        return {
          paddingHorizontal: badgeSize.lg.paddingHorizontal,
          paddingVertical: badgeSize.lg.paddingVertical,
          borderRadius: badgeSize.lg.borderRadius,
        };
      default: // medium
        return {
          paddingHorizontal: badgeSize.md.paddingHorizontal,
          paddingVertical: badgeSize.md.paddingVertical,
          borderRadius: badgeSize.md.borderRadius,
        };
    }
  };

  const getTextSizeStyles = (): TextStyle => {
    switch (size) {
      case "small":
        return {
          fontSize: badgeSize.sm.fontSize,
        };
      case "large":
        return {
          fontSize: badgeSize.lg.fontSize,
        };
      default: // medium
        return {
          fontSize: badgeSize.md.fontSize,
        };
    }
  };

  const styles = StyleSheet.create({
    container: {
      ...getVariantStyles(),
      ...getSizeStyles(),
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
      ...style,
    },
    text: {
      color: getTextColor(),
      fontWeight: "600",
      ...getTextSizeStyles(),
      ...textStyle,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default Badge;
