(function () {
  emailjs.init("IcnFGk-ORziW89X4Z");
})();
const storage = JSON.parse(localStorage.getItem("favoritos")) || [];
const contenido_informe = document.getElementById("contenido-informe");
const selector = document.getElementById("moneda");
let chartInstance = null;

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
    const [precios, lista_fechas] = tomar_datos_tabla();
    render_grafico(precios, lista_fechas, true);
  } else {
    for (const moneda of monedas) {
      if (monedaElegida == moneda.nombre) {
        contenido_informe.innerHTML = "";
        armarHTML(moneda);
        const [precios, lista_fechas] = tomar_datos_tabla();
        render_grafico(precios, lista_fechas);
        break;
      } else {
        contenido_informe.innerHTML = `<p style="font-size: 2rem; margin: auto;">No tienes esa moneda</p>`;
      }
    }
  }
});

function armarHTML(moneda) {
  contenido_informe.innerHTML += `
  <tr class="monedaSelect" style="height: 1rem;">
        <td colspan="5" id="nombre_moneda">${moneda.nombre}</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <ul id="fechas_precios">
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
              <ul class="precios_tabla" id="precios_compra">
              ${moneda.datos
      .map((element) => `<li>$${element.compra}</li>`)
      .join("")}
              </ul>
        </td>
        <td>
              <ul class="precios_tabla" id="precios_venta">
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

function tomar_datos_tabla() {
  const contenidoInforme = document.getElementById("contenido-informe");

  const rows = contenidoInforme.querySelectorAll("tr");

  const precios = {}

  let nombre_moneda_limpiado = ''; // Definimos la variable aquí para que esté accesible en todos los contextos

  rows.forEach(row => {
    const nombre_moneda = row.querySelector("#nombre_moneda");
    if (nombre_moneda) {
      nombre_moneda_limpiado = nombre_moneda.textContent.trim();

      precios[nombre_moneda_limpiado] = {
        nombre: nombre_moneda_limpiado,
        fechas: [],
        compra: [],
        venta: []
      };
    }

    const fechas_precios = row.querySelectorAll("#fechas_precios li");
    if (fechas_precios.length > 0) {
      fechas_precios.forEach(fecha => {
        const fecha_limpia = fecha.textContent.trim();
        precios[nombre_moneda_limpiado].fechas.push(fecha_limpia);
      });
    }

    const precios_compra = row.querySelectorAll("#precios_compra li");
    if (precios_compra.length > 0) {
      precios_compra.forEach(precio => {
        const precio_limpio = precio.textContent.trim().substring(1);
        const precio_entero = parseInt(precio_limpio);
        precios[nombre_moneda_limpiado].compra.push(precio_entero);
      });
    }

    const precios_venta = row.querySelectorAll("#precios_venta li");
    if (precios_venta.length > 0) {
      precios_venta.forEach(precio => {
        const precio_limpio = precio.textContent.trim().substring(1);
        const precio_entero = parseInt(precio_limpio);
        precios[nombre_moneda_limpiado].venta.push(precio_entero);
      });
    }
  });

  // Obtenemos las fechas de todas las monedas
  const lista_fechas = [];

  Object.values(precios).forEach(moneda => {
    moneda.fechas.forEach(fecha => {
      if (!lista_fechas.includes(fecha)) {
        lista_fechas.push(fecha);
      }
    });
  });

  // lista_fechas.sort((a, b) => {
  //   const [diaA, mesA, anoA] = a.split('/').map(Number);
  //   const [diaB, mesB, anoB] = b.split('/').map(Number);
  //   return new Date(anoA, mesA - 1, diaA) - new Date(anoB, mesB - 1, diaB);
  // });

  return [precios, lista_fechas];
}

// PARA MOSTRAR EL GRAFICO
function render_grafico(precios = {}, lista_fechas = [], mostrarSoloCompra = false) {
  if (!precios || !lista_fechas) {
    console.error("Valores inválidos para precios o lista_fechas");
    return;
  }

  const datasets = [];
  const colores = ["red", "blue", "green", "yellow", "orange", "pink", "purple", "turquoise", "black", "grey", "brown"];
  let color = 0;

  Object.entries(precios).forEach(([nombre_moneda, datos]) => {
    if (mostrarSoloCompra) {
      const datasetCompra = {
        label: `${nombre_moneda} - Compra`,
        data: datos.compra,
        borderColor: colores[color],
        borderWidth: 1,
        fill: false
      };

      datasets.push(datasetCompra);
    } else {
      const datasetCompra = {
        label: `${nombre_moneda} - Compra`,
        data: datos.compra,
        borderColor: colores[color],
        borderWidth: 1,
        fill: false
      };

      color += 1;

      const datasetVenta = {
        label: `${nombre_moneda} - Venta`,
        data: datos.venta,
        borderColor: colores[color],
        borderWidth: 1,
        fill: false
      };

      color += 1;

      datasets.push(datasetCompra);
      datasets.push(datasetVenta);
    }

    color += 1; // Incrementar el contador de colores independientemente
  });

  console.log(datasets);

  const ctx = document.getElementById("grafica").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: lista_fechas,
      datasets: datasets
    }
  });
}

// APARTADO PARA COMPARTIR

function showModal() {
  document.getElementById('modal').style.display = 'flex';
}

function hideModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
}

document.addEventListener('DOMContentLoaded', () => {
  agruparMonedas();
  const [precios, lista_fechas] = tomar_datos_tabla();
  render_grafico(precios, lista_fechas, true);
  const showModalButton = document.getElementById('showModalButton'); // Botón para mostrar el modal
  const hideModalButton = document.querySelector('.modal__btn_cerrar'); // Botón dentro del modal para cerrarlo
  const enviar = document.querySelector('.modal__btn_enviar'); //Boton de enviar dentro del modal

  if (showModalButton) {
    showModalButton.addEventListener('click', showModal);
  }

  if (hideModalButton) {
    hideModalButton.addEventListener('click', (event) => {
      event.preventDefault(); // Evita el envío del formulario si el botón está dentro de un formulario
      hideModal();
    });
  }

  if (enviar) {
    enviar.addEventListener('click', function (event) {
      event.preventDefault();
      var email = document.getElementById('email').value;
      if (!email) {
        alert("Por favor, ingrese una dirección de correo electrónico.");
        return;
      }
      var nombre = document.getElementById("nombre").value;

      var cuerpo_tabla = document.querySelector(".table-wrapper").innerHTML;

      // Convertir el gráfico en una imagen base64
      var canvas = document.getElementById('grafica');
      var imagenGrafico = canvas.toDataURL("image/png");

      // Enviar el correo electrónico usando EmailJS
      var templateParams = {
        nombre: nombre,
        to_email: email,
        tabla: cuerpo_tabla,
        grafico: imagenGrafico,
      };

      const templateID = 'template_m6twgfw'
      const serviceID = 'service_xuiu5au'

      const modal = document.getElementById("modal");
      const modal_original = modal.innerHTML;

      emailjs.send(serviceID, templateID, templateParams)
        .then(function (response) {
          console.log('Correo electrónico enviado con éxito!', response);
          modal.innerHTML = ''
          modal.innerHTML = `<p style="font-size: 2rem; margin: auto;">Compartido con exito!!</p>`
          modal.style.background = "green";
          modal.style.color = "white";
          setTimeout(() => {
            modal.innerHTML = modal_original;
            hideModal();
          }, 3000);
        }, function (error) {
          console.error('Error al enviar el correo electrónico:', error);
          modal.innerHTML = '';
          modal.innerHTML = `<p style="font-size: 2rem; margin: auto;">Ocurrio un error!!</p>`;
          modal.style.background = "red";
          modal.style.color = "white";
          setTimeout(() => {
            modal.innerHTML = modal_original
            modal.style.background = "#f8f6fe";
            modal.style.color = "black";
          }, 2000);
        });
    });
  }
});
