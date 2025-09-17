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
import { BottomSheetProps } from "@/types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  title,
  height = "50%",
  maxHeight = "90%",
  enablePanDownToClose = true,
  style,
  headerStyle,
  contentStyle,
  showHandle = true,
  showHeader = true,
  variant = "default",
}) => {
  const { palette } = useTheme();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity]);

  const getSheetHeight = () => {
    if (typeof height === "string") {
      const percentage = parseFloat(height.replace("%", ""));
      return (SCREEN_HEIGHT * percentage) / 100;
    }
    return height;
  };

  const getMaxHeight = () => {
    if (typeof maxHeight === "string") {
      const percentage = parseFloat(maxHeight.replace("%", ""));
      return (SCREEN_HEIGHT * percentage) / 100;
    }
    return maxHeight;
  };

  const sheetHeight = getSheetHeight();
  const maxSheetHeight = getMaxHeight();

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    container: {
      backgroundColor: palette.surface.primary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: maxSheetHeight,
      minHeight: sheetHeight,
      ...style,
    },
    handle: {
      width: 40,
      height: 4,
      backgroundColor: palette.border.primary,
      borderRadius: 2,
      alignSelf: "center",
      marginTop: spacing.sm,
      marginBottom: spacing.sm,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: palette.border.primary,
      ...headerStyle,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      flex: 1,
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
      ...contentStyle,
    },
  });

  const handleSheetPress = () => {
    // Prevent closing when tapping on the sheet content
  };

  const handleOverlayPress = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleOverlayPress}
        />

        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY }],
              opacity,
            },
          ]}
        >
          {showHandle && <View style={styles.handle} />}

          {showHeader && title && (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{title}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Ionicons name="close" style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.content}
            activeOpacity={1}
            onPress={handleSheetPress}
          >
            {children}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheet;
