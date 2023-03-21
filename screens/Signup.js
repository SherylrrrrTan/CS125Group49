import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, TextInput, Picker } from 'react-native';
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import globals from '../globals';

const {v4 : uuidv4} = require('uuid')

export default function Fields({ navigation }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInch, setHeightInch] = useState('');
  const [weight, setWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  // const [sleepLevel, setSleepLevel] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [success, setSuccess] = useState(false);

//   useEffect(()=>{
//     console.log("HEREEEE")
//     globals.UserId = uuidv4();
//     console.log(globals.UserId)
//     setId(globals.UserId)
//   }, [])

  useEffect(()=>{
    // Height in cm
    if (id != "") {
        const cmHeight = 2.54 * (+heightInch + (12 * +heightFeet))

        var burned = 0
        if (activityLevel === 'N') {
            burned = 200
        }
        else if (activityLevel === 'L') {
            burned = 400
        }
        else if (activityLevel === 'M') {
            burned = 600
        } else {
            burned = 800
        }

        // Men: BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years) 
        // Women: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) – (4.330 x age in years)
        if (sex === 'M') {
            var expenditure = 88.362 + (13.397 * 0.453592 * +weight) + (4.799 * cmHeight) - (5.677 * +age) + burned
        } else {
            var expenditure = 477.593 + (9.247 * 0.453592 * +weight) + (3.098 * cmHeight) - (4.330 * +age) + burned
        }

        // 3500 calories = 1 lb
        var dailycalories = expenditure - ((3500 * (+weight - +goalWeight)) / numberOfDays)
        console.log(expenditure, dailycalories);

        globals.dailyCalorie = dailycalories;

        // Dump into user database
        Axios.post("http://localhost:3005/createuser", {
            id: id,
            name: name,
            sex: sex,
            age: age,
            height: cmHeight,
            weight: weight,
            goalWeight: goalWeight,
            numDays: numberOfDays,
            exercise: activityLevel,
            expenditure: expenditure,
            dailycalories: dailycalories,
            }).then(() => {
            console.log("Successfully added to database!");
        });

        navigation.navigate("Home")
        console.log(id)
    }
  }, [id])

  const checkFields = () => {
    if (!name) {
        alert('Name is required.');
        return;
    }
    else if (!sex) {
        alert('Sex is required.');
        return;
    }
    else if (!age) {
        alert('Age is required.');
        return;
    }
    else if (isNaN(age)) {
        alert('Age must be a valid integer.');
        return;
    }
    else if (!heightFeet) {
        alert('Height in feet is required.');
        return;
    }
    else if (isNaN(heightFeet)) {
        alert('Height in feet must be a valid integer.');
        return;
    }
    else if (!heightInch) {
        alert('Height in inches is required.');
        return;
    }
    else if (isNaN(heightInch)) {
        alert('Height in inches must be a valid integer.');
        return;
    }
    else if (!weight) {
        alert('Weight is required.');
        return;
    }
    else if (isNaN(weight)) {
        alert('Weight must be a valid float.');
        return;
    }
    else if (!goalWeight) {
        alert('Goal weight is required.');
        return;
    }
    else if (isNaN(goalWeight)) {
        alert('Goal weight must be a valid float.');
        return;
    }
    else if (!activityLevel) {
        alert('Activity level is required.');
        return;
    }
    else if (!numberOfDays) {
        alert('Length of program is required.');
        return;
    }
    else if (isNaN(numberOfDays)) {
        alert('Length of program must be a valid integer.');
        return;
    }
    else {
        setSuccess(true)

        globals.UserId = uuidv4();
        console.log(globals.UserId)
        setId(globals.UserId)
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.layout}>
            <View style={styles.entryBox}>
                <TextInput
                    style={styles.entry}
                    onChangeText={(name) => setName(name)}
                    placeholder="Enter Name"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                    numberOfLines={4}
                />
            </View>
            <View style={styles.entryBox}>
                <Picker
                    style={{ height: 45, width: 175 }}
                    onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
                >
                    <Picker.Item label="Select Sex" value='' />
                    <Picker.Item label="Male" value="M" />
                    <Picker.Item label="Female" value="F" />
                </Picker>
            </View>
            <View style={styles.entryBox}>
                <TextInput
                    style={styles.entry}
                    onChangeText={(age) => setAge(age)}
                    placeholder="Enter Age"
                    placeholderTextColor="#8b9cb5"
                    keyboardType='numeric'
                    numberOfLines={4}
                />
            </View>
        </View>
        <View style={styles.layout}>
            <View style={styles.entryBox}>
                <TextInput
                    style={styles.entry}
                    onChangeText={(feet) => setHeightFeet(feet)}
                    placeholder="Enter Height in Feet"
                    placeholderTextColor="#8b9cb5"
                    keyboardType='numeric'
                    numberOfLines={4}
                />
            </View>
            <View style={styles.entryBox}>
                <TextInput
                    style={styles.entry}
                    onChangeText={(inch) => setHeightInch(inch)}
                    placeholder="Enter Height in Inches"
                    placeholderTextColor="#8b9cb5"
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.entryBox}>
                <TextInput
                    style={styles.entry}
                    onChangeText={(weight) => setWeight(weight)}
                    placeholder="Enter Weight"
                    placeholderTextColor="#8b9cb5"
                    keyboardType='numeric'
            />
            </View>
        </View>
        <View style={styles.layout}>
            <View style={styles.entryBox}>
                <TextInput
                    style={styles.entry}
                    onChangeText={(goal) => setGoalWeight(goal)}
                    placeholder="Enter Goal Weight"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                />
            </View>
            <View style={styles.entryBox}>
                <Picker
                    style={{ height: 45, width: 175 }}
                    onValueChange={(itemValue, itemIndex) => setActivityLevel(itemValue)}
                >
                    <Picker.Item label="Select Activity Level" value='' />
                    <Picker.Item label="None" value="N" />
                    <Picker.Item label="Low" value="L" />
                    <Picker.Item label="Moderate" value="M" />
                    <Picker.Item label="High" value="H" />
                </Picker>
            </View>
            <View style={styles.entryBox}>
                <TextInput
                    style={styles.entry}
                    onChangeText={(days) => setNumberOfDays(days)}
                    placeholder="Enter Duration in Days"
                    placeholderTextColor="#8b9cb5"
                    autoCapitalize="sentences"
                />
            </View>
        </View>
        <View style={styles.container}>
            <Button 
                title="Sign Up"
                onPress={checkFields}
            />
            <StatusBar style="auto" />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    entry: {
        flex: 1,
        color: 'black',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 0.9,
        borderRadius: 30,
        borderColor: 'black', //#dadae8
    },
    entryBox: {
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
    },
    layout: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
});
