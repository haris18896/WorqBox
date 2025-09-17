import { scaleFontSize, scaleSize } from "./responsive";

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

// Button size constants
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

// Input size constants
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

// Switch size constants
export const switchSize = {
  sm: {
    width: scaleSize(40),
    height: scaleSize(24),
    thumbSize: scaleSize(20),
  },
  md: {
    width: scaleSize(50),
    height: scaleSize(30),
    thumbSize: scaleSize(26),
  },
  lg: {
    width: scaleSize(60),
    height: scaleSize(36),
    thumbSize: scaleSize(32),
  },
};

// Badge size constants
export const badgeSize = {
  sm: {
    paddingHorizontal: scaleSize(8),
    paddingVertical: scaleSize(4),
    fontSize: scaleFontSize(10),
    borderRadius: scaleSize(8),
  },
  md: {
    paddingHorizontal: scaleSize(12),
    paddingVertical: scaleSize(6),
    fontSize: scaleFontSize(12),
    borderRadius: scaleSize(10),
  },
  lg: {
    paddingHorizontal: scaleSize(16),
    paddingVertical: scaleSize(8),
    fontSize: scaleFontSize(14),
    borderRadius: scaleSize(12),
  },
};
