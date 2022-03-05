const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const User = require("./models/user");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connection established with Mongo DB");
});

app.get("/", function (req, res) {
  res.send("Hello Samyak P");
});

const userRoutes = require("./routes/users");
// const subsRoutes = require("./routes/subscribers");
const patientRoutes = require("./routes/patients");

app.use("/patients", patientRoutes);
app.use("/users", userRoutes);
// app.use("/subscribe", subsRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
