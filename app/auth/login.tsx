import React, { useEffect, useRef, useState } from "react";
import {
  Image,
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

// ** Utils
import { createAuthStyles } from "@/styles";
import { scaleSize, useTheme } from "@/theme";
import { LoginFormData } from "@/types";

// ** Third Party Packages
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

// Import UI components
import Button from "@/components/ui/Button/Button";
import TextInput from "@/components/ui/TextInput/TextInput";

// ** Store
import { storageService } from "@/services/storage";
import { useAppDispatch } from "@/store";
import { useLoginMutation } from "@/store/api/authApi";
import { clearError, setUser } from "@/store/slices/authSlice";

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
  const [rememberMe, setRememberMe] = useState(true);
  const [loginCreds, setLoginCreds] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();

  // Refs for input navigation
  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);

  // Create styles using common auth styles
  const styles = createAuthStyles(palette);

  useEffect(() => {
    const loadStoredCredentials = async () => {
      const storedLoginCreds = await storageService.getItem("login_creds");
      if (storedLoginCreds) {
        const parsedCreds = JSON.parse(storedLoginCreds);
        setLoginCreds(parsedCreds);
      }
    };
    loadStoredCredentials();
  }, [rememberMe]);

  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: loginCreds.email || "",
      password: loginCreds.password || "",
      rememberMe: false,
    },
    validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        dispatch(clearError());
        const result = await loginMutation({
          username: values.email,
          password: values.password,
        }).unwrap();

        const user = {
          id: result.id,
          employeeId: result.employeeId,
          fullName: result.fullName,
          email: result.email,
          imageUrl: result.imageUrl,
          username: result.username,
          allowedRoles: result.allowedRoles,
        };

        await storageService.setItem("user", JSON.stringify(user));

        const userDetails = {
          ...user,
          allowedRoles: result.allowedRoles,
          allowedModules: result.allowedModules,
          allowedPagePermissions: result.allowedPagePermissions,
        };

        dispatch(setUser(userDetails));

        if (rememberMe) {
          await storageService.setItem("login_creds", JSON.stringify(values));
        }

        router.replace("/pms/Dashboard");
      } catch (error: any) {
        let errorMessage = "Login failed. Please try again.";

        if (error?.data?.message) {
          errorMessage = error.data.message;
        } else if (error?.data?.errors && Array.isArray(error.data.errors)) {
          errorMessage = error.data.errors.join(", ");
        } else if (error?.message) {
          errorMessage = error.message;
        }

        Toast.show({
          type: "error",
          text1: "Login Error",
          text2: errorMessage,
        });
      }
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
                <View style={styles.buttonContainer}>
                  <Button
                    title="Login"
                    onPress={formik.handleSubmit}
                    loading={isLoginLoading}
                    disabled={isLoginLoading}
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

                <View style={styles.centerText}>
                  <Text style={styles.inlineText}>
                    Don&apos;t have an account?{" "}
                    <Text
                      style={styles.inlineLinkText}
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
