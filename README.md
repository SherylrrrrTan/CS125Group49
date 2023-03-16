# CS125Group49

## Commandlines of running the app

Go to the file "server.js":

```javascript
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "peiwen12", //put your own mysql localhost password in this place
  database: "test", //put your own mysql database in this place
});
```

Make another terminal to run on the client end:

```terminal
expo start
```

You can use the expo app or the web through terminal.

Make sure you have the appropriate database stored in your local machine, and make sure expo is configured: https://expo.dev/.
