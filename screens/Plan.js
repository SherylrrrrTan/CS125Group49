import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import { useState, useEffect } from "react";
import Axios from "axios";

const {v4 : uuidv4} = require('uuid')

export default function Plan({ navigation }) {
  const [id, setId] = useState("");
  const [flag, setFlag] = useState(false);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);

  const [exampleList, setExamplelist] = useState([]);

  useEffect(()=>{
    // Height in cm
    console.log("Food ID: " + id)
    if (id != "") {
      Axios.post("http://localhost:3005/create", {
        logid: id,
        name: name,
        date: date,
        size: size,
      }).then(() => {
        setDate("");
        setName("");
        setSize(0);
        console.log("success");
      });
    }
  }, [id])

  const getList = () => {
    if(!flag){
      console.log("get list ");
      setFlag(true);
      Axios.get("http://localhost:3005/history", {}).then((response) => {
        setExamplelist(response.data);
        console.log(response);
      });
    }

  };

  const cancelView = () => {
    setFlag(false);
    setExamplelist([]);
  }

  const addName = () => {
    setId(uuidv4())
    // Axios.post("http://localhost:3005/create", {
    //   logid: id,
    //   name: name,
    //   date: date,
    //   size: size,
    // }).then(() => {
    //   setDate("");
    //   setName("");
    //   setSize(0);
    //   console.log("success");
    // });
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
  return (
    <View style={styles.container}>
    <div className="App">
      <div className="information">
        <label>Date</label>
        <input
          type="text"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <label>Food Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Serving Size</label>
        <input
          type="number"
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <button onClick={addName}>Add Food Log</button>
      </div>
      ---------------------------------------------------------
      <div className="showInfo">
        <button
          className="displayHistory"
          onClick={getList }
        >
          show history
        </button>
        {flag && <button onClick={cancelView}>cancel</button>}
        {exampleList.map((val, key) => {
          return (
            <div key={val.logId}>
              <h3>Name: {val.name}</h3>
              <div>
                {""}
                <button
                  onClick={() => {
                    deleteName(val.logId);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
