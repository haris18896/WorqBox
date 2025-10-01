import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ** Theme
import { useTheme } from "@/theme";
import { iconSize, spacing } from "@/theme/stylingConstants";
import { LoadingProps } from "./Loading.d";

const Loading: React.FC<LoadingProps> = ({
  visible,
  text,
  overlay = true,
  size = "medium",
  variant = "spinner",
  style,
  textStyle,
  children,
}) => {
  const { palette } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (variant === "pulse" && visible) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [visible, variant, pulseAnim]);

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          spinnerSize: "small" as const,
          iconSize: iconSize.md,
          textFontSize: 14,
        };
      case "large":
        return {
          spinnerSize: "large" as const,
          iconSize: iconSize["2xl"],
          textFontSize: 18,
        };
      default: // medium
        return {
          spinnerSize: "large" as const,
          iconSize: iconSize.lg,
          textFontSize: 16,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const styles = StyleSheet.create({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    container: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.surface.primary,
      borderRadius: 12,
      padding: spacing.xl,
      minWidth: 120,
      ...style,
    },
    spinner: {
      marginBottom: spacing.md,
    },
    dotsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.md,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: palette.primary.main,
      marginHorizontal: 4,
    },
    pulseContainer: {
      width: sizeStyles.iconSize,
      height: sizeStyles.iconSize,
      borderRadius: sizeStyles.iconSize / 2,
      backgroundColor: palette.primary.main,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.md,
    },
    skeletonContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.md,
    },
    skeletonLine: {
      height: 4,
      backgroundColor: palette.neutral.light,
      borderRadius: 2,
      marginVertical: 2,
    },
    text: {
      fontSize: sizeStyles.textFontSize,
      color: palette.text.primary,
      textAlign: "center",
      fontWeight: "500",
      ...textStyle,
    },
  });

  const renderSpinner = () => (
    <ActivityIndicator
      size={sizeStyles.spinnerSize}
      color={palette.primary.main}
      style={styles.spinner}
    />
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {[0, 1, 2].map((index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              opacity: pulseAnim.interpolate({
                inputRange: [1, 1.2],
                outputRange: [0.3, 1],
                extrapolate: "clamp",
              }),
            },
          ]}
        />
      ))}
    </View>
  );

  const renderPulse = () => (
    <Animated.View
      style={[
        styles.pulseContainer,
        {
          transform: [{ scale: pulseAnim }],
        },
      ]}
    />
  );

  const renderSkeleton = () => (
    <View style={styles.skeletonContainer}>
      <View style={[styles.skeletonLine, { width: 60 }]} />
      <View style={[styles.skeletonLine, { width: 40 }]} />
      <View style={[styles.skeletonLine, { width: 80 }]} />
    </View>
  );

  const renderLoadingIndicator = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "skeleton":
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  const loadingContent = (
    <View style={styles.container}>
      {renderLoadingIndicator()}
      {text && <Text style={styles.text}>{text}</Text>}
      {children}
    </View>
  );

  if (!visible) return null;

  if (overlay) {
    return (
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>{loadingContent}</View>
      </Modal>
    );
  }

  return loadingContent;
};

export default Loading;
