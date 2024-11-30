const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./models/db");
const taskRoutes = require("./routes/taskRoutes");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.get("/", (req, res) => {
  res.send("server is working");
});

app.use(bodyParser.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
