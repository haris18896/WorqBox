import { scaleSize, useTheme } from "@/theme";
import { fontFamily } from "@/theme/fonts";
import { spacing } from "@/theme/stylingConstants";
import { RegisterFormData } from "@/types";
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

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
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

export default function Register() {
  const router = useRouter();
  const { palette, toggleTheme, isDark } = useTheme();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for input navigation
  const firstNameRef = useRef<RNTextInput>(null);
  const lastNameRef = useRef<RNTextInput>(null);
  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const confirmPasswordRef = useRef<RNTextInput>(null);

  const formik = useFormik<RegisterFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      if (!agreeToTerms) {
        Alert.alert("Error", "Please agree to the Terms and Conditions");
        return;
      }

      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Registration attempt:", values);
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => router.push("/auth/login") },
        ]);
      } catch {
        Alert.alert("Error", "Registration failed. Please try again.");
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
    checkbox: {
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
    checkboxChecked: {
      backgroundColor: palette.primary.main,
      borderColor: palette.primary.main,
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
    registerButtonContainer: {
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
                  <Text style={styles.headerTitle}>Create Account</Text>
                </View>
              </View>

              <View style={styles.titleSection}>
                <Text style={styles.title}>Join WorkBox</Text>
                <Text style={styles.subtitle}>
                  Start your journey with us today!
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.nameRow}>
                  <View style={styles.nameInput}>
                    <TextInput
                      ref={firstNameRef}
                      title="First Name"
                      leftIcon="user"
                      variant="filled"
                      size="medium"
                      returnKeyType="next"
                      value={formik.values.firstName}
                      nextInputRef={lastNameRef}
                      placeholder="Enter first name"
                      formikError={formik.errors.firstName}
                      formikTouched={formik.touched.firstName}
                      onChangeText={(text) =>
                        formik.setFieldValue("firstName", text)
                      }
                      onBlur={() => formik.setFieldTouched("firstName", true)}
                    />
                  </View>
                  <View style={styles.nameInput}>
                    <TextInput
                      ref={lastNameRef}
                      title="Last Name"
                      leftIcon="user"
                      variant="filled"
                      size="medium"
                      returnKeyType="next"
                      value={formik.values.lastName}
                      nextInputRef={emailRef}
                      placeholder="Enter last name"
                      formikError={formik.errors.lastName}
                      formikTouched={formik.touched.lastName}
                      onChangeText={(text) =>
                        formik.setFieldValue("lastName", text)
                      }
                      onBlur={() => formik.setFieldTouched("lastName", true)}
                    />
                  </View>
                </View>

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
                  returnKeyType="next"
                  value={formik.values.password}
                  nextInputRef={confirmPasswordRef}
                  placeholder="Create a password"
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
                  placeholder="Confirm your password"
                  formikError={formik.errors.confirmPassword}
                  formikTouched={formik.touched.confirmPassword}
                  onChangeText={(text) =>
                    formik.setFieldValue("confirmPassword", text)
                  }
                  onBlur={() => formik.setFieldTouched("confirmPassword", true)}
                  onSubmitEditing={() => formik.handleSubmit()}
                />

                <TouchableOpacity
                  style={styles.termsContainer}
                  onPress={() => setAgreeToTerms(!agreeToTerms)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkbox,
                      agreeToTerms && styles.checkboxChecked,
                    ]}
                  >
                    {agreeToTerms && (
                      <Ionicons
                        name="checkmark"
                        size={scaleSize(12)}
                        color={palette.text.inverse}
                      />
                    )}
                  </View>
                  <Text style={styles.termsText}>
                    I agree to the{" "}
                    <Text style={styles.termsLink}>Terms and Conditions</Text>{" "}
                    and <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>
                </TouchableOpacity>

                <View style={styles.registerButtonContainer}>
                  <Button
                    title="Create Account"
                    onPress={formik.handleSubmit}
                    loading={isLoading}
                    disabled={isLoading}
                    fullWidth
                    variant="primary"
                    size="medium"
                    leftIcon={
                      <Ionicons
                        name="person-add-outline"
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
                    Already have an account?{" "}
                    <Text
                      style={{ color: palette.primary.main, fontWeight: "600" }}
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
