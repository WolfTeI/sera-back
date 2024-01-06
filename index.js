const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");

//Middlewares
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Server started!");
});
