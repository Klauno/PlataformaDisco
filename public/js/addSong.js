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
    const addSongForm = document.getElementById("addSongForm");
  
    addSongForm.addEventListener("submit", async function(event) {
      event.preventDefault();
  
      const titulo = document.getElementById("titulo").value;
      const duracion = document.getElementById("duracion").value;
      const link = document.getElementById("link").value;
  
      if (!titulo || !duracion || !link) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Todos los campos son obligatorios'
        });
        return;
      }
  
      try {
        const response = await axios.put(`/song/${formattedAlbumId}`, {
          titulo: titulo,
          duracion: duracion,
          link: link,
        });
  
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Canción agregada',
            text: 'La canción ha sido agregada correctamente.'
          });
        }
      } catch (error) {
        console.error("Error al agregar la canción:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al agregar la canción. Por favor, inténtalo nuevamente.'
        });
      }
    });
  
    // Event Listener para el botón de cerrar sesión
    const logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
      // Aquí puedes agregar la lógica para cerrar sesión, por ejemplo:
      window.location.href = "../html/logIn.html";
    });
  
    // Event Listener para el botón de volver al álbum
    const viewAlbumButton = document.getElementById("viewAlbumButton");
    viewAlbumButton.addEventListener("click", function() {
      window.location.href = `./album.html?albumId=${formattedAlbumId}`;
    });
  });
  