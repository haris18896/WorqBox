import { Dimensions, PixelRatio } from "react-native";

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base dimensions
const BASE_WIDTH = 420;

// Scaling factors
const widthScale = SCREEN_WIDTH / BASE_WIDTH;

// Responsive scaling utilities
export const scaleSize = (size: number): number => {
  const newSize = size * widthScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const scaleFontSize = (size: number): number => {
  const newSize = size * widthScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Width percentage
export const WP = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

// Height percentage
export const HP = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

// Responsive breakpoints
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

// Device type detection
export const isTablet = (): boolean => {
  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  return aspectRatio < 1.6 && Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) >= 600;
};

export const isSmallDevice = (): boolean => {
  return SCREEN_WIDTH < 375;
};

export const isLargeDevice = (): boolean => {
  return SCREEN_WIDTH > 414;
};
