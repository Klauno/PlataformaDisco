const express = require("express");
const router = express.Router();
const Usuario = require("../models/users");
const Album = require("../models/albums");
const jwt = require('jsonwebtoken');

const secret = 'your_secret_key';

const saltRounds = 10; // Número de rondas de sal para bcrypt

// Función para hashear la contraseña
const hashPassword = async (contrasenia) => {
  try {
    const hashedPassword = await bcrypt.hash(contrasenia, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error al hashear la contraseña');
  }
};

router.post('/', async (req,res,next)=>{
    const { contrasenia, email, nombre, apellido} = req.body
    const hashed = await hashPassword(contrasenia)
    const user = { 
        contrasenia: hashed,
         email,
         nombre,
         apellido}
    try{
      await Usuario.create(user)
      res.sendStatus(201)
    }
    catch(error){
      res.status(500).send({error: error.message})
    }
  })

  router.post('/login', async (req, res) => {
    const { email, contrasenia } = req.body;
  
    try {
      const usuario = await Usuario.findOne({ email });
  
      if (!usuario) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      const match = await bcrypt.compare(contrasenia, usuario.contrasenia);
  
      if (match) {
        const payload = { email: usuario.email, id: usuario._id }; // Puedes incluir más datos del usuario si lo necesitas
        const token = jwt.sign(payload, secret, { expiresIn: '24h' });
        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Rutas para Usuarios


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

router.put("/song/:idAlbum", async (req, res) => {
  try {
    let album = await Album.findById(req.params.idAlbum);
    album.canciones.push(req.body);
    await Album.findByIdAndUpdate(req.params.idAlbum, album, { new: true });
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