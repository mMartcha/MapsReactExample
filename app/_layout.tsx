import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

 

  return (
      <Stack screenOptions={{headerShown:false}}>

      </Stack>
  );
}
