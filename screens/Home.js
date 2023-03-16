import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Text, Picker } from 'react-native';
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import globals from '../globals';

export default function Home({ navigation }) {
  const [user, setUser] = useState([]);

  useEffect(()=>{
      console.log("get user ");
      Axios.get(`http://localhost:3005/getuser/${globals.UserId}`, {}).then((response) => {
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
        <View style={styles.container}>
          <Button 
              title="Create Diet Plan"
              onPress={() => navigation.navigate("Diet Plan")}
          />
        </View>
        {/* </View><View style={styles.container}> */}
          {/* <Picker
              style={{ height: 45, width: 175 }}
              onValueChange={(itemValue, itemIndex) => changeScreen(itemValue)}
          >
              {Object.keys(options).map((key) => {
                  return (<Picker.Item label={this.props.options[key]} value={key} key={key}/>) //if you have a bunch of keys value pair
              })}
              <Picker.Item label="Select Sex" value='' />
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
          </Picker> */}
        {/* </View>
        <View style={styles.container}>
          <Button 
              title="Add User"
              onPress={() => navigation.navigate("Register")}
          />
        </View> */}
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