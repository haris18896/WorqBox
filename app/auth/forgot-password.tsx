import { scaleSize, useTheme } from "@/theme";
import { ForgotPasswordFormData } from "@/types";
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
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Yup from "yup";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

// Import common styles
import { createAuthStyles } from "@/styles";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const { palette } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const styles = createAuthStyles(palette);

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
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Password reset request:", values);
        setEmailSent(true);
      } catch {
        Alert.alert("Error", "Failed to send reset email. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (emailSent) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.mainContainer}>
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
                    <Text style={styles.headerTitle}>Email Sent</Text>
                  </View>
                </View>

                <View style={styles.titleSection}>
                  <Text style={styles.title}>Check Your Email</Text>
                  <Text style={styles.subtitle}>
                    We&apos;ve sent a password reset link to your email address
                  </Text>
                </View>

                <View style={styles.formContainer}>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Resend Email"
                      onPress={formik.handleSubmit}
                      loading={isLoading}
                      disabled={isLoading}
                      fullWidth
                      variant="secondary"
                      size="medium"
                    />
                  </View>

                  <View style={styles.centerText}>
                    <Text style={styles.inlineText}>
                      Remember your password?{" "}
                      <Text
                        style={styles.inlineLinkText}
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.mainContainer}>
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
                  <Text style={styles.headerTitle}>Reset Password</Text>
                </View>
              </View>

              <View style={styles.titleSection}>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>
                  Enter your email address to reset your password
                </Text>
              </View>

              <View style={styles.formContainer}>
                <TextInput
                  ref={emailRef}
                  title="Email"
                  leftIcon="email"
                  inputMode="email"
                  variant="filled"
                  size="medium"
                  returnKeyType="done"
                  value={formik.values.email}
                  placeholder="Enter your email"
                  formikError={formik.errors.email}
                  formikTouched={formik.touched.email}
                  onChangeText={(text) => formik.setFieldValue("email", text)}
                  onBlur={() => formik.setFieldTouched("email", true)}
                  onSubmitEditing={() => formik.handleSubmit()}
                />

                <View style={styles.buttonContainer}>
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
                        name="key-outline"
                        size={24}
                        color={palette.text.inverse}
                      />
                    }
                  />
                </View>

                <View style={styles.centerText}>
                  <Text style={styles.inlineText}>
                    Remember your password?{" "}
                    <Text
                      style={styles.inlineLinkText}
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
