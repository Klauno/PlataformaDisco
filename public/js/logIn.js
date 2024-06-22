// logIn.js

// Selección de elementos del DOM
let correo = document.querySelector("#email");
let contrasenia = document.querySelector("#password");
let submit = document.querySelector("#submitted");

// Función asíncrona para iniciar sesión
const loginUser = async () => {
  try {
    const usuario = {
      email: correo.value,
      contrasenia: contrasenia.value,
    };

    // Realizar la solicitud de inicio de sesión
    const response = await axios.post("/Usuario/login", usuario, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificar la respuesta del servidor
    if (response.status === 200) {
      // Almacenar datos en localStorage
      const userData = {
        nombre: response.data.nombre,
        apellido: response.data.apellido,
        foto: response.data.foto,
      };
      localStorage.setItem("userData", JSON.stringify(userData));

      // Mostrar SweetAlert2 de inicio de sesión exitoso y redirigir
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = "./home.html";
      });

    } else {
      // Mostrar SweetAlert2 de inicio de sesión fallido
      Swal.fire({
        icon: 'error',
        title: 'Inicio de sesión fallido',
        text: 'Verifica tus credenciales e intenta nuevamente.',
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'Cerrar'
      });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    // Mostrar SweetAlert2 de error de inicio de sesión
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Contraseña o Usuario incorrecto, volve a intentarlo.',
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Cerrar'
    });
  }
};

// Agregar el evento de clic al botón de envío
submit.addEventListener("click", async () => {
  await loginUser();
});
