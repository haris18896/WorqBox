import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Register() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Register Page</Text>
      <Button title="Go to Login" onPress={() => router.push("/auth/login")} />
    </View>
  );
}
