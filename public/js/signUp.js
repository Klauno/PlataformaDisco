// signUp.js

// Selección de elementos del DOM
let nombre = document.querySelector("#signUpName");
let apellido = document.querySelector("#Apellido");
let correo = document.querySelector("#email");
let contrasenia = document.querySelector("#password");
let foto = document.querySelector("#profileImage");
let submit = document.querySelector("#submitted");
let done = false;

// Función asíncrona para registrar un nuevo usuario
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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formato de correo electrónico inválido.',
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    if (!validarLongitudContrasenia(usuario.contrasenia)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 6 caracteres.',
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    // Si pasa todas las validaciones, realizar la solicitud de registro
    await axios.post("/Usuario", usuario, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    done = true;

    // Mostrar SweetAlert2 de registro exitoso
    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: 'Continuar para iniciar sesión.',
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      if (done) {
        window.location.href = "./logIn.html"; // Redirigir a la página de inicio de sesión
      }
    });

  } catch (error) {
    console.error("Hubo un problema al registrar el usuario:", error);
    // Mostrar SweetAlert2 de error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al registrar el usuario. Por favor, inténtalo de nuevo.',
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Cerrar'
    });
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

// Agregar el evento de clic al botón de envío
submit.addEventListener("click", async () => {
  await newUser();
});
