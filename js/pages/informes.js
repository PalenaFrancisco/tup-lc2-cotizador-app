const storage = JSON.parse(localStorage.getItem("favoritos")) || [];
const contenido_informe = document.getElementById("contenido-informe");
const selector = document.getElementById("moneda")

function datos() {
  if (storage) {
    const informe = {};
    for (const key of storage) {
      if (!informe[key.nombre]) {
        informe[key.nombre] = {
          nombre: key.nombre,
          datos: [],
        };
      }

      informe[key.nombre].datos.push({
        fecha: key.fechaActualizacion,
        compra: key.compra,
        venta: key.venta,
      });

      informe[key.nombre].datos.sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );
    }
    const resultado = Object.values(informe);
    console.log(resultado);
    return resultado;
  }
}

function agruparMonedas() {
  const monedas = datos();
  contenido_informe.innerHTML = "";

  if (monedas.length > 0) {
    for (const moneda of monedas) {
      armarHTML(moneda);
    }
  }
}

selector.addEventListener("change", (event) => {
  const monedaElegida = event.target.value;
  contenido_informe.innerHTML = "";
  const monedas = datos();

  if (monedaElegida == "all") {
    for (const moneda of monedas) {
      armarHTML(moneda);
    }
  } else {
    for (const moneda of monedas) {
      if (monedaElegida == moneda.nombre) {
        armarHTML(moneda);
        break;
      }
    }
  }
});

function armarHTML(moneda) {
  contenido_informe.innerHTML += `
  <tr class="monedaSelect" style="height: 1rem;">
        <td colspan="5">${moneda.nombre}</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul>
                  ${moneda.datos
                    .map(
                      (element) =>
                        `<li>${new Date(element.fecha).toLocaleDateString(
                          "es-ES"
                        )}</li>`
                    )
                    .join("")}
              </ul>
        </td>
        <td>
              <ul class="precios_tabla">
              ${moneda.datos
                .map((element) => `<li>$${element.compra}</li>`)
                .join("")}
              </ul>
        </td>
        <td>
              <ul class="precios_tabla">
              ${moneda.datos
                .map((element) => `<li>$${element.venta}</li>`)
                .join("")}
              </ul>
            </td>
            <td>
              <ul class="precios_tabla">
                 ${moneda.datos
                   .map((element, index, array) => {
                     if (array.length <= 1) {
                       return `-`;
                     }
                     if (index < array.length - 1) {
                       const elemento_siguiente = array[index + 1];
                       if (element.venta >= elemento_siguiente.venta) {
                         return `<li><i class="fa-solid fa-up-long iconoup"></i></li>`;
                       } else {
                         return `<li><i class="fa-solid fa-down-long iconolower"></i></li>`;
                       }
                     } else {
                       return `<li><i class="fa-solid fa-up-long iconoup"></i></li>`;
                     }
                   })
                   .join("")}
              </ul>
            </td>
  </tr> 
  `;
}



agruparMonedas();
