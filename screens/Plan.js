import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';

export default function Plan({ navigation }) {
  return (
    <View style={styles.container}>
        <h1>
            Hello!
        </h1>
        <StatusBar style="auto" />
    </View>
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