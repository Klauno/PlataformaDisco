const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");
require('dotenv').config();  // Cargar variables de entorno desde .env

const url = process.env.MONGO_URI;  // Usar la variable de entorno

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const connectMongo = async () => {
  try {
    await mongoose.connect(url);
    app.listen(3000, () => {
      console.log("Escuchando en el puerto 3000 y la base de datos conectada");
    });
  } catch (error) {
    console.log(error);
  }
};

connectMongo();
