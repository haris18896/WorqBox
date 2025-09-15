import React, { forwardRef, useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ** Third Party Components
import { Ionicons } from "@expo/vector-icons";

// ** Theme
import { useTheme } from "@/theme";
import {
  inputSize,
  scaleFontSize,
  scaleSize,
  spacing,
  WP,
} from "@/theme/responsive";
import { TextInputIconType, TextInputProps } from "@/types";

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
      size = "medium",
      formikError,
      formikTouched,
      nextInputRef,
      styleData,
      secureTextEntry,
      onFocus,
      onBlur,
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

    const handleFocus = (e: any) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    const getSizeStyles = () => {
      switch (size) {
        case "small":
          return {
            paddingVertical: scaleSize(8),
            paddingHorizontal: inputSize.sm.paddingHorizontal,
            minHeight: inputSize.sm.height,
          };
        case "large":
          return {
            paddingVertical: scaleSize(12),
            paddingHorizontal: inputSize.lg.paddingHorizontal,
            minHeight: inputSize.lg.height,
          };
        default: // medium
          return {
            paddingVertical: scaleSize(10),
            paddingHorizontal: inputSize.md.paddingHorizontal,
            minHeight: inputSize.md.height,
          };
      }
    };

    const getVariantStyles = () => {
      const baseStyles = {
        borderWidth: 1,
        borderRadius: WP(3),
        flexDirection: "row" as const,
        alignItems: "center" as const,
        backgroundColor: "transparent",
        ...getSizeStyles(),
      };

      switch (variant) {
        case "filled":
          return {
            ...baseStyles,
            backgroundColor: palette.surface.secondary,
            borderColor: hasError ? palette.error.main : palette.border.primary,
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
        fontSize:
          size === "small"
            ? inputSize.sm.fontSize
            : size === "large"
            ? inputSize.lg.fontSize
            : inputSize.md.fontSize,
        color: palette.text.primary,
        paddingVertical: 0,
        ...styleData?.inputStyles,
      },
      passwordToggle: {
        padding: spacing.xs,
        marginLeft: spacing.sm,
      },
      errorText: {
        fontSize: scaleFontSize(12),
        color: palette.error.main,
        marginTop: spacing.xs,
        paddingHorizontal: spacing.xs,
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
            onFocus={handleFocus}
            onBlur={handleBlur}
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
