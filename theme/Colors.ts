import { useColorScheme } from "react-native";

const commonColors = {
  primary: {
    light: "#9d8ef7",
    main: "#7367F0",
    dark: "#5a4fd1",
  },
  secondary: {
    light: "#33c4f0",
    main: "#00ABE8",
    dark: "#0088b8",
  },
  success: {
    light: "#4ade80",
    main: "#22c55e",
    dark: "#16a34a",
  },
  warning: {
    light: "#fbbf24",
    main: "#f59e0b",
    dark: "#d97706",
  },
  error: {
    light: "#f87171",
    main: "#ef4444",
    dark: "#dc2626",
  },
  info: {
    light: "#60a5fa",
    main: "#3b82f6",
    dark: "#2563eb",
  },
  neutral: {
    main: "#737373",
  },
};

// Vuexy-inspired color palette
export const lightPalette = {
  ...commonColors,

  neutral: {
    ...commonColors.neutral,
    light: "#a3a3a3",
    dark: "#525252",
  },
  surface: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
    elevated: "#ffffff",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  text: {
    primary: "#0f172a",
    secondary: "#475569",
    tertiary: "#64748b",
    disabled: "#94a3b8",
    inverse: "#ffffff",
    placeholder: "#94a3b8",
  },
  border: {
    primary: "#e2e8f0",
    secondary: "#cbd5e1",
    focus: commonColors.primary.main,
    error: commonColors.error.main,
    success: commonColors.success.main,
  },
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
    inverse: "#0f172a",
  },
};

export const darkPalette = {
  ...commonColors,
  neutral: {
    ...commonColors.neutral,
    light: "#d4d4d4",
    dark: "#404040",
  },
  surface: {
    primary: "#0f172a",
    secondary: "#1e293b",
    tertiary: "#334155",
    elevated: "#1e293b",
    overlay: "rgba(0, 0, 0, 0.7)",
  },
  text: {
    primary: "#f8fafc",
    secondary: "#cbd5e1",
    tertiary: "#94a3b8",
    disabled: "#64748b",
    inverse: "#0f172a",
    placeholder: "#64748b",
  },
  border: {
    primary: "#334155",
    secondary: "#475569",
    focus: commonColors.primary.main,
    error: commonColors.error.main,
    success: commonColors.success.main,
  },
  background: {
    primary: "#0f172a",
    secondary: "#1e293b",
    tertiary: "#334155",
    inverse: "#ffffff",
  },
};

export type ColorPalette = typeof lightPalette;
export type ThemeMode = "light" | "dark";

export const createColorPalette = (mode: ThemeMode): ColorPalette => {
  return mode === "dark" ? darkPalette : lightPalette;
};

export const getColorPalette = (mode: ThemeMode): ColorPalette => {
  return createColorPalette(mode);
};

// System theme detection
export const useSystemTheme = (): ThemeMode => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? "dark" : "light";
};
