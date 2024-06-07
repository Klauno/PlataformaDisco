const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/index");

require('dotenv').config();

const url = "mongodb+srv://oliverioclau:maxi2006@cluster0.kyyppkd.mongodb.net/Proyecto_2?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

const connectMongo = async () => {
  try {
    await mongoose.connect(url, );
    app.listen(3000, () => {
      console.log("Escuchando en el puerto 3000 y la base de datos conectada");
    });
  } catch (error) {
    console.log(error);
  }
};

connectMongo();
