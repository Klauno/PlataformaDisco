document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('albumId');

  if (!albumId) {
    Swal.fire({
      icon: 'error',
      title: 'ID del álbum no proporcionado en la URL',
      text: 'Por favor, proporciona un ID de álbum válido en la URL.'
    });
    return;
  }

  const albumDetailsContainer = document.querySelector('.album-details');

  function obtenerAlbumDetalles() {
    axios.get(`../album/${albumId}`)
      .then(function(response) {
        const album = response.data;
        const albumElement = document.createElement('div');

        albumElement.innerHTML = `
          <h2>${album.titulo}</h2>
          <p>${album.descripcion}</p>
          <p>${album.fecha}</p>
          <img src="${album.portada}" alt="Portada del álbum">
        `;

        albumDetailsContainer.appendChild(albumElement);

        // Listar las canciones del álbum
        const cancionesContainer = document.createElement('div');
        cancionesContainer.classList.add('canciones');

        album.canciones.forEach(cancion => {
          const cancionElement = document.createElement('div');
          cancionElement.innerHTML = `
            <p>Titulo: ${cancion.titulo} - Duración: ${cancion.duracion} - <a href="${cancion.link}" target="_blank" class="text-indigo-500 underline link">Link</a></p>
            <i class="ri-delete-bin-7-line deleteIcon" data-song-id="${cancion._id}">Eliminar</i>
          `;
          cancionesContainer.appendChild(cancionElement);
        });

        albumDetailsContainer.appendChild(cancionesContainer);

        // Agregar evento al icono de la papelera para eliminar la canción
        cancionesContainer.querySelectorAll('.deleteIcon').forEach(deleteIcon => {
          deleteIcon.addEventListener('click', async () => {
            const songId = deleteIcon.dataset.songId;
            const confirmed = await Swal.fire({
              icon: 'warning',
              title: '¿Estás seguro?',
              text: '¿Estás seguro de que deseas eliminar esta canción?',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Sí, eliminar',
              cancelButtonText: 'Cancelar'
            });
            if (confirmed.isConfirmed) {
              try {
                const response = await axios.put(`/song/delete/${albumId}?idSong=${songId}`);
                deleteIcon.parentElement.remove();
                Swal.fire({
                  icon: 'success',
                  title: '¡Canción eliminada!',
                  text: 'La canción ha sido eliminada correctamente.'
                });
              } catch (error) {
                console.error("Error al eliminar la canción:", error.message);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Hubo un error al eliminar la canción. Por favor, inténtalo de nuevo más tarde.'
                });
              }
            }
          });
        });

        // Event Listener para el botón "Volver al Álbum"
        const viewAlbumButton = document.getElementById('viewAlbumButton');
        viewAlbumButton.addEventListener('click', function() {
          window.location.href = '../html/Albums.html'; // Ajusta la ruta según la ubicación correcta de Albums.html
        });

        // Event Listener para el botón "Cerrar Sesión"
        const logoutButton = document.getElementById('logoutButton');
        logoutButton.addEventListener('click', function() {
          window.location.href = '../html/logIn.html'; // Ajusta la ruta según la ubicación correcta de logIn.html
        });

      })
      .catch(function(error) {
        console.error('Error al obtener los detalles del álbum:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al obtener los detalles del álbum. Por favor, inténtalo de nuevo más tarde.'
        });
      });
  }

  obtenerAlbumDetalles();
});
