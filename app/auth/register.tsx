import Badge from "@/components/ui/Badge";
import BarHeader from "@/components/ui/BarHeader";
import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Modal from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";
import { useTheme } from "@/theme";
import { spacing } from "@/theme/stylingConstants";
import { RegisterFormData } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import {
  Alert,
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

  // New component states
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSuccessBottomSheet, setShowSuccessBottomSheet] = useState(false);
  const [showDemoEmpty, setShowDemoEmpty] = useState(false);

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
        setShowSuccessBottomSheet(true);
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
          {/* BarHeader Component Demo */}
          <BarHeader
            title="Create Account"
            subtitle="Join us and start your journey!"
            showBackButton
            onBackPress={() => router.back()}
            rightIcon="help-circle-outline"
            onRightPress={() => setShowDemoEmpty(true)}
            variant="large"
          />

          {/* Demo Badge */}
          <View style={{ alignItems: "center", marginBottom: spacing.lg }}>
            <Badge variant="success" size="small">
              New User Registration
            </Badge>
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
              // disabled={true} // Uncomment to see disabled state demo
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
              disabled={!formik.values.password} // Disable until password is entered
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
                <Text
                  style={styles.termsLink}
                  onPress={() => setShowTermsModal(true)}
                >
                  Terms and Conditions
                </Text>{" "}
                and{" "}
                <Text
                  style={styles.termsLink}
                  onPress={() => setShowPrivacyModal(true)}
                >
                  Privacy Policy
                </Text>
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

      {/* Loading Component Demo */}
      <Loading
        visible={isLoading}
        text="Creating your account..."
        variant="spinner"
        size="large"
        overlay
      />

      {/* Terms Modal Demo */}
      <Modal
        visible={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms and Conditions"
        subtitle="Please read our terms carefully"
        variant="centered"
        animationType="fade"
        width="90%"
        height="70%"
      >
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: palette.text.primary,
            }}
          >
            Welcome to WorkBox! These terms and conditions outline the rules and
            regulations for the use of our application.
            {"\n\n"}
            By accessing this app, we assume you accept these terms and
            conditions. Do not continue to use WorkBox if you do not agree to
            take all of the terms and conditions stated on this page.
            {"\n\n"}
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and all Agreements:
            &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the person log on this
            website and compliant to the Company&apos;s terms and conditions.
          </Text>
          <Button
            title="I Understand"
            onPress={() => setShowTermsModal(false)}
            variant="primary"
            fullWidth
            style={{ marginTop: spacing.lg }}
          />
        </ScrollView>
      </Modal>

      {/* Privacy Modal Demo */}
      <Modal
        visible={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Privacy Policy"
        subtitle="How we protect your data"
        variant="centered"
        animationType="slide"
        width="95%"
        height="60%"
      >
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              color: palette.text.primary,
            }}
          >
            At WorkBox, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our mobile application.
            {"\n\n"}
            Information We Collect: • Personal Information (name, email, phone
            number) • Usage Data (how you interact with our app) • Device
            Information (device type, operating system)
            {"\n\n"}
            How We Use Your Information: • To provide and maintain our service •
            To notify you about changes to our service • To provide customer
            support • To gather analysis or valuable information
          </Text>
          <Button
            title="Got It"
            onPress={() => setShowPrivacyModal(false)}
            variant="secondary"
            fullWidth
            style={{ marginTop: spacing.lg }}
          />
        </ScrollView>
      </Modal>

      {/* Success Bottom Sheet Demo */}
      <BottomSheet
        visible={showSuccessBottomSheet}
        onClose={() => setShowSuccessBottomSheet(false)}
        title="Account Created Successfully!"
        height="50%"
        showHandle
        showHeader
      >
        <View style={{ alignItems: "center", paddingVertical: spacing.lg }}>
          <Ionicons
            name="checkmark-circle"
            size={80}
            color={palette.success.main}
            style={{ marginBottom: spacing.lg }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: palette.text.primary,
              textAlign: "center",
              marginBottom: spacing.sm,
            }}
          >
            Welcome to WorkBox!
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: palette.text.secondary,
              textAlign: "center",
              marginBottom: spacing.xl,
              lineHeight: 20,
            }}
          >
            Your account has been created successfully. You can now start using
            all the features of our platform.
          </Text>
          <Button
            title="Continue to Login"
            onPress={() => {
              setShowSuccessBottomSheet(false);
              router.push("/auth/login");
            }}
            variant="primary"
            fullWidth
            size="large"
          />
        </View>
      </BottomSheet>

      {/* Demo Empty Component */}
      <Modal
        visible={showDemoEmpty}
        onClose={() => setShowDemoEmpty(false)}
        title="Help & Support"
        variant="fullscreen"
        animationType="slide"
      >
        <Empty
          title="Need Help?"
          subtitle="We're here to assist you with any questions or issues you might have."
          icon="help-circle-outline"
          actionText="Contact Support"
          onActionPress={() => {
            setShowDemoEmpty(false);
            Alert.alert("Support", "Support team will contact you soon!");
          }}
        >
          <View style={{ marginTop: spacing.lg }}>
            <Text
              style={{
                fontSize: 14,
                color: palette.text.secondary,
                textAlign: "center",
                marginBottom: spacing.md,
              }}
            >
              Common Questions:
            </Text>
            <View style={{ gap: spacing.sm }}>
              <Text style={{ fontSize: 14, color: palette.text.primary }}>
                • How do I reset my password?
              </Text>
              <Text style={{ fontSize: 14, color: palette.text.primary }}>
                • What features are available?
              </Text>
              <Text style={{ fontSize: 14, color: palette.text.primary }}>
                • How do I update my profile?
              </Text>
            </View>
          </View>
        </Empty>
      </Modal>
    </KeyboardAvoidingView>
  );
}
