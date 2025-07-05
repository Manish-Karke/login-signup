const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./src/config/authRoutes");
const porrouter = require("./src/config/productRouter");
require("dotenv").config();
require("./src/models/db");
const PORT = 7000;
const URL = "127.0.0.1"; // safer

// app.get("/manis", (req, res) => {
//   res.send("hello manish");
// });

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", router);
app.use("/product", porrouter);

app.listen(PORT, URL, (error) => {
  if (!error) {
    console.log(`http://${URL}:${PORT}`);
  } else {
    console.error("Error starting server:", error);
  }
});
