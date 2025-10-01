import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";

// ** Theme
import { useTheme } from "@/theme";
import { iconSize, spacing } from "@/theme/stylingConstants";
import { EmptyProps } from "./Empty.d";

const Empty: React.FC<EmptyProps> = ({
  title = "No data found",
  subtitle,
  icon = "document-outline",
  actionText,
  onActionPress,
  style,
  titleStyle,
  subtitleStyle,
  actionStyle,
  children,
}) => {
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.xl * 2,
      ...style,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: palette.surface.secondary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.lg,
    },
    icon: {
      fontSize: iconSize["3xl"],
      color: palette.text.tertiary,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: palette.text.primary,
      textAlign: "center",
      marginBottom: spacing.sm,
      ...titleStyle,
    },
    subtitle: {
      fontSize: 14,
      color: palette.text.secondary,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: spacing.xl,
      ...subtitleStyle,
    },
    actionButton: {
      backgroundColor: palette.primary.main,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      ...actionStyle,
    },
    actionText: {
      color: palette.text.inverse,
      fontSize: 14,
      fontWeight: "600",
    },
    childrenContainer: {
      marginTop: spacing.lg,
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} style={styles.icon} />
      </View>

      <Text style={styles.title}>{title}</Text>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

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
    </View>
  );
};

export default Empty;
