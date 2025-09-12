export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
}

export interface BorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  full: number;
}

export interface Shadow {
  none: ShadowStyle;
  xs: ShadowStyle;
  sm: ShadowStyle;
  md: ShadowStyle;
  lg: ShadowStyle;
  xl: ShadowStyle;
  "2xl": ShadowStyle;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ButtonSizeConfig {
  xs: ButtonSizeStyle;
  sm: ButtonSizeStyle;
  md: ButtonSizeStyle;
  lg: ButtonSizeStyle;
}

export interface ButtonSizeStyle {
  height: number;
  paddingHorizontal: number;
  fontSize: number;
}

export interface InputSize {
  sm: InputSizeStyle;
  md: InputSizeStyle;
  lg: InputSizeStyle;
}

export interface InputSizeStyle {
  height: number;
  paddingHorizontal: number;
  fontSize: number;
}

export interface IconSize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface DeviceInfo {
  isTablet: boolean;
  isPhone: boolean;
  screenWidth: number;
  screenHeight: number;
}
