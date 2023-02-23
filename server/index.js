const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "peiwen12",
  database: "test",
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

app.listen(3005, () => {
  console.log("server connected on port 3005");
});
