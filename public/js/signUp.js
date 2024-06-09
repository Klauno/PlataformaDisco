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
      alert("Error: Formato de correo electrónico inválido.");
      return;
    }

    if (!validarLongitudContrasenia(usuario.contrasenia)) {
      alert("Error: La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    

    // Si pasa todas las validaciones, realizar la solicitud de registro
    await axios.post("/Usuario", usuario, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    done = true;
    alert("¡Registro exitoso! Continuar para iniciar sesión.");
    if (done) {
      window.location.href = "./logIn.html"; // Redirigir a la página de inicio de sesión
    }
  } catch (error) {
    console.log(error);
    alert("Hubo un problema al registrar el usuario.");
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
