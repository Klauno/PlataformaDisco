const express = require("express");
const router = express.Router();
const Usuario = require("../models/users");
const Album = require("../models/albums");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'maximo'; 
const saltRounds = 10; // Número de rondas de sal para bcrypt

// Función para generar token JWT
const generateAuthToken = (user) => {
  return jwt.sign({ _id: user._id }, JWT_SECRET);
};

// Función para hashear la contraseña
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error al hashear la contraseña');
  }
};

// Rutas para Usuarios

// Registro de usuario
router.post("/Usuario", async (req, res) => {
  try {
    const { nombre, apellido, email, contrasenia, foto } = req.body;

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await hashPassword(contrasenia);

    const nuevoUsuario = {
      nombre,
      apellido,
      email,
      contrasenia: hashedPassword, // Guardar la contraseña hasheada
      foto,
    };

    await Usuario.create(nuevoUsuario);
    res.status(200).send("Registro exitoso");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error del servidor");
  }
});

// Inicio de sesión de usuario
router.post("/Usuario/login", async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).send("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(contrasenia, usuario.contrasenia);

    if (!isMatch) {
      return res.status(400).send("Contraseña incorrecta");
    }

    // Generar token JWT si es necesario
    const token = generateAuthToken(usuario); // Asumiendo que tienes una función generateAuthToken definida

    // Devolver los datos del usuario
    res.status(200).json({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      foto: usuario.foto, // Ajusta según la estructura de tu modelo de usuario
      token: token, // Opcional: devolver el token de autenticación
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send("Error del servidor");
  }
});

// Eliminar usuario por ID
router.delete("/Usuario/:id", async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Error del servidor");
  }
});

// Rutas para Álbumes

// Agregar un nuevo álbum
router.post("/album/agregar", async (req, res) => {
  try {
    let album = await Album.create(req.body);
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error al agregar un album": error });
  }
});

// Actualizar un álbum por ID
router.put("/album/:id", async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error al actualizar el álbum": error });
  }
});

// Agregar una canción a un álbum por ID
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

// Eliminar una canción de un álbum por ID de canción
router.put("/song/delete/:idAlbum", async (req, res) => {
  let idSong = req.query.idSong;
  try {
    let album = await Album.findById(req.params.idAlbum);
    let albumActualizado = album.canciones.filter(cancion => cancion._id != idSong);
    album.canciones = albumActualizado;
    await Album.findByIdAndUpdate(req.params.idAlbum, album, { new: true });
    res.status(200).send({ mensaje: "Canción eliminada correctamente" });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener todos los álbumes
router.get("/album/todos", async (req, res) => {
  try {
    let albums = await Album.find();
    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send({ "error al solicitar todos los albums": error });
  }
});

// Obtener un álbum por ID
router.get("/album/:id", async (req, res) => {
  try {
    let album = await Album.findById(req.params.id);
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send({ "error al solicitar el album": error });
  }
});

// Eliminar un álbum por ID
router.delete("/album/:idAlbum", async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.idAlbum);
    res.status(200).send("Álbum eliminado correctamente");
  } catch (error) {
    res.status(500).send({ "error al eliminar el álbum": error });
  }
});

module.exports = router;
