const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.post("/api/chat", async (req, res) => {
  const userInput = req.body.input;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userInput },
        ],
      },
      {
        headers: {
          Authorization: "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",
          "Content-Type": "application/json",
        },
      }
    );

    const chatResponse = response.data.choices[0].message.content;

    const responseData = {
      output: chatResponse,
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
