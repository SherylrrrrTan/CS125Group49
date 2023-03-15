const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "users",
});

//insert stuff into db
app.post("/create", (req, res) => {
  //get info from frontend
  const name = req.body.name;
  const size = req.body.size;
  const date = req.body.date;

  db.query(
    "INSERT INTO userFoodLog (name, size, date) VALUES (?,?,?)",
    [name, size, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("value inserted");
        console.log("value inserted");
      }
    }
  );
  //question mark for secrutiy
});

app.get("/history", (req,res) => {
    db.query("SELECT * FROM userFoodLog", (err, result) => {
        if (err) {
            console.log(err);
          } else {
            res.send(result);
          }        
    })
})

// app.put('/update', (req, res) => {
//   const id = req.body.id;
//   const name = req.body.name;
//   db.query("UPDATE userFoodLog SET name = ? where logId = ? ", [name, id], (err, result)=>{
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }   
//   });
// });

app.delete("/delete/:logId", (req, res)=>{
  const id = req.params.logId;
  db.query("DELETE FROM userFoodLog where logId = ?", id, (err,result)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }      
  })
})

// add to user db
app.post("/createuser", (req, res) => {
    //get info from frontend
    const id = req.body.id;
    const name = req.body.name;
    const sex = req.body.sex;
    const age = req.body.age;
    const height = req.body.height;
    const weight = req.body.weight;
    const goalWeight = req.body.goalWeight;
    const numDays = req.body.numDays;
    const exercise = req.body.exercise;
    const expenditure = req.body.expenditure;
  
    db.query(
      "INSERT INTO users.user (id, name, sex, age, height, weight, goalweight, numdays, exercise, expenditure) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [id, name, sex, age, height, weight, goalWeight, numDays, exercise, expenditure],
      (err, result) => {
        if (err) {
          console.log("Error inserting")
          console.log(err);
        } else {
          res.send("value inserted");
          console.log("value inserted");
        }
      }
    );
    //question mark for secrutiy
});

app.get("/getuser", (req,res) => {
    db.query("SELECT * FROM users.user WHERE id = 1", (err, result) => {
        if (err) {
            console.log("Error retrieving")
            console.log(err);
          } else {
            res.send(result);
          }        
    })
})

app.listen(3005, () => {
  console.log("server connected on port 3005");
});