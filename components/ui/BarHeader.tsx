import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";

// ** Theme
import { useTheme } from "@/theme";
import { iconSize, spacing } from "@/theme/stylingConstants";
import { BarHeaderProps } from "@/types";

const BarHeader: React.FC<BarHeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBackButton = false,
  onBackPress,
  style,
  titleStyle,
  subtitleStyle,
  variant = "default",
}) => {
  const { palette } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "large":
        return {
          paddingVertical: spacing.lg,
          titleFontSize: 24,
          subtitleFontSize: 16,
        };
      case "minimal":
        return {
          paddingVertical: spacing.sm,
          titleFontSize: 16,
          subtitleFontSize: 14,
        };
      case "search":
        return {
          paddingVertical: spacing.md,
          titleFontSize: 18,
          subtitleFontSize: 14,
        };
      default:
        return {
          paddingVertical: spacing.md,
          titleFontSize: 20,
          subtitleFontSize: 14,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: palette.surface.primary,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: palette.border.primary,
      ...variantStyles,
      ...style,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
      minWidth: 40,
    },
    centerSection: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: spacing.md,
    },
    rightSection: {
      flexDirection: "row",
      alignItems: "center",
      minWidth: 40,
      justifyContent: "flex-end",
    },
    iconButton: {
      padding: spacing.sm,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      fontSize: iconSize.lg,
      color: palette.text.primary,
    },
    title: {
      fontSize: variantStyles.titleFontSize,
      fontWeight: "600",
      color: palette.text.primary,
      textAlign: "center",
      ...titleStyle,
    },
    subtitle: {
      fontSize: variantStyles.subtitleFontSize,
      color: palette.text.secondary,
      textAlign: "center",
      marginTop: spacing.xs,
      ...subtitleStyle,
    },
  });

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    }
  };

  const handleRightPress = () => {
    if (onRightPress) {
      onRightPress();
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" style={styles.icon} />
          </TouchableOpacity>
        )}
        {leftIcon && !showBackButton && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleLeftPress}
            activeOpacity={0.7}
          >
            <Ionicons name={leftIcon as any} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center Section */}
      <View style={styles.centerSection}>
        {title && <Text style={styles.title}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {rightIcon && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleRightPress}
            activeOpacity={0.7}
          >
            <Ionicons name={rightIcon as any} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BarHeader;
