import { useTheme } from "@/theme";
import { spacing, WP } from "@/theme/responsive";
import { TextInputIconType, TextInputProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Icon mapping for different input types
const iconMap: Record<TextInputIconType, string> = {
  email: "mail-outline",
  password: "lock-closed-outline",
  user: "person-outline",
  phone: "call-outline",
  search: "search-outline",
  calendar: "calendar-outline",
  location: "location-outline",
};

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      title,
      leftIcon,
      variant = "outlined",
      formikError,
      formikTouched,
      nextInputRef,
      styleData,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const { palette } = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = leftIcon === "password" || secureTextEntry;
    const showError = formikTouched && formikError;
    const hasError = Boolean(showError);

    const handleSubmitEditing = () => {
      if (nextInputRef?.current) {
        nextInputRef.current.focus();
      } else {
        // If no next input, blur current input
        (ref as React.RefObject<RNTextInput>)?.current?.blur();
      }
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const getVariantStyles = () => {
      const baseStyles = {
        borderWidth: 1,
        borderRadius: WP(3),
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md, // Increased padding for better height
        flexDirection: "row" as const,
        alignItems: "center" as const,
        backgroundColor: "#FFFFFF", // Pure white background
        minHeight: WP(4),
      };

      switch (variant) {
        case "filled":
          return {
            ...baseStyles,
            backgroundColor: palette.surface.secondary,
            borderColor: hasError ? palette.error.main : "transparent",
          };
        case "underlined":
          return {
            ...baseStyles,
            borderWidth: 0,
            borderBottomWidth: 2,
            borderRadius: 0,
            backgroundColor: "transparent",
            borderBottomColor: hasError
              ? palette.error.main
              : isFocused
              ? palette.primary.main
              : palette.border.primary,
          };
        default: // outlined
          return {
            ...baseStyles,
            borderColor: hasError
              ? "#EF4444"
              : isFocused
              ? palette.primary.main
              : "#E5E7EB", // Light gray border
          };
      }
    };

    const styles = StyleSheet.create({
      container: {
        marginBottom: spacing.md,
        ...styleData?.containerStyles,
      },
      label: {
        fontSize: 14,
        fontWeight: "500",
        color: palette.text.secondary,
        marginBottom: spacing.xs,
        ...styleData?.labelStyles,
      },
      inputContainer: {
        ...getVariantStyles(),
      },
      iconContainer: {
        marginRight: spacing.sm,
        width: 20,
        alignItems: "center",
      },
      textInput: {
        flex: 1,
        fontSize: 16,
        color: palette.text.primary,
        paddingVertical: 0, // Remove default padding
        ...styleData?.inputStyles,
      },
      passwordToggle: {
        padding: spacing.xs,
        marginLeft: spacing.sm,
      },
      errorText: {
        fontSize: 12,
        color: palette.error.main,
        marginTop: spacing.xs,
        ...styleData?.errorStyles,
      },
    });

    return (
      <View style={styles.container}>
        {title && <Text style={styles.label}>{title}</Text>}

        <View style={styles.inputContainer}>
          {leftIcon && (
            <View style={styles.iconContainer}>
              <Ionicons
                name={
                  (iconMap[leftIcon as TextInputIconType] as any) || leftIcon
                }
                size={20}
                color={isFocused ? palette.primary.main : "#6B7280"}
              />
            </View>
          )}

          <RNTextInput
            ref={ref}
            style={styles.textInput}
            secureTextEntry={isPassword && !isPasswordVisible}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleSubmitEditing}
            placeholderTextColor={palette.text.tertiary}
            {...props}
          />

          {isPassword && (
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={togglePasswordVisibility}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          )}
        </View>

        {showError && <Text style={styles.errorText}>{formikError}</Text>}
      </View>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
