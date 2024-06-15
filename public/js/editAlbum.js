document.addEventListener("DOMContentLoaded", function() {
  // Obtener el ID del álbum del almacenamiento local
  const albumId = localStorage.getItem("albumId");

  // Verificar si el ID del álbum obtenido del almacenamiento local es válido
  if (!albumId) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'ID del álbum no encontrado en el almacenamiento local'
    });
    return;
  }

  // Eliminar las comillas del ID del álbum si las hay
  const formattedAlbumId = albumId.replace(/^"(.*)"$/, "$1");

  // Selecciona los elementos del formulario y otros elementos relevantes
  const tituloInput = document.getElementById("titulo");
  const descripcionTextarea = document.getElementById("descripcion");
  const enlaceInput = document.getElementById("enlace");
  const fechaInput = document.getElementById("fecha");
  const portadaInput = document.getElementById("portadaValue");
  const submitButton = document.getElementById("submitButton");
  const logoutButton = document.getElementById("logout");
  const viewAlbumButton = document.getElementById("viewAlbumButton");

  // Función para obtener los valores del formulario
  function obtenerValoresFormulario() {
    return {
      titulo: tituloInput.value,
      descripcion: descripcionTextarea.value,
      enlace: enlaceInput.value,
      fecha: fechaInput.value,
      portada: portadaInput.value
    };
  };

  // Función para enviar la información del formulario al servidor
  function enviarInfo() {
    const valores = obtenerValoresFormulario();
    Swal.fire({
      icon: 'info',
      title: 'Valores del formulario',
      text: JSON.stringify(valores, null, 2)
    });
    axios.put(`http://localhost:3000/album/${formattedAlbumId}`, valores)
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: '¡Datos actualizados exitosamente!'
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al enviar los datos. Por favor, inténtalo de nuevo más tarde.'
        });
      });
  }

  // Event Listener para el botón de enviar
  submitButton.addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    enviarInfo(); // Llama a la función para enviar la información
  });

  // Event Listener para el enlace de cerrar sesión
  logoutButton.addEventListener("click", function() {
    logOut(); // Llama a la función para cerrar sesión
  });

  // Event Listener para el botón de ver álbum
  viewAlbumButton.addEventListener("click", function() {
    window.location.href = `../html/album.html?albumId=${formattedAlbumId}`; // Redirige a la página del álbum con el ID en la URL
  });

  // Función para cerrar sesión
  function logOut() {
    Swal.fire({
      icon: 'info',
      title: 'Cerrando sesión...',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    }).then(() => {
      // Limpiar almacenamiento local
      localStorage.removeItem('usuario'); // Elimina el objeto de usuario
      localStorage.removeItem('authToken'); // Elimina el token de autenticación si existe
      localStorage.removeItem('userData'); // Elimina otros datos de usuario si los hay

      // También puedes limpiar el sessionStorage si es necesario
      sessionStorage.clear();

      // Opcional: eliminar cookies si las estás utilizando
      // document.cookie = "nombreDeLaCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirigir a la página de inicio de sesión
      window.location.href = '../html/logIn.html';
    });
  }

  // Realizar una solicitud para obtener los detalles del álbum
  axios.get(`http://localhost:3000/album/${formattedAlbumId}`)
    .then(function (response) {
      const album = response.data;
      // Llenar los campos del formulario con los detalles del álbum
      tituloInput.value = album.titulo;
      descripcionTextarea.value = album.descripcion;
      enlaceInput.value = album.link;
      fechaInput.value = album.fecha;
      portadaInput.value = album.portada;
    })
    .catch(function (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al obtener los detalles del álbum. Por favor, inténtalo de nuevo más tarde.'
      });
    });
});
