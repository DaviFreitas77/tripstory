import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="OnboardingScreen">
      <Stack.Screen
        name="Auth/Login"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerTitle: "",
          headerShadowVisible: false,
        
        }}
      />
         <Stack.Screen
        name="Auth/Register"
        options={{
          headerShown: true,
          headerBackButtonDisplayMode: "minimal",
          headerTitle: "",
          headerShadowVisible: false,
        
        }}
      />
      <Stack.Screen
        name="OnboardingScreen"
        options={{
          headerShown: false,
          

        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}