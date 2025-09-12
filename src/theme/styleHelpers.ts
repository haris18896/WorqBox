import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ColorPalette } from "./Colors";
import { createColorCombinations } from "./colorUtils";
import { typography } from "./fonts";
import {
  borderRadius,
  buttonSize,
  inputSize,
  shadow,
  spacing,
} from "./responsive";

// Themed style creators
export const createThemedStyles = (palette: ColorPalette) => {
  const colors = createColorCombinations(palette);

  return {
    // Container styles
    container: {
      screen: {
        flex: 1,
        backgroundColor: colors.background.primary,
      } as ViewStyle,

      center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background.primary,
      } as ViewStyle,

      row: {
        flexDirection: "row",
        alignItems: "center",
      } as ViewStyle,

      column: {
        flexDirection: "column",
      } as ViewStyle,

      card: {
        backgroundColor: colors.surface.primary,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        ...shadow.sm,
      } as ViewStyle,

      elevated: {
        backgroundColor: colors.surface.elevated,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        ...shadow.md,
      } as ViewStyle,
    },

    // Text styles
    text: {
      display: {
        large: {
          ...typography.display.large,
          color: colors.text.primary,
        } as TextStyle,

        medium: {
          ...typography.display.medium,
          color: colors.text.primary,
        } as TextStyle,

        small: {
          ...typography.display.small,
          color: colors.text.primary,
        } as TextStyle,
      },

      headline: {
        large: {
          ...typography.headline.large,
          color: colors.text.primary,
        } as TextStyle,

        medium: {
          ...typography.headline.medium,
          color: colors.text.primary,
        } as TextStyle,

        small: {
          ...typography.headline.small,
          color: colors.text.primary,
        } as TextStyle,
      },

      title: {
        large: {
          ...typography.title.large,
          color: colors.text.primary,
        } as TextStyle,

        medium: {
          ...typography.title.medium,
          color: colors.text.primary,
        } as TextStyle,

        small: {
          ...typography.title.small,
          color: colors.text.primary,
        } as TextStyle,
      },

      body: {
        large: {
          ...typography.body.large,
          color: colors.text.primary,
        } as TextStyle,

        medium: {
          ...typography.body.medium,
          color: colors.text.primary,
        } as TextStyle,

        small: {
          ...typography.body.small,
          color: colors.text.primary,
        } as TextStyle,
      },

      label: {
        large: {
          ...typography.label.large,
          color: colors.text.secondary,
        } as TextStyle,

        medium: {
          ...typography.label.medium,
          color: colors.text.secondary,
        } as TextStyle,

        small: {
          ...typography.label.small,
          color: colors.text.secondary,
        } as TextStyle,
      },

      caption: {
        large: {
          ...typography.caption.large,
          color: colors.text.tertiary,
        } as TextStyle,

        medium: {
          ...typography.caption.medium,
          color: colors.text.tertiary,
        } as TextStyle,

        small: {
          ...typography.caption.small,
          color: colors.text.tertiary,
        } as TextStyle,
      },

      // Utility text styles
      primary: {
        color: colors.primary.main,
      } as TextStyle,

      secondary: {
        color: colors.secondary.main,
      } as TextStyle,

      success: {
        color: colors.success.main,
      } as TextStyle,

      warning: {
        color: colors.warning.main,
      } as TextStyle,

      error: {
        color: colors.error.main,
      } as TextStyle,

      disabled: {
        color: colors.text.disabled,
      } as TextStyle,

      inverse: {
        color: colors.text.inverse,
      } as TextStyle,
    },

    // Button styles
    button: {
      primary: {
        backgroundColor: colors.primary.main,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        alignItems: "center",
        justifyContent: "center",
        ...shadow.xs,
      } as ViewStyle,

      secondary: {
        backgroundColor: colors.secondary.main,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        alignItems: "center",
        justifyContent: "center",
        ...shadow.xs,
      } as ViewStyle,

      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        alignItems: "center",
        justifyContent: "center",
      } as ViewStyle,

      ghost: {
        backgroundColor: "transparent",
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        alignItems: "center",
        justifyContent: "center",
      } as ViewStyle,

      // Button sizes
      xs: {
        ...buttonSize.xs,
        borderRadius: borderRadius.sm,
      } as ViewStyle,

      sm: {
        ...buttonSize.sm,
        borderRadius: borderRadius.sm,
      } as ViewStyle,

      md: {
        ...buttonSize.md,
        borderRadius: borderRadius.md,
      } as ViewStyle,

      lg: {
        ...buttonSize.lg,
        borderRadius: borderRadius.md,
      } as ViewStyle,

      xl: {
        ...buttonSize.xl,
        borderRadius: borderRadius.lg,
      } as ViewStyle,

      // Button text styles
      text: {
        primary: {
          ...typography.label.medium,
          color: colors.text.inverse,
          fontWeight: "600",
        } as TextStyle,

        secondary: {
          ...typography.label.medium,
          color: colors.text.inverse,
          fontWeight: "600",
        } as TextStyle,

        outline: {
          ...typography.label.medium,
          color: colors.text.primary,
          fontWeight: "600",
        } as TextStyle,

        ghost: {
          ...typography.label.medium,
          color: colors.primary.main,
          fontWeight: "600",
        } as TextStyle,
      },
    },

    // Input styles
    input: {
      container: {
        marginBottom: spacing.md,
      } as ViewStyle,

      field: {
        backgroundColor: colors.surface.secondary,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
      } as ViewStyle,

      focused: {
        borderColor: colors.border.focus,
        ...shadow.xs,
      } as ViewStyle,

      error: {
        borderColor: colors.border.error,
      } as ViewStyle,

      disabled: {
        backgroundColor: colors.surface.tertiary,
        borderColor: colors.border.secondary,
        opacity: 0.6,
      } as ViewStyle,

      // Input sizes
      xs: {
        ...inputSize.xs,
        borderRadius: borderRadius.sm,
      } as ViewStyle,

      sm: {
        ...inputSize.sm,
        borderRadius: borderRadius.sm,
      } as ViewStyle,

      md: {
        ...inputSize.md,
        borderRadius: borderRadius.md,
      } as ViewStyle,

      lg: {
        ...inputSize.lg,
        borderRadius: borderRadius.md,
      } as ViewStyle,

      // Input text styles
      text: {
        ...typography.body.medium,
        color: colors.text.primary,
      } as TextStyle,

      placeholder: {
        ...typography.body.medium,
        color: colors.text.placeholder,
      } as TextStyle,

      label: {
        ...typography.label.medium,
        color: colors.text.secondary,
        marginBottom: spacing.xs,
      } as TextStyle,

      errorText: {
        ...typography.caption.medium,
        color: colors.error.main,
        marginTop: spacing.xs,
      } as TextStyle,

      // TextInput specific styles (combining ViewStyle and TextStyle)
      textInput: {
        backgroundColor: colors.surface.secondary,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        ...typography.body.medium,
        color: colors.text.primary,
      } as any, // Using any to allow mixing ViewStyle and TextStyle

      textInputFocused: {
        borderColor: colors.border.focus,
        ...shadow.xs,
      } as ViewStyle,

      textInputError: {
        borderColor: colors.border.error,
      } as ViewStyle,
    },

    // Card styles
    card: {
      container: {
        backgroundColor: colors.surface.primary,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        ...shadow.sm,
      } as ViewStyle,

      elevated: {
        backgroundColor: colors.surface.elevated,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        ...shadow.md,
      } as ViewStyle,

      outlined: {
        backgroundColor: colors.surface.primary,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
      } as ViewStyle,

      header: {
        marginBottom: spacing.md,
      } as ViewStyle,

      content: {
        marginBottom: spacing.sm,
      } as ViewStyle,

      footer: {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border.primary,
      } as ViewStyle,
    },

    // Divider styles
    divider: {
      horizontal: {
        height: 1,
        backgroundColor: colors.border.primary,
        marginVertical: spacing.md,
      } as ViewStyle,

      vertical: {
        width: 1,
        backgroundColor: colors.border.primary,
        marginHorizontal: spacing.md,
      } as ViewStyle,
    },

    // Spacing utilities
    spacing: {
      xs: { margin: spacing.xs } as ViewStyle,
      sm: { margin: spacing.sm } as ViewStyle,
      md: { margin: spacing.md } as ViewStyle,
      lg: { margin: spacing.lg } as ViewStyle,
      xl: { margin: spacing.xl } as ViewStyle,

      paddingXs: { padding: spacing.xs } as ViewStyle,
      paddingSm: { padding: spacing.sm } as ViewStyle,
      paddingMd: { padding: spacing.md } as ViewStyle,
      paddingLg: { padding: spacing.lg } as ViewStyle,
      paddingXl: { padding: spacing.xl } as ViewStyle,
    },
  };
};

// Helper function to create stylesheet with theme
export const createThemedStyleSheet = (
  palette: ColorPalette,
  styles: (colors: ReturnType<typeof createColorCombinations>) => any
) => {
  const colors = createColorCombinations(palette);
  return StyleSheet.create(styles(colors));
};
