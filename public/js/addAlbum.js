document.addEventListener("DOMContentLoaded", function() {
  const titulo = document.querySelector("#titulo");
  const descripcion = document.querySelector("#descripcion");
  const fecha = document.querySelector("#fecha");
  const enlace = document.querySelector("#enlace");
  const portada = document.querySelector("#portadaValue");
  const submit = document.querySelector("#submitButton");
  const form = document.querySelector("#albumForm");
  let done = false;

  const newAlbum = async () => {
    let valid = true;
    let errorMsg = "";

    // Validación de campos requeridos
    if (titulo.value.trim() === "") {
      titulo.classList.add("emptyLine");
      valid = false;
      errorMsg += "El campo título no puede estar vacío.\n";
    } else {
      titulo.classList.remove("emptyLine");
    }

    if (descripcion.value.trim() === "") {
      descripcion.classList.add("emptyLine");
      valid = false;
      errorMsg += "El campo descripción no puede estar vacío.\n";
    } else {
      descripcion.classList.remove("emptyLine");
    }

    if (fecha.value.trim() === "") {
      fecha.classList.add("emptyLine");
      valid = false;
      errorMsg += "El campo fecha no puede estar vacío.\n";
    } else {
      fecha.classList.remove("emptyLine");

      // Validación de fecha: verificar si está entre 1950 y 2024
      const inputDate = new Date(fecha.value);
      const minDate = new Date("1950-01-01");
      const maxDate = new Date("2024-12-31");
      if (!(inputDate >= minDate && inputDate <= maxDate)) {
        valid = false;
        errorMsg += "La fecha debe estar entre el 1 de enero de 1950 y el 31 de diciembre de 2024.\n";
      }
    }

    if (enlace.value.trim() === "") {
      enlace.classList.add("emptyLine");
      valid = false;
      errorMsg += "El campo enlace no puede estar vacío.\n";
    } else {
      enlace.classList.remove("emptyLine");
    }

    // Validación de campo de portada (opcional)
    // No se agrega al errorType si está vacío
    if (portada.value.trim() !== "") {
      
    }

    if (!valid) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el formulario',
        text: errorMsg,
      });
      return false;
    }

    try {
      const album = {
        titulo: titulo.value,
        descripcion: descripcion.value,
        fecha: fecha.value,
        link: enlace.value,
        portada: portada.value.trim() || "https://imgur.com/0uSALUr.png", // Imagen predeterminada si no se proporciona una portada
      };

      const response = await axios.post("http://localhost:3000/album/agregar", album, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        done = true;
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El álbum fue creado con éxito',
        });
      } else {
        done = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al crear el álbum',
        });
      }
    } catch (error) {
      console.log(error);
      done = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el álbum',
      });
    }
    return done;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const isFormValid = await newAlbum();
    if (isFormValid) {
      // Reset form if needed
      form.reset();
    }
  });

  const logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    window.location.href = "../html/logIn.html";
  });
});