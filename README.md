# CS125Group49

## Commandlines of running the app

Go to the file "index.js" in server folder and check out the code in line 9:

```javascript
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "peiwen12", //put your own mysql localhost password in this place
  database: "test", //put your own mysql database in this place
});
```

Get into the server folder, then do:

```terminal
node index.js
```

Make another terminal to run on the client end, still navigate to the client folder and do:


```terminal
npm start
```

Make sure you have the appropriate database stored in your local machine.
