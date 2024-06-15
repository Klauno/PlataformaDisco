document.addEventListener("DOMContentLoaded", () => {
    let nav = document.querySelector("#nav");
    let navImg = document.querySelector("#navImage");
    let items = document.querySelectorAll(".navItems");
    let usuarioFront = document.querySelector("#nickName");
    let fotoFront = document.querySelector("#fotoUser");
    let logoutButton = document.querySelector("#logout");

    // Cargar el usuario guardado desde localStorage
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
        const usuarioObject = JSON.parse(usuarioGuardado);
        usuarioFront.textContent = `${usuarioObject.nombre} ${usuarioObject.apellido}`;

        let fotoBack = usuarioObject.foto
            ? usuarioObject.foto
            : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQGwyEeerP0CsqiGF0IPDbD_RATUfhv4aI3F2gpPbPfwzSeE-Jd";

        fotoFront.setAttribute("src", fotoBack);
    } else {
        console.error("No se encontró ningún usuario guardado en localStorage.");
    }

    // Añadir evento para el navImg
    if (navImg) {
        navImg.addEventListener("click", () => {
            if (nav) {
                nav.classList.toggle("nav-opacity");
            }
            items.forEach((item) => {
                item.classList.toggle("nav-items-toggled");
            });
        });
    }

    // Lógica para cerrar sesión
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // Limpiar almacenamiento local
            localStorage.removeItem('usuario'); // Elimina el objeto de usuario
            localStorage.removeItem('authToken'); // Elimina el token de autenticación si existe
            localStorage.removeItem('userData'); // Elimina otros datos de usuario si los hay

            // También puedes limpiar el sessionStorage si es necesario
            sessionStorage.clear();

            // Opcional: eliminar cookies si las estás utilizando
            // document.cookie = "nombreDeLaCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // Redirigir a la página de inicio de sesión
            window.location.href = './login.html';
        });
    }
});
