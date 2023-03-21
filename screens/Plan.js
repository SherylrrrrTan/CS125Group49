import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";
import { useState, useEffect } from "react";
import Axios from "axios";
import FoodCard from "./components/foodCard";
import "./Plan.css"
import globals from '../globals';

const { v4: uuidv4 } = require("uuid");

export default function Plan({ navigation }) {
  const dailycalories = globals.dailyCalorie;
  const [food, setFood] = useState([])
  const url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=b913e7e7fd1c4068bbcdb1f2b3fcdfbe&minCalories=${dailycalories/3-400}&maxCalories=${dailycalories/3}&number=3`;

  const fetchFoodData = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setFood(data);
    }
      
    )
    .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchFoodData()
  }, [])


  return (
    <div>
      {food.map((item) => (
        <div className="card">
          <div>name: {item.title}</div>
          <div>calorie: {item.calories}</div>
          <img src={item.image} />
        </div>
      ))}
    </div>
    // <View style={styles.container}>
    //   {/* <StatusBar style="auto" /> */}

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
