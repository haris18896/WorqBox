import { useTheme } from "@/theme";
import { spacing } from "@/theme/responsive";
import { ButtonProps } from "@/types";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const { palette } = useTheme();

  const getVariantStyles = (): ViewStyle => {
    const isDisabled = disabled || loading;

    switch (variant) {
      case "secondary":
        return {
          backgroundColor: isDisabled
            ? palette.neutral.light
            : palette.secondary.main,
          borderColor: "transparent",
          borderWidth: 0,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: isDisabled
            ? palette.neutral.light
            : palette.primary.main,
          borderWidth: 2,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderWidth: 0,
        };
      default: // primary
        return {
          backgroundColor: isDisabled
            ? palette.neutral.light
            : palette.primary.main,
          borderColor: "transparent",
          borderWidth: 0,
        };
    }
  };

  const getTextColor = () => {
    const isDisabled = disabled || loading;

    switch (variant) {
      case "outline":
        return isDisabled ? palette.neutral.light : palette.primary.main;
      case "ghost":
        return isDisabled ? palette.neutral.light : palette.primary.main;
      default:
        return palette.text.inverse;
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case "small":
        return {
          paddingVertical: 12,
          paddingHorizontal: spacing.md,
          minHeight: 44,
        };
      case "large":
        return {
          paddingVertical: 16,
          paddingHorizontal: spacing.lg,
          minHeight: 56,
        };
      default: // medium
        return {
          paddingVertical: 14,
          paddingHorizontal: spacing.lg,
          minHeight: 50,
        };
    }
  };

  const styles = StyleSheet.create({
    button: {
      ...getVariantStyles(),
      ...getSizeStyles(),
      borderRadius: 12, // More rounded like the design
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: variant === "primary" ? palette.primary.main : "transparent",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: variant === "primary" ? 0.15 : 0,
      shadowRadius: 4,
      elevation: variant === "primary" ? 2 : 0,
      width: fullWidth ? "100%" : undefined,
    },
    text: {
      fontSize: size === "small" ? 14 : size === "large" ? 18 : 16,
      fontWeight: "600",
      color: getTextColor(),
      textAlign: "center",
      ...textStyle,
    },
    iconContainer: {
      marginRight: leftIcon ? spacing.xs : 0,
      marginLeft: rightIcon ? spacing.xs : 0,
    },
    loadingContainer: {
      marginRight: spacing.xs,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          style={styles.loadingContainer}
        />
      )}

      {!loading && leftIcon && (
        <View style={styles.iconContainer}>{leftIcon}</View>
      )}

      <Text style={styles.text}>{title}</Text>

      {!loading && rightIcon && (
        <View style={styles.iconContainer}>{rightIcon}</View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
