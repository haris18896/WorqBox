import React, { forwardRef, useCallback, useState } from "react";
import {
  ActivityIndicator,
  Platform,
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
import { scaleFontSize, scaleSize, WP } from "@/theme/responsive";
import { inputSize, spacing } from "@/theme/stylingConstants";
import { TextInputIconType, TextInputProps } from "./TextInput.d";

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
      disabled = false,
      formikError,
      formikTouched,
      nextInputRef,
      styleData,
      secureTextEntry,
      onFocus,
      onBlur,
      loading = false,
      validationState = null,
      validationError,
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
    const showValidationError = Boolean(validationError);

    const handleSubmitEditing = () => {
      if (nextInputRef?.current) {
        nextInputRef.current.focus();
      } else {
        (ref as React.RefObject<RNTextInput>)?.current?.blur();
      }
    };

    const handleFocus = useCallback(
      (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: any) => {
        if (Platform.OS === "web") {
          setTimeout(() => {
            setIsFocused(false);
            onBlur?.(e);
          }, 100);
        } else {
          setIsFocused(false);
          onBlur?.(e);
        }
      },
      [onBlur]
    );

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);

      if (Platform.OS === "web") {
        setTimeout(() => {
          const textInputElement = (ref as React.RefObject<RNTextInput>)
            ?.current;
          if (textInputElement) {
            textInputElement.focus();
          }
        }, 10);
      }
    };

    const handleContainerPress = () => {
      if (Platform.OS === "web" && !disabled) {
        const textInputElement = (ref as React.RefObject<RNTextInput>)?.current;
        if (textInputElement) {
          textInputElement.focus();
        }
      }
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
        opacity: disabled ? 0.6 : 1,
        ...getSizeStyles(),
      };

      // Determine border color based on validation state, error state, or focus state
      const getBorderColor = () => {
        if (validationState === "error" || hasError) {
          return palette.error.main;
        }
        if (validationState === "success") {
          return palette.success.main || "#10B981"; // Success green
        }
        if (isFocused) {
          return palette.primary.main;
        }
        return palette.border.primary;
      };

      if (disabled) {
        return {
          ...baseStyles,
          backgroundColor: palette.surface.primary,
          borderColor: palette.border.primary,
        };
      }

      switch (variant) {
        case "filled":
          return {
            ...baseStyles,
            backgroundColor: palette.background.primary,
            borderColor: getBorderColor(),
          };
        case "underlined":
          return {
            ...baseStyles,
            borderWidth: 0,
            borderBottomWidth: 2,
            borderRadius: 0,
            backgroundColor: "transparent",
            borderBottomColor: getBorderColor(),
          };
        default: // outlined
          return {
            ...baseStyles,
            borderColor: getBorderColor(),
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
        color: disabled ? palette.text.tertiary : palette.text.secondary,
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
        color: disabled ? palette.text.tertiary : palette.text.secondary,
        paddingVertical: 0,
        ...(Platform.OS === "web" && {
          outline: "none",
          border: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
        }),
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
      validationErrorText: {
        fontSize: scaleFontSize(12),
        color: palette.error.main,
        marginTop: spacing.xs,
        paddingHorizontal: spacing.xs,
        ...styleData?.errorStyles,
      },
      loadingIndicator: {
        marginRight: spacing.sm,
      },
    });

    return (
      <View style={styles.container}>
        {title && <Text style={styles.label}>{title}</Text>}

        <TouchableOpacity
          style={styles.inputContainer}
          onPress={handleContainerPress}
          activeOpacity={1}
          disabled={disabled}
        >
          {leftIcon && (
            <View style={styles.iconContainer}>
              <Ionicons
                name={
                  (iconMap[leftIcon as TextInputIconType] as any) || leftIcon
                }
                size={20}
                color={
                  disabled
                    ? palette.text.tertiary
                    : isFocused
                    ? palette.primary.main
                    : "#6B7280"
                }
              />
            </View>
          )}
          {loading && (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size="small"
              color={palette.primary.main}
            />
          )}

          <RNTextInput
            ref={ref}
            style={styles.textInput}
            secureTextEntry={isPassword && !isPasswordVisible}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={handleSubmitEditing}
            placeholderTextColor={palette.text.tertiary}
            editable={!disabled}
            {...props}
          />

          {isPassword && (
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={disabled ? undefined : togglePasswordVisibility}
              activeOpacity={disabled ? 1 : 0.7}
              disabled={disabled}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={
                  disabled
                    ? palette.text.tertiary
                    : isFocused
                    ? palette.primary.main
                    : "#6B7280"
                }
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        {showError && <Text style={styles.errorText}>{formikError}</Text>}
        {showValidationError && (
          <Text style={styles.validationErrorText}>{validationError}</Text>
        )}
      </View>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
