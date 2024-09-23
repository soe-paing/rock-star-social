import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import { router } from "expo-router";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "purple",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen 
          name="index"
          options={{ 
            title: "Home",
            headerRight: () => {
              return <TouchableOpacity onPress={() => router.push("/add")}>
                <Icon name="add" color="white" size={24} />
              </TouchableOpacity>
            }
          }} />
        <Stack.Screen name="add" options={{ title: "Add" }} />
        <Stack.Screen name="register/index" options={{ title: "Register" }} />
        <Stack.Screen name="post/[id]" options={{ title: "Post" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
      </Stack>
      <StatusBar style="light" />
    </QueryClientProvider>
  );
}
