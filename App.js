import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-get-random-values';
import { useMutation, useQuery } from './convex/_generated/react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import Test from './components/Test';


const convex = new ConvexReactClient("https://frugal-crocodile-166.convex.cloud", {
  // We need to disable this to be compatible with React Native
  unsavedChangesWarning: false,
});

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <View style={styles.container}>
        <Test />

        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
