import { Stack } from "expo-router";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const themeContainerStyle =
    colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;
  return (
  <Stack screenOptions={{contentStyle:themeContainerStyle,headerShown:false,}} >
<Stack.Screen name="index" options={{ headerShown: false }} />
<Stack.Screen name="employee-list" options={{ title: 'Employee List' }} />
  </Stack>
);
}

const styles = StyleSheet.create({
  lightBackground:{backgroundColor:"#e0f2fe"},
  darkBackground:{backgroundColor:"#0f172a"}
})
