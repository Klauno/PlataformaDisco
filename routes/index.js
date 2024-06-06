const express = require("express");
const router = express.Router();
const Usuario = require("../models/users");
const Album = require("../models/albums");

// Rutas para Usuarios
router.post("/Usuario", async (req, res) => {
  try {
    await Usuario.create(req.body);
    res.status(200).send("Funciono todo bien");
  } catch (error) {
    res.status(500).send("error del servidor");
  }
});
 

router.post('/', async (req,res,next)=>{
  const { contrasenia, email, nombre, apellido} = req.body
  const hashed = await hashPassword(contrasenia)
  const user = { 
      contrasenia: hashed,
       email,
       nombre,
       apellido}
  try{
    await User.create(user)
    res.sendStatus(201)
  }
  catch(error){
    res.status(500).send({error: error.message})
  }
})



router.get("/Usuario/todos", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    if (usuarios.length) {
      res.status(200).send({ Usuarios: usuarios });
    } else {
      res.status(200).send("No hay usuarios guardados");
    }
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

router.delete("/Usuario/:id", async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

// Rutas para Albums
router.post("/album/agregar", async (req, res) => {
  try {
    let album = await Album.create(req.body);
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error al agregar un album": error });
  }
});

router.put("/album/:id", async (req, res) => {
  try {
    console.log(req.params.id); // Verifica el ID del álbum
    console.log(req.body); // Verifica el cuerpo de la solicitud
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error al actualizar el álbum": error });
  }
});

router.put("/song/:id", async (req, res) => {
  try {
    let album = await Album.findById(req.params.id);
    album.canciones.push(req.body);
    await Album.findByIdAndUpdate(req.params.id, album, { new: true });
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error al agregar una canción": error });
  }
});

router.put("/song/delete/:idAlbum", async (req, res) => {
  let idSong = req.query.idSong;
  try {
    let album = await Album.findById(req.params.idAlbum);
    let albumActualizado = album.canciones.filter(cancion => cancion._id != idSong);
    album.canciones = albumActualizado;
    await Album.findByIdAndUpdate(req.params.idAlbum, album, { new: true });
    res.status(200).send({ mensaje: "Cancion eliminada correctamente" });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/album/todos", async (req, res) => {
  try {
    let albums = await Album.find();
    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send({ "error solicitar todos los albums": error });
  }
});

router.get("/album/:id", async (req, res) => {
  try {
    let album = await Album.findById(req.params.id);
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error al solicitar el album": error });
  }
});

router.delete("/album/:idAlbum", async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.idAlbum);
    res.status(200).send("Album eliminado correctamente");
  } catch (error) {
    res.status(500).send({ "error al eliminar el album": error });
  }
});


module.exports = router;
