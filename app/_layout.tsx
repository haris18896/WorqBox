import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ThemeProvider } from "@/theme";
import { ACLProvider } from "../acl/context";
import { GlobalOfflineIndicator } from "../components/ui/GlobalOfflineIndicator";
import { NetworkProvider } from "../contexts/NetworkContext";
import { ReduxProvider } from "../providers/ReduxProvider";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ReduxProvider>
      <NetworkProvider>
        <ACLProvider>
          <ThemeProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="auth/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="auth/register"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <GlobalOfflineIndicator variant="notification" position="top" />
            <StatusBar style="auto" />
          </ThemeProvider>
        </ACLProvider>
      </NetworkProvider>
    </ReduxProvider>
  );
}
