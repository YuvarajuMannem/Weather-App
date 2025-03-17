const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const apiKey = "393e800d8d1e9ab2897dd012afc3c960"; // Replace with your Weatherstack API key
    const APIUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    
    let weather;
    let error = null;

    try {
        const response = await axios.get(APIUrl);
        weather = response.data;
        if (weather.error) {
            throw new Error(weather.error.info);
        }
    } catch (err) {
        weather = null;
        error = "Error: City not found or API request failed. Please try again.";
        console.error(err); // Log the error for debugging
    }

    res.render("index", { weather, error });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});