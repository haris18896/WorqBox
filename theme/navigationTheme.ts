import { Theme } from "@react-navigation/native";
import { ColorPalette, darkPalette, lightPalette } from "./Colors";
import { createColorCombinations } from "./colorUtils";

export const createNavigationTheme = (palette: ColorPalette): Theme => {
  const colors = createColorCombinations(palette);

  return {
    dark: palette === darkPalette,
    colors: {
      primary: colors.primary.main,
      background: colors.background.primary,
      card: colors.surface.primary,
      text: colors.text.primary,
      border: colors.border.primary,
      notification: colors.error.main,
    },
    fonts: {
      regular: {
        fontFamily: "Poppins-Regular",
        fontWeight: "400",
      },
      medium: {
        fontFamily: "Poppins-Medium",
        fontWeight: "500",
      },
      bold: {
        fontFamily: "Poppins-Bold",
        fontWeight: "700",
      },
      heavy: {
        fontFamily: "Poppins-ExtraBold",
        fontWeight: "800",
      },
    },
  };
};

export const lightNavigationTheme = createNavigationTheme(lightPalette);
export const darkNavigationTheme = createNavigationTheme(darkPalette);

// Helper function to get navigation theme based on mode
export const getNavigationTheme = (mode: "light" | "dark"): Theme => {
  return mode === "dark" ? darkNavigationTheme : lightNavigationTheme;
};
