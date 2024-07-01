const storage = JSON.parse(localStorage.getItem("favoritos")) || [];
const contenido_informe = document.getElementById("contenido-informe");

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

      // for (let i = 0; i < informe[key.nombre].datos.venta.length - 1; i++) {
      //     if (informe[key.nombre].datos.venta[i] >= informe[key.nombre].datos.venta[i + 1]) {
      //         console.log("subió wachin")
      //     }
      // }
    }
    console.log(informe);
    return informe;
  }
}

datos();

// for (const [key, inf] of Object.entries(informe)) {
//   //   inf.datos.fechas.sort((a, b) => new Date(b) - new Date(a));
//   // inf.datos.fechas.map((fecha) => console.log(fecha));
// }

function armarHTML() {
  const monedas = datos()

  contenido_informe.innerHTML = `
  <tr class="monedaSelect">
        <td colspan="5">Dolar Blue</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul>
                <li>18/04/2024</li>
                <li>17/04/2024</li>
                <li>16/04/2024</li>
                <li>15/04/2024</li>
                <li>14/04/2024</li>
              </ul>
        </td>
        <td>
              <ul class="precios_tabla">
                <li>$995</li>
                <li>$996.09</li>
                <li>$1355.2</li>
                <li>$1050</li>
                <li>$1000</li>
              </ul>
        </td>
        <td>
              <ul class="precios_tabla">
                <li>$1015</li>
                <li>$1000.06</li>
                <li>$1419.2</li>
                <li>$1086</li>
                <li>$1200</li>
              </ul>
            </td>
            <td>
              <ul class="precios_tabla">
                <li><i class="fa-solid fa-up-long iconoup"></i></li>
                <li><i class="fa-solid fa-down-long iconolower"></i></li>
                <li><i class="fa-solid fa-up-long iconoup"></i></li>
                <li><i class="fa-solid fa-up-long iconolower"></i></li>
                <li><i class="fa-solid fa-down-long iconoup"></i></li>
              </ul>
            </td>
  </tr> 
  `;
}
