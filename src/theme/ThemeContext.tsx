import * as SecureStore from "expo-secure-store";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ColorPalette,
  ThemeMode,
  createColorPalette,
  useSystemTheme,
} from "./Colors";
import { getNavigationTheme } from "./navigationTheme";
import { createThemedStyles } from "./styleHelpers";

// Theme context type
interface ThemeContextType {
  theme: ThemeMode;
  palette: ColorPalette;
  styles: ReturnType<typeof createThemedStyles>;
  navigationTheme: ReturnType<typeof getNavigationTheme>;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Storage key for theme preference
const THEME_STORAGE_KEY = "app_theme_preference";

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const systemTheme = useSystemTheme();
  const [theme, setThemeState] = useState<ThemeMode>(
    initialTheme || systemTheme
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from storage
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await SecureStore.getItemAsync(THEME_STORAGE_KEY);
        if (
          storedTheme &&
          (storedTheme === "light" || storedTheme === "dark")
        ) {
          setThemeState(storedTheme as ThemeMode);
        }
      } catch (error) {
        console.warn("Failed to load theme preference:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference to storage
  const saveThemePreference = async (newTheme: ThemeMode) => {
    try {
      await SecureStore.setItemAsync(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }
  };

  // Set theme function
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    saveThemePreference(newTheme);
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Create palette and styles
  const palette = createColorPalette(theme);
  const styles = createThemedStyles(palette);
  const navigationTheme = getNavigationTheme(theme);
  const isDark = theme === "dark";

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    palette,
    styles,
    navigationTheme,
    isDark,
    toggleTheme,
    setTheme,
  };

  // Don't render children until theme is loaded
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

// Hook to get theme without context (for use outside provider)
export const useThemeMode = (): ThemeMode => {
  const systemTheme = useSystemTheme();
  return systemTheme;
};

// Export types
export type { ThemeContextType, ThemeProviderProps };
