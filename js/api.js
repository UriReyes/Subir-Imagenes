// Subir la imagen con PHP
import { Interfaz } from "./interfaz.js";
const UI = new Interfaz();
export class API {
  constructor() {
    this.init();
  }
  init() {
    UI.archivoImagen.addEventListener("change", visualizarImagen);
    UI.formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      // Simular subir Imagen
      UI.subirImagen("block");
      // simulamos subida de archivos
      setTimeout(() => {
        UI.subirImagen("none");
        // Enviar imagen al backend
        const formData = new FormData(UI.formulario);
        fetch("php/uploadImages.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.text())
          .then((data) => {
            const tipo = data.split(",")[0];
            const mensaje = data.split(",")[1];
            this.mostrarMensaje(mensaje, tipo, UI.mensajes);
            document
              .querySelector("#subirImagen")
              .setAttribute("disabled", true);
            UI.limpiarImagenVisualizada();
            UI.limpiarGaleria();
            this.mostrarImagenSubidas();
          })
          .catch((error) => console.log(error));
        //ocultamos los mensajes
        setTimeout(() => {
          UI.limpiarMensajes();
        }, 3000);
      }, 1100);
    });
    $(UI.tabla).on("click", "a", (e) => {
      const padre = e.target.parentElement.parentElement;
      const archivoEliminar =
        padre.firstChild.nextSibling.nextSibling.innerText;
      this.eliminarImagen(archivoEliminar);
    });
    function visualizarImagen() {
      const formData = new FormData(formulario);
      const url = URL.createObjectURL(formData.get("imagen"));
      UI.limpiarImagenVisualizada();
      UI.mostrarOcultarSpinner("block");
      /// Simulamos un tiempo de carga para mostrar la imagen
      setTimeout(() => {
        UI.mostrarOcultarSpinner("none");
        UI.crearImagen(url);
        document.querySelector("#subirImagen").removeAttribute("disabled");
      }, 1100);
    }
    UI.btnAbrirModal.addEventListener("click", (e) => {
      e.preventDefault();
      UI.lanzarModal();
    });
  }
  mostrarMensaje(mensaje, tipo, contenedor) {
    UI.limpiarMensajes();
    if (tipo === "success") {
      const div = document.createElement("div");
      div.classList = "alert alert-info mt-3";
      div.textContent = mensaje;
      contenedor.appendChild(div);
    } else {
      const div = document.createElement("div");
      div.classList = "alert alert-danger mt-3";
      div.textContent = mensaje;
      contenedor.appendChild(div);
    }
  }
  mostrarImagenSubidas() {
    //datos tabla
    UI.table.clear().draw();
    fetch("php/readImages.php")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((imagen, index) => {
          if (index === 0) {
            UI.galeriaImagenes(imagen, index, true);
          } else {
            UI.galeriaImagenes(imagen, index, false);
          }
          let img = `<img src="images/${imagen}" width="50px" height="50px"/>`;
          let btnEliminar = `<a id="${imagen}" href="#" class="badge badge-danger">Eliminar</a>`;
          let informacion = `<p class="badge badge-info">${imagen}</p>`;
          UI.table.row
            .add([index + 1, img, informacion, btnEliminar])
            .draw(false);
        });
      })
      .catch((error) => console.log(error));
  }
  eliminarImagen(archivo) {
    let data = { element: archivo };
    fetch("php/deleteImages.php", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        const tipo = data.split(",")[0];
        const mensaje = data.split(",")[1];
        UI.limpiarGaleria();
        this.mostrarMensaje(mensaje, tipo, UI.mensajesModal);
        this.mostrarImagenSubidas();
        setTimeout(() => {
          UI.limpiarMensajes();
        }, 1200);
      })
      .catch((error) => console.log(error));
  }
}
