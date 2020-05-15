import { API } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#subirImagen").setAttribute("disabled", true);
  const cargarImagenes = new API();
  cargarImagenes.mostrarImagenSubidas();
});
