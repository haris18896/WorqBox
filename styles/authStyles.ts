import { scaleSize } from "@/theme";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/stylingConstants";
import { StyleSheet } from "react-native";

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
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xs,
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
      marginTop: scaleSize(80),
      marginBottom: spacing.xl * 2,
    },
    logoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    logo: {
      width: scaleSize(50),
      height: scaleSize(50),
      marginRight: spacing.md,
    },
    appName: {
      fontSize: scaleSize(32),
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
      fontSize: scaleSize(28),
      fontFamily: fontFamily.bold,
      color: palette.secondary.main,
      marginBottom: spacing.xs,
    },
    subtitle: {
      fontSize: scaleSize(16),
      fontFamily: fontFamily.regular,
      color: palette.text.secondary,
      lineHeight: scaleSize(24),
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
      fontSize: scaleSize(14),
      fontFamily: fontFamily.medium,
      color: palette.secondary.main,
    },
    secondaryText: {
      fontSize: scaleSize(14),
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
      alignItems: "flex-start",
      marginBottom: spacing.xl * 2,
      marginTop: spacing.md,
    },
    termsText: {
      flex: 1,
      fontSize: scaleSize(14),
      fontFamily: fontFamily.regular,
      color: palette.text.secondary,
      lineHeight: scaleSize(20),
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
      marginTop: spacing.xs,
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
