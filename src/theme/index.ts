// Main theme exports
export { ThemeProvider, useTheme, useThemeMode } from "./ThemeContext";
export type { ThemeContextType, ThemeProviderProps } from "./ThemeContext";

// Color system exports
export {
  createColorPalette,
  darkPalette,
  getColorPalette,
  lightPalette,
  useSystemTheme,
} from "./Colors";
export type { ColorPalette, ThemeMode } from "./Colors";

// Color utilities exports
export {
  createColorCombinations,
  createColorResolver,
  darkenColor,
  lightenColor,
  resolveColorPath,
  withOpacity,
} from "./colorUtils";
export type { ColorPath } from "./colorUtils";

// Typography exports
export {
  createTypographyStyle,
  fontFamily,
  fontSize,
  fontWeight,
  getFontFamily,
  letterSpacing,
  lineHeight,
  typography,
} from "./fonts";
export type { TypographySize, TypographyVariant } from "./fonts";

// Responsive utilities exports
export {
  borderRadius,
  breakpoints,
  buttonSize,
  HP,
  iconSize,
  inputSize,
  isLargeDevice,
  isSmallDevice,
  isTablet,
  scaleFontSize,
  scaleSize,
  shadow,
  spacing,
  WP,
} from "./responsive";

// Style helpers exports
export { createThemedStyles, createThemedStyleSheet } from "./styleHelpers";

// Navigation theme exports
export {
  createNavigationTheme,
  darkNavigationTheme,
  getNavigationTheme,
  lightNavigationTheme,
} from "./navigationTheme";

// Re-export React Navigation Theme type
export type { Theme } from "@react-navigation/native";
