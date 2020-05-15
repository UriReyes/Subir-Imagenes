// Variables
const formulario = document.querySelector("#formulario");
const archivoImagen = document.getElementById("imagen");
const previsaulizarContenedor = document.getElementById("previsualizar");
const spinner = document.getElementById("spinner");
const mensajes = document.getElementById("mensajes");
// Eventos
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#subirImagen").setAttribute("disabled", true);
});
archivoImagen.addEventListener("change", visualizarImagen);
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  // Simular subir Imagen
  subirImagen("block");
  setTimeout(() => {
    subirImagen("none");

    // Enviar imagen al backend
    const formData = new FormData(formulario);
    fetch("php/uploadImages.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        const tipo = data.split(",")[0];
        const mensaje = data.split(",")[1];
        mostrarMensaje(mensaje, tipo);
        document.querySelector("#subirImagen").setAttribute("disabled", true);
      })
      .catch((error) => console.log(error));
    setTimeout(() => {
      limpiarMensajes();
    }, 1000);
  }, 2000);
});
//Funciones
function visualizarImagen() {
  const formData = new FormData(formulario);
  const url = URL.createObjectURL(formData.get("imagen"));
  limpiarImagenVisualizada();
  mostrarOcultarSpinner("block");
  /// Simulamos un tiempo de carga para mostrar la imagen
  setTimeout(() => {
    mostrarOcultarSpinner("none");
    crearImagen(url);
    document.querySelector("#subirImagen").removeAttribute("disabled");
  }, 1000);
}

function crearImagen(url) {
  const elementoImagen = document.createElement("img");
  elementoImagen.src = url;
  elementoImagen.classList = "img-fluid";
  previsaulizarContenedor.appendChild(elementoImagen);
}

function mostrarOcultarSpinner(clase) {
  spinner.style.display = clase;
}

function subirImagen(clase) {
  const h4 = document.querySelector("#spinner h4");
  h4.textContent = "Subiendo Imagen...";
  spinner.style.display = clase;
}

function mostrarMensaje(mensaje, tipo) {
  limpiarMensajes();
  if (tipo === "success") {
    const div = document.createElement("div");
    div.classList = "alert alert-info mt-3";
    div.textContent = mensaje;
    mensajes.appendChild(div);
  } else {
    const div = document.createElement("div");
    div.classList = "alert alert-danger mt-3";
    div.textContent = mensaje;
    mensajes.appendChild(div);
  }
}
function limpiarMensajes() {
  if (document.querySelector(".alert")) {
    document.querySelector(".alert").remove();
  }
}
function limpiarImagenVisualizada() {
  const imagen = document.querySelector("#previsualizar img");
  if (imagen) {
    imagen.remove();
  }
}
