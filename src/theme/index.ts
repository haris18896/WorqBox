export { ThemeProvider, useTheme, useThemeMode } from "./ThemeContext";
export type { ThemeContextType, ThemeProviderProps } from "./ThemeContext";

export {
  createColorPalette,
  darkPalette,
  getColorPalette,
  lightPalette,
  useSystemTheme,
} from "./Colors";
export type { ColorPalette, ThemeMode } from "./Colors";

export {
  createColorCombinations,
  createColorResolver,
  darkenColor,
  lightenColor,
  resolveColorPath,
  withOpacity,
} from "./colorUtils";
export type { ColorPath } from "./colorUtils";

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

export { createThemedStyles, createThemedStyleSheet } from "./styleHelpers";

export {
  createNavigationTheme,
  darkNavigationTheme,
  getNavigationTheme,
  lightNavigationTheme,
} from "./navigationTheme";

export type { Theme } from "@react-navigation/native";
