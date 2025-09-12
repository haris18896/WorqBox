import { useColorScheme } from "react-native";

// Vuexy-inspired color palette
export const lightPalette = {
  // Primary colors
  primary: {
    light: "#38bdf8",
    main: "#0ea5e9",
    dark: "#0284c7",
  },

  // Secondary colors
  secondary: {
    light: "#94a3b8",
    main: "#64748b",
    dark: "#475569",
  },

  // Success colors
  success: {
    light: "#4ade80",
    main: "#22c55e",
    dark: "#16a34a",
  },

  // Warning colors
  warning: {
    light: "#fbbf24",
    main: "#f59e0b",
    dark: "#d97706",
  },

  // Error colors
  error: {
    light: "#f87171",
    main: "#ef4444",
    dark: "#dc2626",
  },

  // Info colors
  info: {
    light: "#60a5fa",
    main: "#3b82f6",
    dark: "#2563eb",
  },

  // Neutral colors
  neutral: {
    light: "#a3a3a3",
    main: "#737373",
    dark: "#525252",
  },

  // Surface colors
  surface: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
    elevated: "#ffffff",
    overlay: "rgba(0, 0, 0, 0.5)",
  },

  // Text colors
  text: {
    primary: "#0f172a",
    secondary: "#475569",
    tertiary: "#64748b",
    disabled: "#94a3b8",
    inverse: "#ffffff",
    placeholder: "#94a3b8",
  },

  // Border colors
  border: {
    primary: "#e2e8f0",
    secondary: "#cbd5e1",
    focus: "#0ea5e9",
    error: "#ef4444",
    success: "#22c55e",
  },

  // Background colors
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",
    tertiary: "#f1f5f9",
    inverse: "#0f172a",
  },
};

export const darkPalette = {
  // Primary colors (adjusted for dark mode)
  primary: {
    light: "#7dd3fc",
    main: "#0ea5e9",
    dark: "#0284c7",
  },

  // Secondary colors
  secondary: {
    light: "#cbd5e1",
    main: "#64748b",
    dark: "#334155",
  },

  // Success colors
  success: {
    light: "#86efac",
    main: "#22c55e",
    dark: "#16a34a",
  },

  // Warning colors
  warning: {
    light: "#fcd34d",
    main: "#f59e0b",
    dark: "#d97706",
  },

  // Error colors
  error: {
    light: "#fca5a5",
    main: "#ef4444",
    dark: "#dc2626",
  },

  // Info colors
  info: {
    light: "#93c5fd",
    main: "#3b82f6",
    dark: "#2563eb",
  },

  // Neutral colors
  neutral: {
    light: "#d4d4d4",
    main: "#737373",
    dark: "#404040",
  },

  // Surface colors
  surface: {
    primary: "#0f172a",
    secondary: "#1e293b",
    tertiary: "#334155",
    elevated: "#1e293b",
    overlay: "rgba(0, 0, 0, 0.7)",
  },

  // Text colors
  text: {
    primary: "#f8fafc",
    secondary: "#cbd5e1",
    tertiary: "#94a3b8",
    disabled: "#64748b",
    inverse: "#0f172a",
    placeholder: "#64748b",
  },

  // Border colors
  border: {
    primary: "#334155",
    secondary: "#475569",
    focus: "#0ea5e9",
    error: "#ef4444",
    success: "#22c55e",
  },

  // Background colors
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
