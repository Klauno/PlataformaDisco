document.addEventListener("DOMContentLoaded", () => {
    let nav = document.querySelector("#nav");
    let navImg = document.querySelector("#navImage");
    let items = document.querySelectorAll(".navItems");
    let usuarioFront = document.querySelector("#nickName");
    let fotoFront = document.querySelector("#fotoUser");
    let logoutButton = document.querySelector("#logoutButton");

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

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("usuario");
            window.location.href = "./logIn.html";
        });
    }
});
