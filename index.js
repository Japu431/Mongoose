const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const linkRoute = require("./routes/linkRoute");

mongoose.connect("mongodb://localhost/newlinks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Banco carregado");
});

app.use("/", linkRoute);

app.listen(PORT, () => {
  console.log(`listening on port: http://localhost:${PORT}!!`);
});
