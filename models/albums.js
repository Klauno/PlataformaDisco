const mongoose = require("mongoose");

// Esquema para las canciones
const SongSchema = new mongoose.Schema({
  titulo: { type: String, required: [true, "El título de la canción es requerido"] },
  duracion: { type: String, required: [true, "La duración de la canción es requerida"] },
  link: { type: String, required: [true, "El enlace de la canción es requerido"] }
});

// Esquema para los álbumes, con las canciones incorporadas
const AlbumSchema = new mongoose.Schema({
  titulo: { type: String, required: [true, "El título del álbum es requerido"] },
  descripcion: {
    type: String,
    required: [true, "La descripción del álbum es requerida"],
    minlength: 5,
    maxlength: 200,
  },
  fecha: {
    type: Number, // Corrección del tipo de dato a Date
    required: [true, "La fecha del álbum es requerida"],
    min: 1900,
    max: 2025,
  },
  canciones: [SongSchema], // Incorporación del esquema de las canciones dentro del álbum
  portada: { type: String, required: [true, "La portada del álbum es requerida"] },
  link: { type: String, required: [true, "El enlace al álbum es requerido"] }, // Agregar este campo
});

module.exports = mongoose.model("Album", AlbumSchema);

