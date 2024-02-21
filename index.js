const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/callapi", async (req, res) => {
  try {
    const { url, method, provider, prompt } = req.body;

    // Check if url, method, provider, and prompt are provided
    if (!url || !method || !provider || !prompt) {
      return res
        .status(400)
        .json({ message: "URL, method, provider, and prompt are required." });
    }

    // Make the API call using Axios
    const response = await axios({
      method: method.toUpperCase(),
      url,
      data: { provider, prompt }, // Pass provider and prompt only
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Send the API response back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
