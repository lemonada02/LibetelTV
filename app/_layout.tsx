import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#ddd",
        headerTitleStyle: { fontWeight: "bold", fontSize: 25 },
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#00a0e6" },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="index" options={{headerTitle: "Libecofrade"}}/>
      <Stack.Screen name="Noticias"/>
      <Stack.Screen name="Noticias Anteriores"/>
      <Stack.Screen name="noticia/[id]" options={{headerTitle: "Noticia"}}/>
    </Stack>
  );
}
