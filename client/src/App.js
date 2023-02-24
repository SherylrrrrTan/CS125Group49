import "./App.css";
import { useState } from "react";
import Axios from "axios";
function App() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);

  const [exampleList, setExamplelist] = useState([]);


  const getList = () => {
    Axios.get("http://localhost:3005/history", {
      
    }).then((response)=>{
      setExamplelist(response.data);
      console.log(response);
    });    
  }

  const addName = () => {
    setDate("");
    setName("");
    setSize(0);
    Axios.post("http://localhost:3005/create", {
      name: name,
      date: date,
      size: size,
    }).then(()=>{
      console.log("success");
    });
  };

  // const updateName = (id) => {
  //   Axios.put("http://localhost:3005/update", {
  //     name: newName,
  //     logId: id
  //   }).then((response)=>{

  //     setExamplelist(exampleList.map((val)=>{
  //       return val.logId === id ? 
  //       {logId: val.logId, name: newName, date: val.date, size: val.size} : val
  //     }))
  //   })
  // }

  const deleteName = (id) => {
    console.log("delete something");
    Axios.delete(`http://localhost:3005/delete/${id}`, {}).then((response)=>{
      setExamplelist(exampleList.filter((val) => {
        return val.logId !== id 
      }))
    })
  }
  return (
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
          value= {size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <button onClick={addName}>Add Food Log</button>
      </div>
      ---------------------------------------------------------
      <div className="showInfo">
        <button className="displayHistory" onClick={getList}>show history</button>

        {exampleList.map((val, key) => {
          
          return <div key={val.logId}>
            <h3>Name: {val.name}</h3>
            <div>
              {""}
              {/* <input type="text" placeholder="say something..." onChange={
                (event)=>{
                  setNewName(event.target.value);
                }
              }/> */}
              {/* <button onClick={
                () => {updateName(val.logId)}
              }>Update</button> */}
              <button onClick={()=>{deleteName(val.logId)}}>Delete</button>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
