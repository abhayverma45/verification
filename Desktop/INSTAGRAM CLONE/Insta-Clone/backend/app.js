const express = require("express");
const app = express();
const PORT = 8000;
app.use(express.json())
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const {mongo_url} = require("./keys");
require("./models/model");
require("./models/post")
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))


mongoose.connect(mongo_url);
mongoose.connection.on("connected", () => {
  console.log("successfully connected mongoose");
});
mongoose.connection.on("error", () => {
  console.log("successfully not connected mongoose");
});



app.listen(PORT, () => {
  console.log("server is running at port no" + " " + PORT);
});

// Abhayverma356 mongodb password and username

// **server is made by node js ,we can also form server by express js is eaasy way .**

// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log("server is created");
//   res.end("hello world from abhay ");
// });

// server.listen(8000, "localhost", () => {
//   console.log("server is running at port no 8000");
// });
