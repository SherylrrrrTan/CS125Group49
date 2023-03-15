import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Text } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <img src={require('../heart.png')} />
      <Text style={styles.text}>
        {'\n\n\n\n\n'}
        {'Welcome to MyHealth, an app that gives you the opportunity to achieve weight goals through a personalized diet plan.'}
        {'\n\n\n\n'}
       </Text>
      <Button 
        title="Get Started"
        onPress={() => navigation.navigate("Register")}
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
  text: {
    fontFamily: 'Cochin',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
