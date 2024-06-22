// home.js

document.addEventListener("DOMContentLoaded", () => {
    let usuarioFront = document.querySelector("#nickName");
    let fotoFront = document.querySelector("#fotoUser");
    let logoutButton = document.querySelector("#logout");
  
    // Cargar el usuario guardado desde localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const usuarioObject = JSON.parse(userData);
      usuarioFront.textContent = `${usuarioObject.nombre} ${usuarioObject.apellido}`;
  
      let fotoBack = usuarioObject.foto
        ? usuarioObject.foto
        : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGwyEeerP0CsqiGF0IPDbD_RATUfhv4aI3F2gpPbPfwzSeE-Jd";
  
      fotoFront.setAttribute("src", fotoBack);
    } else {
      console.error("No se encontró ningún usuario guardado en localStorage.");
    }
  
    // Lógica para cerrar sesión
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        // Limpiar almacenamiento local
        localStorage.removeItem("authToken"); // Elimina el token de autenticación si existe
        localStorage.removeItem("userData"); // Elimina los datos del usuario
  
        // Redirigir a la página de inicio de sesión
        window.location.href = './login.html';
      });
    }
  });
  