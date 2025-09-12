import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Page</Text>
      <Button
        title="Go to Register"
        onPress={() => router.push("/auth/register")}
      />
    </View>
  );
}
