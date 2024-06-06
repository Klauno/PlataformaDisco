const tickets = {
    "MIAMI": 100,
    "SAN DIEGO": 100,
    "RIVERSIDE": 3,
    "PEACHTREE CITY": 0,
    "NASHVILLE": 2
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    // Solicitar al usuario que ingrese su nombre
    Swal.fire({
        title: 'Ingresa tu nombre',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: false,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: true,
        preConfirm: (nombre) => {
            if (!nombre || nombre.trim().length < 3 || !/^[a-zA-Z]+$/.test(nombre)) {
                Swal.showValidationMessage('El nombre debe tener al menos 3 letras y no debe contener números ni caracteres especiales.');
            }
            return nombre.toUpperCase();
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const nombre = result.value;
            // Mostrar el saludo con el nombre en mayúsculas
            const spanWelcome = document.getElementById("welcome");
            const iconoTickets = document.createElement("i");
            iconoTickets.classList.add("fas", "fa-ticket-alt");
            spanWelcome.textContent = `¡Hola, ${nombre}! `;
            spanWelcome.appendChild(iconoTickets);
  
            // Solicitar al usuario que ingrese su edad
            Swal.fire({
                title: 'Ingresa tu edad',
                input: 'number',
                inputAttributes: {
                    autocapitalize: 'off',
                    min: 1
                },
                showCancelButton: false,
                confirmButtonText: 'Confirmar',
                showLoaderOnConfirm: true,
                preConfirm: (edad) => {
                    if (!edad || isNaN(edad) || parseInt(edad) < 1) {
                        Swal.showValidationMessage('Por favor, ingresa una edad válida.');
                    }
                    return parseInt(edad);
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    const edad = result.value;
                    // Verificar si el usuario es mayor de 18 años
                    if (edad >= 18) {
                        // Preguntar si quiere comprar entradas
                        Swal.fire({
                            title: '¿Te gustaría comprar entradas?',
                            icon: 'question',
                            showCancelButton: true,
                            confirmButtonText: 'Sí',
                            cancelButtonText: 'No'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                Swal.fire(
                                    '¡Genial!',
                                    'Puedes encontrar las entradas en nuestra sección de eventos.',
                                    'success'
                                );
                            } else {
                                disablePurchaseButtons(); // Deshabilitar botones de compra
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "¡Lo siento!",
                            text: "Debes ser mayor de 18 años para comprar tickets.",
                            icon: "warning"
                        }).then(() => {
                            disablePurchaseButtons(); // Deshabilitar botones de compra
                        });
                    }
                }
            });
        }
    });
  });
  
  // Función para comprar tickets y actualizar la disponibilidad
  function getTickets(lugar) {
    if (tickets[lugar] > 0) {
        tickets[lugar]--;
        Swal.fire(
            "¡Compra exitosa!",
            "Has comprado un ticket para el concierto en " + lugar,
            "success"
        );
        disableSoldOutButtons(); // Deshabilitar botones agotados
    } else {
        Swal.fire(
            "¡Lo siento!",
            "Los tickets para el concierto en " + lugar + " están agotados.",
            "warning"
        );
    }
  
    disableSoldOutButtons(); // Deshabilitar botones agotados
  }
  
  // Función para deshabilitar botones agotados
  function disableSoldOutButtons() {
    const buttons = document.querySelectorAll(".boton");
    for (let lugar in tickets) {
        if (tickets[lugar] === 0) {
            buttons.forEach(button => {
                if (button.previousElementSibling.textContent.includes(lugar)) {
                    button.disabled = true;
                    button.textContent = "SOLD OUT";
                    button.style.backgroundColor = "gray"; // Cambiar el color de fondo del botón
                    button.style.color = "white"; // Cambiar el color del texto del botón
                }
            });
        }
    }
  }
  
  // Función para deshabilitar
  