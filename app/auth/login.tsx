import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { useTheme } from "@/theme";
import { spacing } from "@/theme/stylingConstants";
import { LoginFormData } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

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
      backgroundColor: palette.background.primary,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xl * 2,
    },
    header: {
      alignItems: "center",
      marginBottom: spacing.xl * 2,
    },
    logo: {
      width: 60,
      height: 60,
      marginBottom: spacing.md,
    },
    appName: {
      fontSize: 24,
      fontWeight: "bold",
      color: palette.primary.main,
      marginBottom: spacing.xl * 2,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: palette.primary.main,
      marginBottom: spacing.sm,
      textAlign: "left",
      alignSelf: "flex-start",
    },
    subtitle: {
      fontSize: 16,
      color: palette.text.secondary,
      textAlign: "left",
      marginBottom: spacing.xl * 2,
      alignSelf: "flex-start",
    },
    formContainer: {
      marginBottom: spacing.xl,
    },
    rememberForgotContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    rememberMeContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: palette.primary.main,
      borderRadius: 4,
      marginRight: spacing.sm,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxChecked: {
      backgroundColor: palette.primary.main,
    },
    checkboxText: {
      fontSize: 14,
      color: palette.text.secondary,
    },
    forgotPassword: {
      fontSize: 14,
      color: palette.primary.main,
      fontWeight: "500",
    },
    loginButton: {
      marginBottom: spacing.xl,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: palette.primary.main,
      paddingVertical: spacing.xl,
      paddingHorizontal: spacing.xl,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: "center",
    },
    footerText: {
      fontSize: 12,
      color: palette.text.inverse,
      textAlign: "center",
    },
    themeToggle: {
      position: "absolute",
      top: 50,
      right: 20,
      padding: spacing.sm,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Theme Toggle */}
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={24}
              color={palette.text.primary}
            />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>WORK BOX</Text>
          </View>

          {/* Title Section */}
          <View style={{ marginBottom: spacing.xl }}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>To continue your account!</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <TextInput
              ref={emailRef}
              title="Email"
              leftIcon="email"
              inputMode="email"
              variant="outlined"
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
              variant="outlined"
              size="medium"
              returnKeyType="done"
              value={formik.values.password}
              placeholder="Enter your password"
              formikError={formik.errors.password}
              formikTouched={formik.touched.password}
              onChangeText={(text) => formik.setFieldValue("password", text)}
              onBlur={() => formik.setFieldTouched("password", true)}
              onSubmitEditing={() => formik.handleSubmit()}
            />

            {/* Remember Me & Forgot Password */}
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
                      size={14}
                      color={palette.text.inverse}
                    />
                  )}
                </View>
                <Text style={styles.checkboxText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/auth/forgot-password")}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Login"
              onPress={() => formik.handleSubmit()}
              variant="primary"
              size="large"
              fullWidth
              loading={isLoading}
              style={styles.loginButton}
            />
          </View>

          {/* Sign Up Link */}
          <View style={{ alignItems: "center", marginBottom: spacing.xl }}>
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

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 WorkBox. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
