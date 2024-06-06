let titulo = document.querySelector("#titulo");
let descripcion = document.querySelector("#descripcion");
let fecha = document.querySelector("#fecha");
let enlace = document.querySelector("#enlace");
let portada = document.querySelector("#portadaValue");
let submit = document.querySelector("#submitButton");
let done = false;

const newAlbum = async () => {
  if (
    titulo.value != "" &&
    descripcion.value != "" &&
    fecha.value != "" &&
    enlace.value != "" &&
    portada.value != ""
  ) {
    try {
      const album = {
        titulo: titulo.value,
        descripcion: descripcion.value,
        fecha: fecha.value,
        link: enlace.value,
        portada: portada.value,
      };

      axios.post("/album/agregar", album, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      done = true;
    } catch (error) {
      console.log(error);
      done == false; 
    }
  } else {
    if (titulo.value == "") {
      titulo.classList.add("emptyLine");
    } else {
      titulo.classList.toggle("emptyLine");
    }
    if (descripcion.value == "") {
      descripcion.classList.add("emptyLine");
    } else {
      descripcion.classList.toggle("emptyLine");
    }
    if (fecha.value == "") {
      fecha.classList.add("emptyLine");
    } else {
      fecha.classList.toggle("emptyLine");
    }
    if (enlace.value == "") {
      enlace.classList.add("emptyLine");
    } else {
      enlace.classList.toggle("emptyLine");
    }
    if (portada.value == "") {
      portada.classList.add("emptyLine");
    } else {
      portada.classList.toggle("emptyLine");
    }
    
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los campos deben completarse antes de mandar el álbum',
    });
  }
};

submit.addEventListener("click", async () => {
  await newAlbum();
  if (done == true) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'El álbum fue creado con éxito',
    });
    window.location.href = "./home.html";
  }
});

