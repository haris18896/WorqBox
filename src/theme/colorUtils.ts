import { ColorPalette } from "./Colors";

// Color path type for nested color access
export type ColorPath =
  | "primary.light"
  | "primary.main"
  | "primary.dark"
  | "secondary.light"
  | "secondary.main"
  | "secondary.dark"
  | "success.light"
  | "success.main"
  | "success.dark"
  | "warning.light"
  | "warning.main"
  | "warning.dark"
  | "error.light"
  | "error.main"
  | "error.dark"
  | "info.light"
  | "info.main"
  | "info.dark"
  | "neutral.light"
  | "neutral.main"
  | "neutral.dark"
  | "surface.primary"
  | "surface.secondary"
  | "surface.tertiary"
  | "surface.elevated"
  | "surface.overlay"
  | "text.primary"
  | "text.secondary"
  | "text.tertiary"
  | "text.disabled"
  | "text.inverse"
  | "text.placeholder"
  | "border.primary"
  | "border.secondary"
  | "border.focus"
  | "border.error"
  | "border.success"
  | "background.primary"
  | "background.secondary"
  | "background.tertiary"
  | "background.inverse";

// Helper function to resolve nested color paths
export const resolveColorPath = (
  palette: ColorPalette,
  path: ColorPath
): string => {
  const keys = path.split(".") as [keyof ColorPalette, string];
  const [firstKey, secondKey] = keys;

  const firstLevel = palette[firstKey];

  if (typeof firstLevel === "string") {
    return firstLevel;
  }

  if (typeof firstLevel === "object" && secondKey) {
    return (firstLevel as any)[secondKey] || "#000000";
  }

  return "#000000";
};

// Color resolver function
export const createColorResolver = (palette: ColorPalette) => {
  return (path: ColorPath): string => {
    return resolveColorPath(palette, path);
  };
};

// Common color combinations for components
export const createColorCombinations = (palette: ColorPalette) => {
  const resolve = createColorResolver(palette);

  return {
    // Primary combinations
    primary: {
      main: resolve("primary.main"),
      light: resolve("primary.light"),
      dark: resolve("primary.dark"),
      contrast: resolve("text.inverse"),
      background: resolve("surface.secondary"),
      border: resolve("border.primary"),
    },

    // Secondary combinations
    secondary: {
      main: resolve("secondary.main"),
      light: resolve("secondary.light"),
      dark: resolve("secondary.dark"),
      contrast: resolve("text.inverse"),
      background: resolve("surface.secondary"),
      border: resolve("border.primary"),
    },

    // Success combinations
    success: {
      main: resolve("success.main"),
      light: resolve("success.light"),
      dark: resolve("success.dark"),
      contrast: resolve("text.inverse"),
      background: resolve("surface.secondary"),
      border: resolve("border.success"),
    },

    // Warning combinations
    warning: {
      main: resolve("warning.main"),
      light: resolve("warning.light"),
      dark: resolve("warning.dark"),
      contrast: resolve("text.inverse"),
      background: resolve("surface.secondary"),
      border: resolve("border.primary"),
    },

    // Error combinations
    error: {
      main: resolve("error.main"),
      light: resolve("error.light"),
      dark: resolve("error.dark"),
      contrast: resolve("text.inverse"),
      background: resolve("surface.secondary"),
      border: resolve("border.error"),
    },

    // Info combinations
    info: {
      main: resolve("info.main"),
      light: resolve("info.light"),
      dark: resolve("info.dark"),
      contrast: resolve("text.inverse"),
      background: resolve("surface.secondary"),
      border: resolve("border.primary"),
    },

    // Neutral combinations
    neutral: {
      main: resolve("neutral.main"),
      light: resolve("neutral.light"),
      dark: resolve("neutral.dark"),
      contrast: resolve("text.inverse"),
      background: resolve("surface.secondary"),
      border: resolve("border.primary"),
    },

    // Surface combinations
    surface: {
      primary: resolve("surface.primary"),
      secondary: resolve("surface.secondary"),
      tertiary: resolve("surface.tertiary"),
      elevated: resolve("surface.elevated"),
      overlay: resolve("surface.overlay"),
    },

    // Text combinations
    text: {
      primary: resolve("text.primary"),
      secondary: resolve("text.secondary"),
      tertiary: resolve("text.tertiary"),
      disabled: resolve("text.disabled"),
      inverse: resolve("text.inverse"),
      placeholder: resolve("text.placeholder"),
    },

    // Border combinations
    border: {
      primary: resolve("border.primary"),
      secondary: resolve("border.secondary"),
      focus: resolve("border.focus"),
      error: resolve("border.error"),
      success: resolve("border.success"),
    },

    // Background combinations
    background: {
      primary: resolve("background.primary"),
      secondary: resolve("background.secondary"),
      tertiary: resolve("background.tertiary"),
      inverse: resolve("background.inverse"),
    },
  };
};

// Opacity utilities
export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Handle rgba colors
  if (color.startsWith("rgba")) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`);
  }

  return color;
};

// Color manipulation utilities
export const lightenColor = (color: string, amount: number): string => {
  // Simple implementation - in a real app you might want to use a color library
  return withOpacity(color, 1 - amount * 0.1);
};

export const darkenColor = (color: string, amount: number): string => {
  // Simple implementation - in a real app you might want to use a color library
  return withOpacity(color, 1 + amount * 0.1);
};
