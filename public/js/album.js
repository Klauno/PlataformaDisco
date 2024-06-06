document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('albumId');

  if (!albumId) {
    console.error("ID del álbum no proporcionado en la URL");
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
          <a href="${album.link}" target="_blank" class="text-indigo-500 underline">Enlace</a>
          <p>${album.fecha}</p>
          <img src="${album.portada}" alt="Portada del álbum">
          <button id="videoButton" class="text-indigo-500 underline">Ver Video</button>
        `;

        albumDetailsContainer.appendChild(albumElement);

        // Listar las canciones del álbum
        const cancionesContainer = document.createElement('div');
        cancionesContainer.classList.add('canciones');

        album.canciones.forEach(cancion => {
          const cancionElement = document.createElement('div');
          cancionElement.innerHTML = `
            <p>Titulo: ${cancion.titulo} - Duración: ${cancion.duracion} - <a href="${cancion.link}" target="_blank" class="text-indigo-500 underline">Link</a></p>
          `;
          cancionesContainer.appendChild(cancionElement);
        });

        albumDetailsContainer.appendChild(cancionesContainer);

        // Agregar evento al botón de video
        const videoButton = document.getElementById('videoButton');
        videoButton.addEventListener('click', function() {
          window.open(album.videoLink, '_blank');
        });
      })
      .catch(function(error) {
        console.error('Error al obtener los detalles del álbum:', error);
      });
  }

  obtenerAlbumDetalles();

  const addButton = document.getElementById("addButton");
  addButton.addEventListener("click", () => {
    window.location.href = `./addSong.html?albumId=${albumId}`;
  });
});
