import { Platform } from "react-native";

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
  extraBold: "Poppins-ExtraBold",
  light: "Poppins-Light",
  extraLight: "Poppins-ExtraLight",
  thin: "Poppins-Thin",
};

export const fontWeight = {
  thin: "100",
  extraLight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
  extraBold: "800",
  black: "900",
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128,
};

export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

export const letterSpacing = {
  tighter: -0.05,
  tight: -0.025,
  normal: 0,
  wide: 0.025,
  wider: 0.05,
  widest: 0.1,
};

export const typography = {
  display: {
    large: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize["6xl"],
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
    medium: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize["5xl"],
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
    small: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize["4xl"],
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
  },

  // Headline styles
  headline: {
    large: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize["3xl"],
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
    medium: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize["2xl"],
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
    small: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.xl,
      lineHeight: lineHeight.tight,
      letterSpacing: letterSpacing.tight,
    },
  },

  // Title styles
  title: {
    large: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.lg,
      lineHeight: lineHeight.snug,
      letterSpacing: letterSpacing.normal,
    },
    medium: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.base,
      lineHeight: lineHeight.snug,
      letterSpacing: letterSpacing.normal,
    },
    small: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.snug,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Body styles
  body: {
    large: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.lg,
      lineHeight: lineHeight.relaxed,
      letterSpacing: letterSpacing.normal,
    },
    medium: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.base,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    small: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
  },

  // Label styles
  label: {
    large: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.sm,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.wide,
    },
    medium: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.wide,
    },
    small: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.wider,
    },
  },

  // Caption styles
  caption: {
    large: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.normal,
    },
    medium: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.wide,
    },
    small: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.normal,
      letterSpacing: letterSpacing.wider,
    },
  },
};

// Helper function to get font family with fallback
export const getFontFamily = (weight: keyof typeof fontFamily): string => {
  const font = fontFamily[weight];

  if (Platform.OS === "ios") {
    return font;
  }

  // Android fallback
  switch (weight) {
    case "thin":
    case "extraLight":
    case "light":
      return "Poppins-Light";
    case "regular":
      return "Poppins-Regular";
    case "medium":
      return "Poppins-Medium";
    case "semiBold":
      return "Poppins-SemiBold";
    case "bold":
    case "extraBold":
      return "Poppins-Bold";
    default:
      return "Poppins-Regular";
  }
};

// Typography utility function
export const createTypographyStyle = (
  variant: keyof typeof typography,
  size: "large" | "medium" | "small" = "medium"
) => {
  return typography[variant][size];
};

export type TypographyVariant = keyof typeof typography;
export type TypographySize = "large" | "medium" | "small";
