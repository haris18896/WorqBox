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
  breakpoints,
  HP,
  isLargeDevice,
  isSmallDevice,
  isTablet,
  scaleFontSize,
  scaleSize,
  WP,
} from "./responsive";

export { borderRadius, iconSize, shadow, spacing } from "./stylingConstants";

export {
  createNavigationTheme,
  darkNavigationTheme,
  getNavigationTheme,
  lightNavigationTheme,
} from "./navigationTheme";

export type { Theme } from "@react-navigation/native";
