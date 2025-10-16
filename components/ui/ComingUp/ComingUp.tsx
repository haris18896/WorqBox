import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ** Theme
import { useTheme } from "@/theme";
import { createTypographyStyle } from "@/theme/fonts";
import {
  borderRadius,
  iconSize,
  shadow,
  spacing,
} from "@/theme/stylingConstants";

import { ComingUpProps } from "./ComingUp.d";

const ComingUp: React.FC<ComingUpProps> = ({
  title = "Coming Soon",
  subtitle = "We're working on something amazing!",
  icon = "rocket-outline",
  customIcon,
  estimatedDate,
  features = [],
  actionText,
  onActionPress,
  variant = "default",
  size = "medium",
  showProgress = false,
  progress = 0,
  style,
  titleStyle,
  subtitleStyle,
  actionStyle,
  actionTextStyle,
  children,
  animated = true,
}) => {
  const { palette } = useTheme();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animated) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }

    if (showProgress) {
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 1000,
        delay: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [
    animated,
    progress,
    showProgress,
    fadeAnim,
    slideAnim,
    scaleAnim,
    progressAnim,
  ]);

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          padding: spacing.lg,
          iconSize: iconSize.xl,
          titleSize: 16,
          subtitleSize: 12,
        };
      case "large":
        return {
          padding: spacing["2xl"],
          iconSize: iconSize["3xl"],
          titleSize: 24,
          subtitleSize: 16,
        };
      default: // medium
        return {
          padding: spacing.xl,
          iconSize: iconSize["2xl"],
          titleSize: 20,
          subtitleSize: 14,
        };
    }
  };

  const getVariantStyles = () => {
    const sizeStyles = getSizeStyles();

    switch (variant) {
      case "minimal":
        return {
          container: {
            backgroundColor: "transparent",
            borderRadius: 0,
            padding: spacing.md,
            shadowOpacity: 0,
            elevation: 0,
          },
          iconContainer: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: palette.surface.primary,
            marginBottom: spacing.md,
          },
        };
      case "detailed":
        return {
          container: {
            backgroundColor: palette.surface.secondary,
            borderRadius: borderRadius.xl,
            padding: sizeStyles.padding,
            ...shadow.md,
          },
          iconContainer: {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: palette.surface.primary,
            marginBottom: spacing.md,
          },
        };
      case "card":
        return {
          container: {
            backgroundColor: palette.surface.secondary,
            borderRadius: borderRadius.lg,
            padding: sizeStyles.padding,
            ...shadow.sm,
            borderWidth: 1,
            borderColor: palette.border.primary,
          },
          iconContainer: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: palette.surface.primary,
            marginBottom: spacing.md,
          },
        };
      default:
        return {
          container: {
            backgroundColor: palette.surface.secondary,
            borderRadius: borderRadius.lg,
            padding: sizeStyles.padding,
            ...shadow.sm,
          },
          iconContainer: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: palette.surface.primary,
            marginBottom: spacing.md,
          },
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      ...variantStyles.container,
      ...style,
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      ...variantStyles.iconContainer,
    },
    icon: {
      fontSize: sizeStyles.iconSize,
      color: palette.primary.main,
    },
    title: {
      fontWeight: "700",
      color: palette.text.primary,
      textAlign: "center",
      marginBottom: spacing.sm,
      ...createTypographyStyle("headline", "small"),
      fontSize: sizeStyles.titleSize,
      ...titleStyle,
    },
    subtitle: {
      color: palette.text.secondary,
      textAlign: "center",
      marginBottom: spacing.md,
      ...createTypographyStyle("body", "medium"),
      fontSize: sizeStyles.subtitleSize,
      lineHeight: sizeStyles.subtitleSize * 1.4,
      ...subtitleStyle,
    },
    estimatedDate: {
      fontSize: sizeStyles.subtitleSize - 2,
      color: palette.text.tertiary,
      textAlign: "center",
      marginBottom: spacing.md,
      fontStyle: "italic",
    },
    featuresContainer: {
      width: "100%",
      marginBottom: spacing.md,
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.xs,
    },
    featureIcon: {
      fontSize: iconSize.sm,
      color: palette.success.main,
      marginRight: spacing.sm,
    },
    featureText: {
      fontSize: sizeStyles.subtitleSize - 1,
      color: palette.text.secondary,
      flex: 1,
    },
    progressContainer: {
      width: "100%",
      marginBottom: spacing.md,
    },
    progressLabel: {
      fontSize: sizeStyles.subtitleSize - 1,
      color: palette.text.secondary,
      textAlign: "center",
      marginBottom: spacing.xs,
    },
    progressBar: {
      height: 6,
      backgroundColor: palette.surface.secondary,
      borderRadius: 3,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      backgroundColor: palette.primary.main,
      borderRadius: 3,
    },
    actionButton: {
      backgroundColor: palette.primary.main,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      marginTop: spacing.sm,
      ...shadow.xs,
      ...actionStyle,
    },
    actionText: {
      color: palette.text.inverse,
      fontSize: sizeStyles.subtitleSize,
      fontWeight: "600",
      ...actionTextStyle,
    },
    childrenContainer: {
      marginTop: spacing.md,
      alignItems: "center",
      width: "100%",
    },
  });

  const renderProgressBar = () => {
    if (!showProgress) return null;

    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>
          Progress: {Math.round(progress)}%
        </Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      </View>
    );
  };

  const renderFeatures = () => {
    if (features.length === 0) return null;

    return (
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" style={styles.featureIcon} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderContent = () => (
    <>
      <View style={styles.iconContainer}>
        {customIcon || <Ionicons name={icon as any} style={styles.icon} />}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {estimatedDate && (
        <Text style={styles.estimatedDate}>Expected: {estimatedDate}</Text>
      )}

      {renderFeatures()}
      {renderProgressBar()}

      {actionText && onActionPress && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onActionPress}
          activeOpacity={0.8}
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}

      {children && <View style={styles.childrenContainer}>{children}</View>}
    </>
  );

  const animatedStyle = {
    opacity: animated ? fadeAnim : 1,
    transform: [
      { translateY: animated ? slideAnim : 0 },
      { scale: animated ? scaleAnim : 1 },
    ],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderContent()}
    </Animated.View>
  );
};

export default ComingUp;
