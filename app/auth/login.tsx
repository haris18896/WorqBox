import { scaleSize, useTheme } from "@/theme";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/stylingConstants";
import { LoginFormData } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";

// Import UI components
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

// Validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const { palette, toggleTheme, isDark } = useTheme();
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for input navigation
  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);

  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: "dev.reporteq@gmail.com", // Pre-filled for demo
      password: "password123", // Pre-filled for demo
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Login attempt:", values);
        Alert.alert("Success", "Login successful!", [
          { text: "OK", onPress: () => router.push("/auth/register") },
        ]);
      } catch {
        Alert.alert("Error", "Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const styles = StyleSheet.create({
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
    themeToggle: {
      position: "absolute",
      top: scaleSize(60),
      right: spacing.xl,
      padding: spacing.sm,
      borderRadius: scaleSize(8),
      backgroundColor: palette.surface.secondary,
      zIndex: 10,
    },
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
    formContainer: {
      marginBottom: spacing.xl,
    },
    inputContainer: {
      marginBottom: spacing.lg,
    },
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
    loginButtonContainer: {
      marginBottom: spacing.md,
    },
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
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.mainContainer}>
          {/* Theme Toggle */}
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={scaleSize(24)}
              color={palette.text.primary}
            />
          </TouchableOpacity>

          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              {/* Header Section with Logo and App Name */}
              <View style={styles.headerSection}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                  <Text style={styles.appName}>WorkBox</Text>
                </View>
              </View>

              {/* Title Section */}
              <View style={styles.titleSection}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>To continue your account!</Text>
              </View>

              {/* Form Section */}
              <View style={styles.formContainer}>
                <TextInput
                  ref={emailRef}
                  title="Email"
                  leftIcon="email"
                  inputMode="email"
                  variant="filled"
                  size="medium"
                  returnKeyType="next"
                  value={formik.values.email}
                  nextInputRef={passwordRef}
                  placeholder="Enter your email"
                  formikError={formik.errors.email}
                  formikTouched={formik.touched.email}
                  onChangeText={(text) => formik.setFieldValue("email", text)}
                  onBlur={() => formik.setFieldTouched("email", true)}
                />

                <TextInput
                  ref={passwordRef}
                  title="Password"
                  leftIcon="password"
                  variant="filled"
                  size="medium"
                  returnKeyType="done"
                  value={formik.values.password}
                  placeholder="Enter your password"
                  formikError={formik.errors.password}
                  formikTouched={formik.touched.password}
                  onChangeText={(text) =>
                    formik.setFieldValue("password", text)
                  }
                  onBlur={() => formik.setFieldTouched("password", true)}
                  onSubmitEditing={() => formik.handleSubmit()}
                />

                {/* Remember Me and Forgot Password */}
                <View style={styles.rememberForgotContainer}>
                  <TouchableOpacity
                    style={styles.rememberMeContainer}
                    onPress={() => setRememberMe(!rememberMe)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        rememberMe && styles.checkboxChecked,
                      ]}
                    >
                      {rememberMe && (
                        <Ionicons
                          name="checkmark"
                          size={scaleSize(12)}
                          color={palette.text.inverse}
                        />
                      )}
                    </View>
                    <Text style={styles.checkboxText}>Remember Me</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => router.push("/auth/forgot-password")}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                {/* Login Button */}
                <View style={styles.loginButtonContainer}>
                  <Button
                    title="Login"
                    onPress={formik.handleSubmit}
                    loading={isLoading}
                    disabled={isLoading}
                    fullWidth
                    variant="primary"
                    size="medium"
                    leftIcon={
                      <Ionicons
                        name="log-in-outline"
                        size={24}
                        color={palette.text.inverse}
                      />
                    }
                  />
                </View>

                <View
                  style={{ alignItems: "center", marginBottom: spacing.xl }}
                >
                  <Text style={{ fontSize: 14, color: palette.text.secondary }}>
                    Don&apos;t have an account?{" "}
                    <Text
                      style={{ color: palette.primary.main, fontWeight: "600" }}
                      onPress={() => router.push("/auth/register")}
                    >
                      Sign up
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Footer with Copyright */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} WorkBox. All rights reserved.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
