import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";

// ** Theme
import { useTheme } from "@/theme";
import { iconSize, spacing } from "@/theme/stylingConstants";
import { BottomBarProps } from "../Navigation.d";

const BottomBar: React.FC<BottomBarProps> = ({
  activeTab,
  onTabPress,
  tabs,
  style,
}) => {
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: palette.surface.primary,
      borderTopWidth: 1,
      borderTopColor: palette.border.primary,
      paddingBottom: spacing.md,
      paddingTop: spacing.sm,
      paddingHorizontal: spacing.sm,
      ...style,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
    },
    tabDisabled: {
      opacity: 0.5,
    },
    iconContainer: {
      position: "relative",
      marginBottom: spacing.xs,
    },
    icon: {
      fontSize: iconSize.lg,
    },
    badge: {
      position: "absolute",
      top: -8,
      right: -8,
      backgroundColor: palette.error.main,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.xs,
    },
    badgeText: {
      color: palette.text.inverse,
      fontSize: 12,
      fontWeight: "600",
    },
    label: {
      fontSize: 12,
      fontWeight: "500",
      textAlign: "center",
    },
    activeLabel: {
      color: palette.primary.main,
    },
    inactiveLabel: {
      color: palette.text.secondary,
    },
  });

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isDisabled = tab.disabled;

        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, isDisabled && styles.tabDisabled]}
            onPress={() => !isDisabled && onTabPress?.(tab.id)}
            activeOpacity={0.7}
            disabled={isDisabled}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={(isActive ? tab.activeIcon || tab.icon : tab.icon) as any}
                size={iconSize.lg}
                color={isActive ? palette.primary.main : palette.text.secondary}
                style={styles.icon}
              />
              {tab.badge && tab.badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.label,
                isActive ? styles.activeLabel : styles.inactiveLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomBar;
