import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { useTheme } from "@/theme";
import { spacing } from "@/theme/responsive";
import { ForgotPasswordFormData } from "@/types";
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
const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const { palette, toggleTheme, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Refs for input navigation
  const emailRef = useRef<RNTextInput>(null);

  const formik = useFormik<ForgotPasswordFormData>({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Password reset request:", values);
        setEmailSent(true);
        Alert.alert(
          "Email Sent",
          "We've sent a password reset link to your email address.",
          [{ text: "OK", onPress: () => router.back() }]
        );
      } catch {
        Alert.alert("Error", "Failed to send reset email. Please try again.");
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
    backButton: {
      position: "absolute",
      top: 0,
      left: 0,
      padding: spacing.sm,
      zIndex: 1,
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: spacing.lg,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: palette.text.primary,
      marginBottom: spacing.sm,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: palette.text.secondary,
      textAlign: "center",
      marginBottom: spacing.xl,
      lineHeight: 24,
    },
    formContainer: {
      marginBottom: spacing.xl,
    },
    resetButton: {
      marginBottom: spacing.lg,
    },
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: spacing.lg,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: palette.border.primary,
    },
    dividerText: {
      marginHorizontal: spacing.md,
      fontSize: 14,
      color: palette.text.secondary,
    },
    socialButtons: {
      gap: spacing.md,
    },
    footer: {
      alignItems: "center",
      paddingBottom: spacing.xl,
    },
    footerText: {
      fontSize: 12,
      color: palette.text.tertiary,
      textAlign: "center",
    },
    themeToggle: {
      position: "absolute",
      top: 50,
      right: 20,
      padding: spacing.sm,
    },
    rememberPasswordContainer: {
      alignItems: "center",
      marginTop: spacing.xl,
    },
    rememberPasswordText: {
      fontSize: 14,
      color: palette.text.secondary,
    },
    rememberPasswordLink: {
      fontSize: 14,
      color: palette.primary.main,
      fontWeight: "600",
    },
  });

  if (emailSent) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContainer}
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
              <View style={styles.logo}>
                <Ionicons name="mail" size={32} color={palette.text.inverse} />
              </View>
              <Text style={styles.title}>Check Your Email</Text>
              <Text style={styles.subtitle}>
                We&apos;ve sent a password reset link to{"\n"}
                <Text
                  style={{ fontWeight: "600", color: palette.text.primary }}
                >
                  {formik.values.email}
                </Text>
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.formContainer}>
              <Button
                title="Resend Email"
                onPress={() => formik.handleSubmit()}
                variant="outline"
                size="large"
                fullWidth
                loading={isLoading}
                style={styles.resetButton}
              />

              <View style={styles.rememberPasswordContainer}>
                <Text style={styles.rememberPasswordText}>
                  Remember your password?{" "}
                  <Text
                    style={styles.rememberPasswordLink}
                    onPress={() => router.back()}
                  >
                    Sign in
                  </Text>
                </Text>
              </View>
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
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Enter your email address to reset your password
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <TextInput
              ref={emailRef}
              title="Email"
              leftIcon="email"
              inputMode="email"
              variant="outlined"
              returnKeyType="done"
              value={formik.values.email}
              placeholder="Enter your email"
              formikError={formik.errors.email}
              formikTouched={formik.touched.email}
              onChangeText={(text) => formik.setFieldValue("email", text)}
              onBlur={() => formik.setFieldTouched("email", true)}
              onSubmitEditing={() => formik.handleSubmit()}
            />

            {/* Reset Button */}
            <Button
              title="Reset Password"
              onPress={() => formik.handleSubmit()}
              variant="primary"
              size="large"
              fullWidth
              loading={isLoading}
              style={styles.resetButton}
            />

            {/* Remember Password */}
            <View style={styles.rememberPasswordContainer}>
              <Text style={styles.rememberPasswordText}>
                Remember your password?{" "}
                <Text
                  style={styles.rememberPasswordLink}
                  onPress={() => router.back()}
                >
                  Sign in
                </Text>
              </Text>
            </View>
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
