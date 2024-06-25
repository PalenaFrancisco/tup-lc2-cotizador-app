const tbody = document.getElementById("tbody-miarchivo");

// Recuperar y parsear los datos del localStorage
const storage = JSON.parse(localStorage.getItem("favoritos"));

function armarMoneda() {
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

const cotizacionesAgrupadas = armarMoneda();

if (cotizacionesAgrupadas) {
  for (const cotizacion of cotizacionesAgrupadas) {
    tbody.innerHTML += `
        <tr class="fecha_tabla">
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
          .map((element) => `<li><i class="fa-solid fa-eraser icono"></i></li>`)
          .join("")}
        </ul>
        </td>
        </tr> 
        `;
  }
} else {
  document.querySelector(".table-wrapper").innerHTML = `<p style="font-size: 2rem; margin: auto;">No hay cotizaciones</p>`;
}
