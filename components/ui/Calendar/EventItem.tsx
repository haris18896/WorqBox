import { spacing, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EventItemProps } from "./calendar.d";

export const EventItem: React.FC<EventItemProps> = ({
  event,
  onPress,
  onLongPress,
  style,
  compact = false,
}) => {
  const { palette } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: compact ? spacing.xs : spacing.sm,
      marginVertical: compact ? 2 : spacing.xs,
      borderRadius: compact ? 4 : 8,
      backgroundColor: event.backgroundColor || palette.primary.main + "20",
      borderLeftWidth: 3,
      borderLeftColor: event.color || palette.primary.main,
    },
    icon: {
      marginRight: spacing.sm,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: compact ? 12 : 14,
      fontWeight: "600",
      color: event.textColor || palette.text.primary,
      marginBottom: 2,
    },
    time: {
      fontSize: compact ? 10 : 12,
      color: event.textColor || palette.text.secondary,
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
    },
    moreButton: {
      backgroundColor: palette.primary.main,
      borderRadius: 12,
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      minWidth: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    moreText: {
      color: palette.text.inverse,
      fontSize: 10,
      fontWeight: "700",
    },
  });

  const formatTime = (date: Date) => {
    return moment(date).format("hh:mm a");
  };

  const handlePress = () => {
    onPress?.(event);
  };

  const handleLongPress = () => {
    onLongPress?.(event);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name="calendar-outline"
        size={compact ? 14 : 16}
        color={event.color || palette.primary.main}
        style={styles.icon}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.time}>
          {formatTime(event.start)} - {formatTime(event.end)}
        </Text>
      </View>
      {event.children && (
        <View style={styles.actions}>
          <Text style={styles.moreText}>+</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
