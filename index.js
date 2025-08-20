// server.js
const express = require("express");
const cors = require("cors");

const app = express();

//  Middleware
app.use(cors({ optionsSuccessStatus: 200 })); // to handle FCC legacy browser
app.use(express.static("public"));
app.use(express.json());

//  Root route
app.get("/", (req, res) => {
  res.send(`
    <h1>Timestamp Microservice</h1>
    <p>Usage:</p>
    <ul>
      <li><code>/api/</code> → current timestamp</li>
      <li><code>/api/:date</code> → pass date string or unix timestamp</li>
    </ul>
  `);
});

// API route
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  let date;

  // Case 1: no param → current time
  if (!dateParam) {
    date = new Date();
  }
  // Case 2: numeric unix timestamp
  else if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  }
  // Case 3: date string
  else {
    date = new Date(dateParam);
  }

  // Case 4: invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  //  Response object
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

//  Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
