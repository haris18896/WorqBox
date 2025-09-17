import { ColorPalette, ThemeMode } from "../theme";

export interface UseThemeReturn {
  theme: ThemeMode;
  isDark: boolean;
  palette: ColorPalette;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}
