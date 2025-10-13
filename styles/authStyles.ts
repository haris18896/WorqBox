import {
  isMobile,
  isTablet,
  isWeb,
  scaleFontSize,
  scaleSize,
  WP,
} from "@/theme";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/stylingConstants";
import { StyleSheet } from "react-native";

// responsive values
const getResponsiveValue = (mobile: number, tablet: number, web: number) => {
  if (isWeb()) return web;
  if (isTablet()) return tablet;
  return mobile;
};

// responsive container width
const getContainerWidth = () => {
  if (isWeb()) return Math.min(600, WP(50));
  if (isTablet()) return "100%";
  return WP(100);
};

export const createAuthStyles = (palette: any) =>
  StyleSheet.create({
    // Base Layout Styles
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: palette.primary.main,
      position: "relative",
    },
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: palette.background.secondary,
      borderBottomLeftRadius: scaleSize(30),
      borderBottomRightRadius: scaleSize(30),
      // Add subtle elevation for web
      ...(isWeb() && {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 4,
      }),
    },
    content: {
      flex: 1,
      paddingHorizontal: getResponsiveValue(
        spacing.xl,
        spacing["2xl"],
        spacing.xl
      ),
      paddingTop: getResponsiveValue(spacing.xs, spacing.md, spacing.lg),
      maxWidth: getContainerWidth(),
      alignSelf: "center",
      width: "100%",
    },

    // Theme Toggle (for login screen)
    themeToggle: {
      position: "absolute",
      top: scaleSize(60),
      right: spacing.xl,
      padding: spacing.sm,
      borderRadius: scaleSize(8),
      backgroundColor: palette.surface.secondary,
      zIndex: 10,
    },

    // Header Section Styles
    headerSection: {
      alignItems: "center",
      marginTop: getResponsiveValue(
        scaleSize(80),
        scaleSize(60),
        scaleSize(60)
      ),
      marginBottom: getResponsiveValue(
        spacing.xl * 2,
        spacing.xl * 1.5,
        spacing.xl * 1.5
      ),
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    logo: {
      width: getResponsiveValue(scaleSize(50), scaleSize(60), scaleSize(70)),
      height: getResponsiveValue(scaleSize(50), scaleSize(60), scaleSize(70)),
      marginRight: spacing.md,
    },
    appName: {
      fontSize: getResponsiveValue(
        scaleFontSize(32),
        scaleFontSize(36),
        scaleFontSize(40)
      ),
      fontFamily: fontFamily.bold,
      color: palette.secondary.main,
      letterSpacing: 0.5,
    },
    backButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.xl,
      alignSelf: "stretch",
    },
    backButton: {
      padding: spacing.sm,
      marginRight: spacing.md,
    },
    headerTitle: {
      fontSize: scaleSize(24),
      fontFamily: fontFamily.bold,
      color: palette.secondary.main,
      letterSpacing: 0.5,
    },

    // Title Section Styles
    titleSection: {
      marginBottom: spacing.lg,
      alignItems: "flex-start",
      alignSelf: "stretch",
    },
    title: {
      fontSize: getResponsiveValue(
        scaleFontSize(28),
        scaleFontSize(32),
        scaleFontSize(36)
      ),
      fontFamily: fontFamily.bold,
      color: palette.secondary.main,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: getResponsiveValue(
        scaleFontSize(16),
        scaleFontSize(18),
        scaleFontSize(20)
      ),
      fontFamily: fontFamily.regular,
      color: palette.text.secondary,
      lineHeight: getResponsiveValue(
        scaleFontSize(24),
        scaleFontSize(26),
        scaleFontSize(28)
      ),
    },

    // Form Styles
    formContainer: {
      marginBottom: spacing.xl,
    },
    inputContainer: {
      marginBottom: spacing.lg,
    },

    // Checkbox Styles
    checkbox: {
      width: scaleSize(20),
      height: scaleSize(20),
      borderWidth: 2,
      borderColor: palette.border.secondary,
      borderRadius: scaleSize(4),
      marginRight: spacing.sm,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    checkboxChecked: {
      backgroundColor: palette.primary.main,
      borderColor: palette.primary.main,
    },

    // Button Container Styles
    buttonContainer: {
      marginBottom: spacing.md,
    },

    // Footer Styles
    footer: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    footerText: {
      fontSize: scaleSize(12),
      fontFamily: fontFamily.regular,
      color: palette.text.inverse,
      textAlign: "center",
    },

    // Common Text Styles
    linkText: {
      fontSize: getResponsiveValue(
        scaleFontSize(14),
        scaleFontSize(15),
        scaleFontSize(16)
      ),
      fontFamily: fontFamily.medium,
      color: palette.secondary.main,
    },
    secondaryText: {
      fontSize: getResponsiveValue(
        scaleFontSize(14),
        scaleFontSize(15),
        scaleFontSize(16)
      ),
      fontFamily: fontFamily.regular,
      color: palette.text.secondary,
    },
    centerText: {
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    inlineText: {
      fontSize: 14,
      color: palette.text.secondary,
    },
    inlineLinkText: {
      color: palette.primary.main,
      fontWeight: "600",
    },

    // Login Specific Styles
    rememberForgotContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.xl * 2,
      marginTop: spacing.md,
    },
    rememberMeContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkboxText: {
      fontSize: scaleSize(14),
      fontFamily: fontFamily.regular,
      color: palette.text.secondary,
    },
    forgotPassword: {
      fontSize: scaleSize(14),
      fontFamily: fontFamily.medium,
      color: palette.secondary.main,
    },

    // Register Specific Styles
    nameRow: {
      flexDirection: "row",
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    nameInput: {
      flex: 1,
    },
    termsContainer: {
      flexDirection: "row",
      alignItems: isMobile() ? "flex-start" : "center",
      marginBottom: spacing.xl * 2,
      marginTop: spacing.md,
    },
    termsText: {
      flex: 1,
      fontSize: scaleSize(14),
      fontFamily: fontFamily.regular,
      color: palette.text.secondary,
    },
    termsLink: {
      color: palette.secondary.main,
      fontFamily: fontFamily.medium,
    },
    checkboxWithTopMargin: {
      width: scaleSize(20),
      height: scaleSize(20),
      borderWidth: 2,
      borderColor: palette.border.secondary,
      borderRadius: scaleSize(4),
      marginRight: spacing.sm,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
    },

    // Reset/Forgot Password Specific Styles
    actionContainer: {
      alignItems: "center",
      marginTop: spacing.xl,
    },
    actionText: {
      fontSize: scaleSize(14),
      fontFamily: fontFamily.regular,
      color: palette.text.secondary,
    },
    actionLink: {
      fontSize: scaleSize(14),
      fontFamily: fontFamily.medium,
      color: palette.secondary.main,
    },
  });

export default createAuthStyles;
