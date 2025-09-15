import { useTheme } from "@/theme";
import { Stack } from "expo-router";

export default function ProjectsLayout() {
  const { palette } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: palette.background.primary,
        },
        headerTintColor: palette.text.primary,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Projects Main",
        }}
      />
      <Stack.Screen
        name="client"
        options={{
          title: "Client Management",
        }}
      />
    </Stack>
  );
}
