import express from "express";

require("dotenv").config();

const app = express();

app.get("/ping", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});

module.exports = app;
