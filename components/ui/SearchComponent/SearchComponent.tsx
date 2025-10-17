import { useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SearchComponentProps } from "./SearchComponent.d";

export default function SearchComponent({
  placeholder = "Search...",
  value,
  onChangeText,
  onClear,
  style,
  containerStyle,
}: SearchComponentProps) {
  const { palette } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: palette.background.secondary,
          borderColor: palette.border.primary,
        },
        containerStyle,
      ]}
    >
      <Ionicons
        name="search-outline"
        size={20}
        style={[styles.searchIcon, { color: palette.text.tertiary }]}
      />
      <TextInput
        style={[styles.searchInput, { color: palette.text.primary }, style]}
        placeholder={placeholder}
        placeholderTextColor={palette.text.tertiary}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
      {value && value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            onChangeText("");
            onClear?.();
          }}
        >
          <Ionicons
            name="close-circle"
            size={20}
            style={[styles.clearIcon, { color: palette.text.tertiary }]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  clearIcon: {},
});
