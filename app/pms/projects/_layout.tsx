import { Stack } from "expo-router";

export default function ProjectsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="main" />
      <Stack.Screen name="client" />
    </Stack>
  );
}
