import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { ThemeProvider } from "@/theme";
import { ACLProvider } from "../acl/context";
import { CustomDrawer } from "../components/navigation/CustomDrawer";
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
    return null;
  }

  return (
    <ReduxProvider>
      <NetworkProvider>
        <ACLProvider>
          <ThemeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Drawer
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{
                  headerShown: false,
                  drawerStyle: {
                    width: 280,
                  },
                  swipeEnabled: true,
                  drawerType: "front",
                }}
              >
                <Drawer.Screen
                  name="index"
                  options={{ drawerItemStyle: { display: "none" } }}
                />
                <Drawer.Screen
                  name="auth"
                  options={{ drawerItemStyle: { display: "none" } }}
                />
                <Drawer.Screen
                  name="dashboard"
                  options={{ drawerItemStyle: { display: "none" } }}
                />
                <Drawer.Screen
                  name="pms"
                  options={{ drawerItemStyle: { display: "none" } }}
                />
                <Drawer.Screen
                  name="efs"
                  options={{ drawerItemStyle: { display: "none" } }}
                />
                <Drawer.Screen
                  name="profile"
                  options={{ drawerItemStyle: { display: "none" } }}
                />
                <Drawer.Screen
                  name="+not-found"
                  options={{ drawerItemStyle: { display: "none" } }}
                />
              </Drawer>
              <GlobalOfflineIndicator variant="banner" position="top" />
              <StatusBar style="auto" />
            </GestureHandlerRootView>
          </ThemeProvider>
        </ACLProvider>
      </NetworkProvider>
    </ReduxProvider>
  );
}
