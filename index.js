const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(express.static("public"));

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "Enter a city!" });

  try {
    const response = await axios.get(
      "https://weatherapi-com.p.rapidapi.com/forecast.json",
      {
        params: { q: city, days: 5 },
        headers: {
          "X-RapidAPI-Key": process.env.API_KEY, // Your key from .env
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Oops, something went wrong!" });
  }
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
