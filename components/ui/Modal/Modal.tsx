import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";

// ** Theme
import { useTheme } from "@/theme";
import { iconSize, spacing } from "@/theme/stylingConstants";
import { ModalProps } from "./Modal.d";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const CustomModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  title,
  subtitle,
  height = "auto",
  maxHeight = "80%",
  width = "90%",
  showCloseButton = true,
  closeOnBackdrop = true,
  style,
  headerStyle,
  contentStyle,
  titleStyle,
  subtitleStyle,
  variant = "default",
  animationType = "fade",
}) => {
  const { palette } = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      if (animationType === "slide") {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }
    } else {
      if (animationType === "slide") {
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: SCREEN_HEIGHT,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  }, [visible, scaleAnim, opacityAnim, slideAnim, animationType]);

  const getModalDimensions = () => {
    const modalWidth =
      typeof width === "string"
        ? (SCREEN_WIDTH * parseFloat(width.replace("%", ""))) / 100
        : width;

    const modalHeight =
      typeof height === "string" && height !== "auto"
        ? (SCREEN_HEIGHT * parseFloat(height.replace("%", ""))) / 100
        : height;

    const modalMaxHeight =
      typeof maxHeight === "string"
        ? (SCREEN_HEIGHT * parseFloat(maxHeight.replace("%", ""))) / 100
        : maxHeight;

    return { modalWidth, modalHeight, modalMaxHeight };
  };

  const { modalWidth, modalHeight, modalMaxHeight } = getModalDimensions();

  const getVariantStyles = () => {
    switch (variant) {
      case "fullscreen":
        return {
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          borderRadius: 0,
          justifyContent: "flex-start" as const,
        };
      case "bottom":
        return {
          width: SCREEN_WIDTH,
          height: modalHeight || SCREEN_HEIGHT * 0.5,
          borderRadius: 20,
          justifyContent: "flex-end" as const,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        };
      case "centered":
        return {
          width: modalWidth,
          height: modalHeight || undefined,
          maxHeight: modalMaxHeight,
          borderRadius: 16,
          justifyContent: "center" as const,
        };
      default:
        return {
          width: modalWidth,
          height: modalHeight || undefined,
          maxHeight: modalMaxHeight,
          borderRadius: 16,
          justifyContent: "center" as const,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: variantStyles.justifyContent,
      alignItems: "center",
    },
    container: {
      backgroundColor: palette.surface.primary,
      ...(variantStyles as any),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: palette.border.primary,
      ...(headerStyle as any),
    },
    headerContent: {
      flex: 1,
      marginRight: spacing.md,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      ...(titleStyle as any),
    },
    subtitle: {
      fontSize: 14,
      color: palette.text.secondary,
      marginTop: spacing.xs,
      ...(subtitleStyle as any),
    },
    closeButton: {
      padding: spacing.sm,
      borderRadius: 8,
    },
    closeIcon: {
      fontSize: iconSize.lg,
      color: palette.text.secondary,
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      ...(contentStyle as any),
    },
  });

  const handleOverlayPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  const handleContainerPress = () => {
    // Prevent closing when tapping on the modal content
  };

  if (!visible) return null;

  const getAnimationStyle = () => {
    if (animationType === "slide") {
      return {
        transform: [{ translateY: slideAnim }],
        opacity: opacityAnim,
      };
    } else {
      return {
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      };
    }
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleOverlayPress}
        />

        <Animated.View
          style={[styles.container, style, getAnimationStyle() as any]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={handleContainerPress}
          />

          {(title || subtitle) && (
            <View style={styles.header}>
              <View style={styles.headerContent}>
                {title && <Text style={styles.title}>{title}</Text>}
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              </View>
              {showCloseButton && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" style={styles.closeIcon} />
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomModal;
