import { onLoad } from "../utils/utils.js";
import { logOut } from "../utils/utils.js";

const divAlbums = document.querySelector(".albums");

const renderAlbums = (album) => {
  const div = document.createElement("div");
  const albumTitle = document.createElement("h2");
  const albumDate = document.createElement("h2");
  const imgAlbum = document.createElement("img");
  const iconTrash = document.createElement("i");
  const addSongIcon = document.createElement("i");
  const editAlbumIcon = document.createElement("i");
  const viewAlbumIcon = document.createElement("i");
  const listDiv = document.createElement("div");

  // Usar imagen predeterminada si el campo de portada está vacío
  let urlPortada = album.portada ? album.portada : "https://imgur.com/0uSALUr.png";
  div.classList.add("albums-individual");
  let albumId = album._id ? album._id : "";
  let linkAlbum = album.link ? album.link : "";
  imgAlbum.setAttribute("src", urlPortada);
  iconTrash.classList.add("ri-delete-bin-7-line", "deleteIcon");
  addSongIcon.classList.add("ri-music-2-fill", "addCustom");
  editAlbumIcon.classList.add("ri-settings-5-fill", "editCustom");
  viewAlbumIcon.classList.add("ri-eye-fill", "viewCustom");
  listDiv.classList.add("listDiv");

  albumTitle.textContent = album.titulo;
  albumDate.textContent = album.fecha;
  div.appendChild(albumTitle);
  div.appendChild(albumDate);
  div.appendChild(imgAlbum);
  div.appendChild(iconTrash);
  div.appendChild(addSongIcon);
  div.appendChild(editAlbumIcon);
  div.appendChild(viewAlbumIcon);
  div.appendChild(listDiv);
  divAlbums.appendChild(div);

  // Evento para redirigir a la página de detalles del álbum al hacer clic en el icono de vista
  viewAlbumIcon.addEventListener("click", () => {
    window.location.href = `./album.html?albumId=${albumId}`;
  });

  // Evento para redirigir a la página de edición de álbum al hacer clic en el icono de edición
  editAlbumIcon.addEventListener("click", () => {
    localStorage.setItem("albumId", JSON.stringify(albumId));
    window.location.href = "./editAlbum.html";
  });

  // Evento para eliminar el álbum al hacer clic en el icono de basura
  iconTrash.addEventListener("click", async () => {
    // Utilizar SweetAlert para obtener la confirmación del usuario
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("Intentando eliminar el álbum con ID:", albumId);
          const response = await axios.delete(`/album/${albumId}`);
          console.log("Respuesta de la solicitud DELETE:", response);
          Swal.fire({
            title: "Álbum eliminado",
            text: "El álbum ha sido eliminado correctamente.",
            icon: "success"
          });
          // Eliminar el álbum de la interfaz
          div.remove();
        } catch (error) {
          console.log("Error al eliminar el álbum:", error.message);
        }
      }
    });
  });

  // Evento para redirigir al enlace del álbum al hacer clic en el ícono de música
  addSongIcon.addEventListener("click", () => {
    if (linkAlbum) {
      window.open(linkAlbum, '_blank');
    } else {
      console.error('El enlace al video no está definido en este álbum.');
    }
  });

  // Eventos para el icono de vista
  viewAlbumIcon.classList.add("ri-eye-fill", "viewCustom");
  viewAlbumIcon.style.cursor = "pointer"; // Cambiar el cursor al ícono del ojo
  const viewIcon = div.querySelector(".viewCustom");
  viewIcon.addEventListener("mouseover", () => {
    viewIcon.style.color = "orange"; // Cambiar el color al pasar el ratón sobre el ícono
  });
  viewIcon.addEventListener("mouseout", () => {
    viewIcon.style.color = ""; // Revertir al color original cuando el ratón sale del ícono
  });

  // Eventos para el icono de basura
  const trashIcon = div.querySelector(".deleteIcon");
  trashIcon.addEventListener("mouseover", () => {
    trashIcon.style.color = "red";
  });
  trashIcon.addEventListener("mouseout", () => {
    trashIcon.style.color = "";
  });

  // Eventos para el icono de música
  const addIcon = div.querySelector(".addCustom");
  addIcon.addEventListener("mouseover", () => {
    addIcon.style.color = "green";
  });
  addIcon.addEventListener("mouseout", () => {
    addIcon.style.color = "";
  });
};

const getAlbums = async () => {
  try {
    const response = await axios.get("../album/todos");
    response.data.map((album) => {
      renderAlbums(album);
    });
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getAlbums();

  const logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    // Aquí puedes agregar la lógica para cerrar sesión, por ejemplo:
    window.location.href = "../html/logIn.html";
  });
});
