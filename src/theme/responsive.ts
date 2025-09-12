import { Dimensions, PixelRatio } from "react-native";

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base dimensions (iPhone 12 Pro as reference)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Scaling factors
const widthScale = SCREEN_WIDTH / BASE_WIDTH;
const heightScale = SCREEN_HEIGHT / BASE_HEIGHT;

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

// Responsive spacing
export const spacing = {
  xs: scaleSize(4),
  sm: scaleSize(8),
  md: scaleSize(16),
  lg: scaleSize(24),
  xl: scaleSize(32),
  "2xl": scaleSize(48),
  "3xl": scaleSize(64),
  "4xl": scaleSize(96),
};

// Responsive border radius
export const borderRadius = {
  none: 0,
  xs: scaleSize(2),
  sm: scaleSize(4),
  md: scaleSize(8),
  lg: scaleSize(12),
  xl: scaleSize(16),
  "2xl": scaleSize(24),
  "3xl": scaleSize(32),
  full: 9999,
};

// Responsive shadow
export const shadow = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
  "2xl": {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 16,
  },
};

// Responsive icon sizes
export const iconSize = {
  xs: scaleSize(12),
  sm: scaleSize(16),
  md: scaleSize(20),
  lg: scaleSize(24),
  xl: scaleSize(32),
  "2xl": scaleSize(40),
  "3xl": scaleSize(48),
};

// Responsive button sizes
export const buttonSize = {
  xs: {
    height: scaleSize(28),
    paddingHorizontal: scaleSize(8),
    fontSize: scaleFontSize(12),
  },
  sm: {
    height: scaleSize(32),
    paddingHorizontal: scaleSize(12),
    fontSize: scaleFontSize(14),
  },
  md: {
    height: scaleSize(40),
    paddingHorizontal: scaleSize(16),
    fontSize: scaleFontSize(16),
  },
  lg: {
    height: scaleSize(48),
    paddingHorizontal: scaleSize(20),
    fontSize: scaleFontSize(18),
  },
  xl: {
    height: scaleSize(56),
    paddingHorizontal: scaleSize(24),
    fontSize: scaleFontSize(20),
  },
};

// Responsive input sizes
export const inputSize = {
  xs: {
    height: scaleSize(32),
    paddingHorizontal: scaleSize(8),
    fontSize: scaleFontSize(12),
  },
  sm: {
    height: scaleSize(36),
    paddingHorizontal: scaleSize(12),
    fontSize: scaleFontSize(14),
  },
  md: {
    height: scaleSize(44),
    paddingHorizontal: scaleSize(16),
    fontSize: scaleFontSize(16),
  },
  lg: {
    height: scaleSize(52),
    paddingHorizontal: scaleSize(20),
    fontSize: scaleFontSize(18),
  },
};
