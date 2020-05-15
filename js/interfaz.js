// Clase de interfaz
export class Interfaz {
  constructor() {
    this.formulario = document.querySelector("#formulario");
    this.archivoImagen = document.getElementById("imagen");
    this.previsaulizarContenedor = document.getElementById("previsualizar");
    this.spinner = document.getElementById("spinner");
    this.mensajes = document.getElementById("mensajes");
    this.mensajesModal = document.getElementById("mensajesModal");
    this.siguiente = document.getElementById("siguiente");
    this.contenedorImagen = document.getElementById("contenedorImagenes");
    // Administrar
    this.tabla = document.getElementById("table_id");
    this.contenedorModal = document.getElementById("administrarModal");
    this.btnAbrirModal = document.getElementById("lanzarModal");
    // tabla
    this.table = $("#table_id").DataTable({
      destroy: true, //sirve para reinicializar el datatable al insertar datos
      // ajax: json,
      // columns: [{ data: "gender" }, { data: "age" }],
      responsive: true,
      paging: true,
      searching: false,
      info: false,
      language: {
        sProcessing: "Procesando...",
        sLengthMenu: "Registros por página _MENU_",
        sZeroRecords: "No se encontraron resultados",
        sEmptyTable: "Ningún dato disponible en esta tabla =(",
        sInfo:
          "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
        sInfoPostFix: "",
        sSearch: "",
        sUrl: "",
        sInfoThousands: ",",
        sLoadingRecords: "Cargando...",
        oPaginate: {
          sFirst: `<i class="fas fa-fast-backward"></i>`,
          sLast: `<i class="fas fa-fast-forward"></i>`,
          sNext: `<i class="fas fa-forward"></i>`,
          sPrevious: `<i class="fas fa-backward"></i>`,
        },
        oAria: {
          sSortAscending:
            ": Activar para ordenar la columna de manera ascendente",
          sSortDescending:
            ": Activar para ordenar la columna de manera descendente",
        },
        buttons: {
          copy: "Copiar",
          colvis: "Visibilidad",
        },
      },
      iDisplayLength: 3,
      aLengthMenu: [
        [3, 10, 25, 50, 100, -1],
        [3, 10, 25, 50, 100, "Todos"],
      ],
    });
  }

  crearImagen(url) {
    const elementoImagen = document.createElement("img");
    elementoImagen.src = url;
    elementoImagen.classList = "img-fluid";
    this.previsaulizarContenedor.appendChild(elementoImagen);
  }

  mostrarOcultarSpinner(clase) {
    spinner.style.display = clase;
  }

  subirImagen(clase) {
    const h4 = document.querySelector("#spinner h4");
    h4.textContent = "Subiendo Imagen...";
    spinner.style.display = clase;
    this.limpiarImagenVisualizada();
  }

  limpiarMensajes() {
    if (document.querySelector(".alert")) {
      document.querySelector(".alert").remove();
    }
  }
  limpiarImagenVisualizada() {
    const imagen = document.querySelector("#previsualizar img");
    if (imagen) {
      imagen.remove();
    }
  }
  galeriaImagenes(nombreImagen, index, active) {
    const li = document.createElement("li");
    if (active) {
      li.classList = "active";
    }
    li.classList.add("hijoLi");
    li.setAttribute("data-target", "#carouselImagenes");
    li.setAttribute("data-slide-to", index);
    this.siguiente.appendChild(li);
    // crear divContenedor carousel-item
    const div = document.createElement("div");
    div.classList = "carousel-item";
    div.classList.add("hijoItem");
    if (active) {
      div.classList.add("active");
    }
    // crear Imagenes
    const img = document.createElement("img");
    img.src = `images/${nombreImagen}`;
    img.alt = `${nombreImagen}_${index}`;
    img.classList = "d-block w-100 imagen";
    div.appendChild(img);
    this.contenedorImagen.appendChild(div);
  }
  limpiarGaleria() {
    if (document.querySelectorAll(".hijoItem")) {
      const nodosItem = document.querySelectorAll(".hijoItem");
      nodosItem.forEach((nodo) => {
        this.contenedorImagen.removeChild(nodo);
      });
    }
    if (document.querySelectorAll(".hijoLi")) {
      const nodosLi = document.querySelectorAll(".hijoLi");
      nodosLi.forEach((nodo) => {
        this.siguiente.removeChild(nodo);
      });
    }
  }
  lanzarModal() {
    this.btnAbrirModal.setAttribute("data-toggle", "modal");
    this.btnAbrirModal.setAttribute("data-target", "#administrarModal");
  }
}
