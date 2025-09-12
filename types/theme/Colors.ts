export interface ColorShade {
  light: string;
  main: string;
  dark: string;
}

export interface ColorPalette {
  primary: ColorShade;
  secondary: ColorShade;
  success: ColorShade;
  warning: ColorShade;
  error: ColorShade;
  info: ColorShade;
  neutral: ColorShade;
  surface: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
}

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  palette: ColorPalette;
  toggleTheme: () => void;
}
