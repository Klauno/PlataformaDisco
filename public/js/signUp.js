let nombre = document.querySelector("#signUpName")
let apellido = document.querySelector("#Apellido")
let correo = document.querySelector("#email")
let contrasenia = document.querySelector("#password")
let foto = document.querySelector("#profileImage")
let submit = document.querySelector("#submitted")
let done = false

const newUser = async () => {
  try {
    const usuario = {
      nombre: nombre.value,
      apellido: apellido.value,
      email: email.value,
      contrasenia: contrasenia.value,
      foto: foto.value,
    }

    axios.post("/Usuario", usuario, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    done = true
  } catch (error) {
    console.log(error)
  }
}

submit.addEventListener("click", async () => {
  await newUser()
  if (done) {
    window.location.href = "./logIn.html"
  }
})



document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(registerForm);
      const username = formData.get('username');
      const password = formData.get('password');

      try {
        const response = await fetch('/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (response.ok) {
          // Redirigir al usuario a la página de inicio de sesión si el registro fue exitoso
          window.location.href = '/login.html';
        } else {
          const errorMessage = await response.text();
          console.error('Error de registro:', errorMessage);
          
        }
      } catch (error) {
        console.error('Error de red:', error);
        
      }
    });
  }
});