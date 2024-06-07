let nombre = document.querySelector("#signUpName");
let apellido = document.querySelector("#Apellido");
let correo = document.querySelector("#email");
let contrasenia = document.querySelector("#password");
let foto = document.querySelector("#profileImage");
let submit = document.querySelector("#submitted");
let done = false;

const newUser = async () => {
  try {
    const usuario = {
      nombre: nombre.value,
      apellido: apellido.value,
      email: correo.value,
      contrasenia: contrasenia.value,
      foto: foto.value,
    };

    // Realizar validaciones de formato
    if (!validarFormatoEmail(usuario.email)) {
      mostrarAlerta("Error", "Formato de correo electrónico inválido.");
      return;
    }

    if (!validarLongitudContrasenia(usuario.contrasenia)) {
      mostrarAlerta("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Si la foto está presente, validar su formato de URL
    if (usuario.foto && !validarFormatoURL(usuario.foto)) {
      mostrarAlerta("Error", "Formato de URL de imagen inválido.");
      return;
    }

    // Si pasa todas las validaciones, realizar la solicitud de registro
    await axios.post("/Usuario", usuario, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    done = true;
    mostrarAlerta("Éxito", "¡Registro exitoso! Continuar para iniciar sesión.");
  } catch (error) {
    console.log(error);
  }
};

// Función para validar el formato de correo electrónico
const validarFormatoEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Función para validar la longitud de la contraseña
const validarLongitudContrasenia = (contrasenia) => {
  return contrasenia.length >= 6;
};

// Función para validar el formato de URL
const validarFormatoURL = (url) => {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
};

// Función para mostrar alertas de SweetAlert2
const mostrarAlerta = (titulo, mensaje) => {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "success",
    confirmButtonText: "Continuar", // Cambiar el texto del botón a "Continuar"
    timer: null, // Desactivar el temporizador
    timerProgressBar: true, // Barra de progreso de la duración
    didOpen: (toast) => {
      // Callback cuando la alerta se abre
      toast.addEventListener("mouseenter", Swal.stopTimer); // Pausar el temporizador al pasar el mouse sobre la alerta
      toast.addEventListener("mouseleave", Swal.resumeTimer); // Reanudar el temporizador al sacar el mouse de la alerta
    }
  }).then(() => {
    if (done) {
      window.location.href = "./logIn.html"; // Redirigir a la página de inicio de sesión cuando el usuario haga clic en "Continuar"
    }
  });
};

submit.addEventListener("click", async () => {
  await newUser();
});
