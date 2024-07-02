const tbody = document.getElementById("tbody-miarchivo");
let nuevoStorage = [];

function armarMoneda() {
  const storage = JSON.parse(localStorage.getItem("favoritos"));
  if (storage) {
    const agrupado = {};

    for (const moneda of storage) {
      const fecha = new Date(moneda.fechaActualizacion).toLocaleDateString(
        "es-ES"
      );

      if (!agrupado[fecha]) {
        agrupado[fecha] = {
          fechaActualizacion: fecha,
          monedas: [],
        };
      }
      agrupado[fecha].monedas.push({
        moneda: moneda.nombre,
        compra: moneda.compra,
        venta: moneda.venta,
      });
    }

    const resultado = Object.values(agrupado);
    return resultado;
  }
}

function renderArchivo() {
  const cotizacionesAgrupadas = armarMoneda();
  tbody.innerHTML = "";

  if (cotizacionesAgrupadas.length > 0) {
    for (const cotizacion of cotizacionesAgrupadas) {
      tbody.innerHTML += `
      <tr class="fecha_tabla" style="height: 1rem;">
      <td colspan="5">${cotizacion.fechaActualizacion}</td>
      </tr>
      <tr>
      <td></td>
      <td>
      <ul>
      ${cotizacion.monedas
          .map((element) => `<li>${element.moneda.toUpperCase()}</li>`)
          .join("")}
        </ul>
        </td>
        <td>
        <ul class="precios_tabla">
        ${cotizacion.monedas
          .map((element) => `<li>$${element.compra}</li>`)
          .join("")}
          </ul>
          </td>
          <td>
          <ul class="precios_tabla">
          ${cotizacion.monedas
          .map((element) => `<li>$${element.venta}</li>`)
          .join("")}
            </ul>
            </td>
            <td>
            <ul class="precios_tabla">
            ${cotizacion.monedas
          .map(
            (element) =>
              `<li><i class="fa-solid fa-eraser icono" ></i></li>`
          )
          .join("")}
              </ul>
              </td>
              </tr> 
              `;
      asignarListener();
    }
  } else {
    document.querySelector(
      ".table-wrapper"
    ).innerHTML = `<p style="font-size: 2rem; margin: auto;">No hay cotizaciones</p>`;
  }
}

function asignarListener() {
  const btns = document.querySelectorAll(".icono");
  const storage = JSON.parse(localStorage.getItem("favoritos"));

  btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      nuevoStorage = storage.filter((elem) => elem !== storage[index]);
      localStorage.setItem("favoritos", JSON.stringify(nuevoStorage));
      renderArchivo();
    });
  });
}

function imprimir() {
  var cuerpo_tabla = document.querySelector(".table-wrapper").innerHTML;
  var contenido_original = document.body.innerHTML;

  document.body.innerHTML = cuerpo_tabla;
  window.print();
  document.body.innerHTML = contenido_original;
}


renderArchivo();
asignarListener();
