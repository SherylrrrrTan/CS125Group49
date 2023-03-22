import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Picker } from "react-native";
import { useState, useEffect } from "react";
import Axios from "axios";
// import FoodCard from "./components/foodCard";
import "./Plan.css"
import globals from '../globals';
import 'element-theme-default';
import { Layout, Card, Button } from "element-react";

const { v4: uuidv4 } = require("uuid");

export default function Plan({ navigation }) {
  const dailycalories = globals.dailyCalorie;
  const [food, setFood] = useState([]);
  // const url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=b913e7e7fd1c4068bbcdb1f2b3fcdfbe&minCalories=${dailycalories/3*0.6}&maxCalories=${dailycalories/3}&number=3`;
  // const url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=b913e7e7fd1c4068bbcdb1f2b3fcdfbe&minCalories=200&maxCalories=700&number=3`;
  const url = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=c5e55105b1584978861a94993e831a9e&minCalories=${dailycalories/3*0.6}&maxCalories=${dailycalories/3}&number=3`;
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
    fetchFoodData();
    // if (success) {
    //   console.log("change to success");
    // }
  }, [dailycalories])

  const [exampleList, setExamplelist] = useState([]);
  const [id, setId] = useState("");
  const [flag, setFlag] = useState(false);
  const [activityLevel, setActivityLevel] = useState('');
  const [success, setSuccess] = useState(false);
  // const [date, setDate] = useState("");
  // const [name, setName] = useState("");
  // const [size, setSize] = useState(0);
  const getList = () => {
    if (!flag) {
      console.log("get list ");
      setFlag(true);
      Axios.get("http://localhost:3005/history", {}).then((response) => {
        setExamplelist(response.data);
        console.log(response);
      });
    }
  }

  const cancelView = () => {
    setFlag(false);
    setExamplelist([]);
  }

  const addName = (id, name) => {
    // setId(uuidv4())
    Axios.post("http://localhost:3005/create", {
      logid: id,
      name: name,
      date: "3/15",
      size: 1,
    }).then(() => {
      // setDate("");
      // setName("");
      // setSize(0);
      console.log("success");
    });
  };

  const deleteName = (id) => {
    console.log("delete something");
    Axios.delete(`http://localhost:3005/delete/${id}`, {}).then((response) => {
      setExamplelist(
        exampleList.filter((val) => {
          return val.logId !== id;
        })
      );
    });
  };

  const updateActivityLevel = () => {
    console.log("update activity level");
    if (activityLevel === 'N') {
      globals.dailyCalorie = dailycalories * 0.75;
    }
    else if (activityLevel === 'L') {
      globals.dailyCalorie = dailycalories * 0.9;
    }
    else if (activityLevel === 'M') {
      globals.dailyCalorie = dailycalories * 1.1;
    }
    else {
      globals.dailyCalorie = dailycalories * 1.25;
    }
    console.log(globals.dailyCalorie);
  }


  return (
      <div>
        <Layout.Row>
          {food.map((item) => (
            <Layout.Col span={ 8 } offset={ 0 } key={item.id}>
              <Card bodyStyle={{ padding: 0 }}>
                <img src={item.image} className="image" />
                <div style={{ padding: 14 }}>
                  <span>{item.title}</span>
                  <div className="bottom clearfix">
                    <time className="time">calorie: {item.calories}</time>
                    <Button type="text" onClick={() => {addName(item.id, item.title);}}>Add</Button>
                  </div>
                </div>
              </Card>
            </Layout.Col>
          ))}
        </Layout.Row>
        <Layout.Row>
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
          <Button type="primary" onClick={() => {updateActivityLevel();}}>
            update
          </Button>
        </Layout.Row>
    <div className="showInfo">
      <Layout.Row>
      <Button plain={true} type="primary"
            className="displayHistory"
            onClick={getList }
          >
            show history
          </Button>
          {flag && <Button plain={true} type="primary" onClick={cancelView}>cancel</Button>}
      </Layout.Row>
          {exampleList.map((val, key) => {
                return (
                    <Layout.Col span={ 8 } offset={ 0 } key={val.logId}>
                      <Card bodyStyle={{ padding: 0 }}>
                        <div style={{ padding: 14 }}>
                          <span>{val.name}</span>
                          <Button plain={true} type="danger"
                                  onClick={() => {
                                    deleteName(val.logId);
                                  }}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card>
                    </Layout.Col>
                    // <Layout.Col key={val.logId}>
                    //   <h3>Name: {val.name}</h3>
                    //   <div>
                    //     {""}
                    //     <Button plain={true} type="danger"
                    //                      onClick={() => {
                    //                        deleteName(val.logId);
                    //                      }}
                    //     >
                    //       Delete
                    //     </Button>
                    //   </div>
                    // </Layout.Col>
                );
              })}
      </div>
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
