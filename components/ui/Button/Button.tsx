import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// ** Theme
import { useTheme } from "@/theme";
import { scaleSize } from "@/theme/responsive";
import { buttonSize, spacing } from "@/theme/stylingConstants";
import { ButtonProps } from "./Button.d";

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
      case "error":
        return {
          backgroundColor: isDisabled
            ? palette.neutral.light
            : palette.error.main,
          borderColor: "transparent",
          borderWidth: 0,
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
          paddingVertical: scaleSize(10),
          paddingHorizontal: spacing.md,
          minHeight: buttonSize.sm.height,
        };
      case "large":
        return {
          paddingVertical: scaleSize(15),
          paddingHorizontal: spacing.md,
          minHeight: buttonSize.lg.height,
        };
      default: // medium
        return {
          paddingVertical: scaleSize(12),
          paddingHorizontal: spacing.md,
          minHeight: buttonSize.md.height,
        };
    }
  };

  const styles = StyleSheet.create({
    button: {
      ...getVariantStyles(),
      ...getSizeStyles(),
      borderRadius: 12,
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
