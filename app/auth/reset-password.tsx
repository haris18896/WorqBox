import { scaleSize, useTheme } from "@/theme";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/stylingConstants";
import { ResetPasswordFormData } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import {
  Alert,
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

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

const resetPasswordSchema = Yup.object().shape({
  token: Yup.string().required("Reset token is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function ResetPassword() {
  const router = useRouter();
  const { palette, toggleTheme, isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const tokenRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const confirmPasswordRef = useRef<RNTextInput>(null);

  const formik = useFormik<ResetPasswordFormData>({
    initialValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Password reset:", values);
        Alert.alert("Success", "Password reset successfully!", [
          { text: "OK", onPress: () => router.push("/auth/login") },
        ]);
      } catch {
        Alert.alert("Error", "Failed to reset password. Please try again.");
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
    resetButtonContainer: {
      marginBottom: spacing.md,
    },
    signInContainer: {
      alignItems: "center",
      marginTop: spacing.xl,
    },
    signInText: {
      fontSize: scaleSize(14),
      fontFamily: fontFamily.regular,
      color: palette.text.secondary,
    },
    signInLink: {
      fontSize: scaleSize(14),
      fontFamily: fontFamily.medium,
      color: palette.secondary.main,
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
              <View style={styles.headerSection}>
                <View style={styles.backButtonContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="arrow-back"
                      size={scaleSize(24)}
                      color={palette.secondary.main}
                    />
                  </TouchableOpacity>
                  <Text style={styles.headerTitle}>New Password</Text>
                </View>
              </View>

              <View style={styles.titleSection}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                  Enter your reset token and create a new password
                </Text>
              </View>

              <View style={styles.formContainer}>
                <TextInput
                  ref={tokenRef}
                  title="Reset Token"
                  leftIcon="key"
                  variant="filled"
                  size="medium"
                  returnKeyType="next"
                  value={formik.values.token}
                  nextInputRef={passwordRef}
                  placeholder="Enter reset token from email"
                  formikError={formik.errors.token}
                  formikTouched={formik.touched.token}
                  onChangeText={(text) => formik.setFieldValue("token", text)}
                  onBlur={() => formik.setFieldTouched("token", true)}
                />

                <TextInput
                  ref={passwordRef}
                  title="New Password"
                  leftIcon="password"
                  variant="filled"
                  size="medium"
                  returnKeyType="next"
                  value={formik.values.password}
                  nextInputRef={confirmPasswordRef}
                  placeholder="Create new password"
                  formikError={formik.errors.password}
                  formikTouched={formik.touched.password}
                  onChangeText={(text) =>
                    formik.setFieldValue("password", text)
                  }
                  onBlur={() => formik.setFieldTouched("password", true)}
                />

                <TextInput
                  ref={confirmPasswordRef}
                  title="Confirm Password"
                  leftIcon="password"
                  variant="filled"
                  size="medium"
                  returnKeyType="done"
                  value={formik.values.confirmPassword}
                  placeholder="Confirm new password"
                  formikError={formik.errors.confirmPassword}
                  formikTouched={formik.touched.confirmPassword}
                  onChangeText={(text) =>
                    formik.setFieldValue("confirmPassword", text)
                  }
                  onBlur={() => formik.setFieldTouched("confirmPassword", true)}
                  onSubmitEditing={() => formik.handleSubmit()}
                />

                <View style={styles.resetButtonContainer}>
                  <Button
                    title="Reset Password"
                    onPress={formik.handleSubmit}
                    loading={isLoading}
                    disabled={isLoading}
                    fullWidth
                    variant="primary"
                    size="medium"
                    leftIcon={
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={24}
                        color={palette.text.inverse}
                      />
                    }
                  />
                </View>

                <View style={styles.signInContainer}>
                  <Text style={styles.signInText}>
                    Remember your password?{" "}
                    <Text
                      style={styles.signInLink}
                      onPress={() => router.push("/auth/login")}
                    >
                      Sign in
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

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
