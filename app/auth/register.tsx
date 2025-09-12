import { useTheme } from "@/src/theme";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Register() {
  const router = useRouter();
  const { toggleTheme, isDark, palette } = useTheme();

  // Fallback styles in case theme styles don't work
  const fallbackStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.background.primary,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: palette.text.primary,
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: palette.text.secondary,
      marginBottom: 40,
      textAlign: "center",
    },
    buttonContainer: {
      width: "100%",
      maxWidth: 300,
    },
    primaryButton: {
      backgroundColor: palette.primary.main,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    outlineButton: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: palette.border.primary,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    primaryButtonText: {
      color: palette.text.inverse,
      fontSize: 16,
      fontWeight: "600",
    },
    outlineButtonText: {
      color: palette.text.primary,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <View style={fallbackStyles.container}>
      <Text style={fallbackStyles.title}>Create Account</Text>
      <Text style={fallbackStyles.subtitle}>Join WorqBox today</Text>

      <View style={fallbackStyles.buttonContainer}>
        <TouchableOpacity
          style={[fallbackStyles.primaryButton, { marginBottom: 16 }]}
          onPress={() => {
            console.log("Login button pressed");
            router.push("/auth/login");
          }}
          activeOpacity={0.8}
        >
          <Text style={fallbackStyles.primaryButtonText}>Go to Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={fallbackStyles.outlineButton}
          onPress={() => {
            console.log("Theme toggle pressed");
            toggleTheme();
          }}
          activeOpacity={0.8}
        >
          <Text style={fallbackStyles.outlineButtonText}>
            Toggle Theme ({isDark ? "Dark" : "Light"})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
