import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Text } from 'react-native';
import Axios from "axios";
import React, { useState, useEffect } from 'react';

export default function Home({ navigation }) {
  const [user, setUser] = useState([]);

  useEffect(()=>{
      console.log("get user ");
      Axios.get("http://localhost:3005/getuser", {}).then((response) => {
        setUser(response.data);
        console.log(response);
      });
    }, [])

  // modify to select existing user in database dropdown menu

  return (
    <View style={styles.container}>
        {user.map((val, _) => {
          return (
            <Text style={styles.text}>
              {'\n\n\n\n\n'}
              {`Hello, ${val.name}!`}
              {'\n\n\n'}
              {`You currently weigh ${val.weight} lbs, ${Math.abs(val.goalweight - val.weight)} lbs off your goal of ${val.goalweight} lbs!`}
              {'\n\n\n\n'}
            </Text>
          );
        })}
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
  text: {
    fontFamily: 'Cochin',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});