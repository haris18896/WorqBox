import { Dimensions, PixelRatio, Platform } from "react-native";

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Base dimensions for different platforms
const BASE_WIDTH_MOBILE = 420;
const BASE_WIDTH_TABLET = 768;
const BASE_WIDTH_WEB = 1024;

// Device type detection
const getDeviceType = () => {
  if (Platform.OS === "web") {
    if (SCREEN_WIDTH >= 1024) return "web";
    if (SCREEN_WIDTH >= 768) return "tablet";
    return "mobile";
  }

  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  if (aspectRatio < 1.6 && Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) >= 600) {
    return "tablet";
  }
  return "mobile";
};

// Get appropriate base width and scaling factor
const getScalingConfig = () => {
  const deviceType = getDeviceType();

  switch (deviceType) {
    case "web":
      return {
        baseWidth: BASE_WIDTH_WEB,
        maxScale: 1.2,
        minScale: 0.8,
      };
    case "tablet":
      return {
        baseWidth: BASE_WIDTH_TABLET,
        maxScale: 1.5,
        minScale: 0.9,
      };
    default:
      return {
        baseWidth: BASE_WIDTH_MOBILE,
        maxScale: 1.3,
        minScale: 0.85,
      };
  }
};

const { baseWidth, maxScale, minScale } = getScalingConfig();
const rawScale = SCREEN_WIDTH / baseWidth;
const clampedScale = Math.max(minScale, Math.min(maxScale, rawScale));

// Responsive scaling utilities
export const scaleSize = (size: number): number => {
  if (Platform.OS === "web" && SCREEN_WIDTH >= 768) {
    const webScale = Math.max(0.8, Math.min(1.1, rawScale));
    const newSize = size * webScale;
    return Math.round(newSize);
  }

  const newSize = size * clampedScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const scaleFontSize = (size: number): number => {
  if (Platform.OS === "web" && SCREEN_WIDTH >= 768) {
    const webFontScale = Math.max(0.9, Math.min(1.05, rawScale));
    return Math.round(size * webFontScale);
  }

  const newSize = size * clampedScale;
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
  if (Platform.OS === "web") {
    return SCREEN_WIDTH >= 768 && SCREEN_WIDTH < 1024;
  }
  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  return aspectRatio < 1.6 && Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) >= 600;
};

export const isWeb = (): boolean => {
  return Platform.OS === "web" && SCREEN_WIDTH >= 1024;
};

export const isMobile = (): boolean => {
  if (Platform.OS === "web") {
    return SCREEN_WIDTH < 768;
  }
  return !isTablet();
};

export const isSmallDevice = (): boolean => {
  return SCREEN_WIDTH < 375;
};

export const isLargeDevice = (): boolean => {
  return SCREEN_WIDTH > 414;
};
