import { TextStyle } from "react-native";

export interface FontWeight {
  thin: "100";
  extraLight: "200";
  light: "300";
  regular: "400";
  medium: "500";
  semiBold: "600";
  bold: "700";
  extraBold: "800";
  black: "900";
}

export interface FontSize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  "5xl": number;
}

export interface LineHeight {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export interface LetterSpacing {
  tighter: number;
  tight: number;
  normal: number;
  wide: number;
  wider: number;
  widest: number;
}

export interface Typography {
  fontFamily: {
    primary: string;
    secondary: string;
  };
  fontWeight: FontWeight;
  fontSize: FontSize;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  typography: {
    display: {
      large: TextStyle;
      medium: TextStyle;
      small: TextStyle;
    };
    headline: {
      large: TextStyle;
      medium: TextStyle;
      small: TextStyle;
    };
    title: {
      large: TextStyle;
      medium: TextStyle;
      small: TextStyle;
    };
    body: {
      large: TextStyle;
      medium: TextStyle;
      small: TextStyle;
    };
    label: {
      large: TextStyle;
      medium: TextStyle;
      small: TextStyle;
    };
  };
}
