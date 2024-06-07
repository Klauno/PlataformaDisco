let submit = document.querySelector("#submitted")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let valorEmail, valorPassword
let done = false

const renderUsers = (user) => {
  let urlPortada = user.portada ? user.portada : "../images/user.png.png"
  console.log(urlPortada)
}

const getUsers = async () => {
  try {
    const response = await axios.get("../Usuario/todos")
    response.data.Usuarios.map((user) => {
      if (user.email === email.value && user.contrasenia === password.value) {
        const usuario = {
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          contrasenia: user.contrasenia,
          foto: user.foto,
        }

        localStorage.setItem("usuario", JSON.stringify(usuario))
        done = true
      }
    })
  } catch (error) {
    console.log(error)
  }
}

submit.addEventListener("click", async () => {
  if (email.value === "" || password.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Por favor, completa todos los campos.',
    });
    return; // Detiene la ejecución si los campos están vacíos
  }

  await getUsers()
  if (done) {
    window.location.href = "./home.html"
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Mail y/o contraseña incorrecto/s',
    });
  }
})