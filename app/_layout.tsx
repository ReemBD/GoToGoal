import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="index"
      options={
        {
          title: 'GO TO GOAL',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0a0a23',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }
      }
    />
  </Stack>;
}
