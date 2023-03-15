import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import Axios from "axios";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
        <h1>
            Hello!
        </h1>
        <Button 
            title="Create Diet Plan"
            onPress={() => navigation.navigate("Diet Plan")}
        />
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