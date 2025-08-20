const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

//  Middlewares
app.use(cors()); // cross-origin allowed
app.use(morgan("dev")); // logging for requests
app.use(express.json());

//  Root route
app.get("/", (req, res) => {
  res.send(`
    <h1>Timestamp Microservice</h1>
    <p>Use <code>/api/:date?</code> to get Unix and UTC time</p>
    <ul>
      <li><a href="/api/">Current time</a></li>
      <li><a href="/api/2015-12-25">Example: /api/2015-12-25</a></li>
      <li><a href="/api/1451001600000">Example: /api/1451001600000</a></li>
    </ul>
  `);
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  let dateInput = req.params.date;
  let date;

  if (!dateInput) {
    // Agar koi input nahi hai → current date
    date = new Date();
  } else {
    // Agar sirf number hai → unix timestamp
    if (!isNaN(dateInput)) {
      date = new Date(parseInt(dateInput));
    } else {
      date = new Date(dateInput);
    }
  }

  // Agar date invalid hai
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  //  Extra features
  const response = {
    unix: date.getTime(),
    utc: date.toUTCString(),
    iso: date.toISOString(), // ISO 8601 format
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
  };

  return res.json(response);
});

//  Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
