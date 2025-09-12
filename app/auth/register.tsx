import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { useTheme } from "@/theme";
import { spacing } from "@/theme/responsive";
import { RegisterFormData } from "@/types";
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
      if (!values.agreeToTerms) {
        Alert.alert("Error", "Please agree to the Terms and Conditions");
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call
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
      width: 80,
      height: 80,
      marginBottom: spacing.lg,
    },
    appName: {
      fontSize: 28,
      fontWeight: "bold",
      color: palette.text.primary,
      marginBottom: spacing.sm,
    },
    title: {
      fontSize: 32,
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
    },
    formContainer: {
      marginBottom: spacing.xl,
    },
    nameRow: {
      flexDirection: "row",
      gap: spacing.md,
    },
    nameInput: {
      flex: 1,
    },
    termsContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: spacing.xl,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: palette.primary.main,
      borderRadius: 4,
      marginRight: spacing.sm,
      marginTop: 2,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxChecked: {
      backgroundColor: palette.primary.main,
    },
    termsText: {
      flex: 1,
      fontSize: 14,
      color: palette.text.secondary,
      lineHeight: 20,
    },
    termsLink: {
      color: palette.primary.main,
      fontWeight: "600",
    },
    registerButton: {
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us and start your journey!</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Name Row */}
            <View style={styles.nameRow}>
              <View style={styles.nameInput}>
                <TextInput
                  ref={firstNameRef}
                  title="First Name"
                  leftIcon="user"
                  variant="outlined"
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
                  variant="outlined"
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
              variant="outlined"
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
              returnKeyType="next"
              value={formik.values.password}
              nextInputRef={confirmPasswordRef}
              placeholder="Create a password"
              formikError={formik.errors.password}
              formikTouched={formik.touched.password}
              onChangeText={(text) => formik.setFieldValue("password", text)}
              onBlur={() => formik.setFieldTouched("password", true)}
            />

            <TextInput
              ref={confirmPasswordRef}
              title="Confirm Password"
              leftIcon="password"
              variant="outlined"
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

            {/* Terms and Conditions */}
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
                    size={14}
                    color={palette.text.inverse}
                  />
                )}
              </View>
              <Text style={styles.termsText}>
                I agree to the{" "}
                <Text style={styles.termsLink}>Terms and Conditions</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Register Button */}
            <Button
              title="Create Account"
              onPress={() => formik.handleSubmit()}
              variant="primary"
              size="large"
              fullWidth
              loading={isLoading}
              style={styles.registerButton}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text
                style={{ color: palette.primary.main, fontWeight: "600" }}
                onPress={() => router.push("/auth/login")}
              >
                Sign in
              </Text>
            </Text>
            <Text style={[styles.footerText, { marginTop: spacing.sm }]}>
              © 2025 WorkBox. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
