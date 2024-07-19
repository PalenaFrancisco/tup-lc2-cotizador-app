const padre = document.querySelector("#ver-moneda");
const selectorMoneda = document.getElementById("moneda");
const favoritosBtns = document.querySelectorAll(".starCheckbox");
let listaFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let monedas = [];

const endpoints = {
  oficial: "https://dolarapi.com/v1/dolares/oficial",
  blue: "https://dolarapi.com/v1/dolares/blue",
  bolsa: "https://dolarapi.com/v1/dolares/bolsa",
  contadoconliqui: "https://dolarapi.com/v1/dolares/contadoconliqui",
  tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
  mayorista: "https://dolarapi.com/v1/dolares/mayorista",
  cripto: "https://dolarapi.com/v1/dolares/cripto",
  eur: "https://dolarapi.com/v1/cotizaciones/eur",
  brl: "https://dolarapi.com/v1/cotizaciones/brl",
  clp: "https://dolarapi.com/v1/cotizaciones/clp",
  uyu: "https://dolarapi.com/v1/cotizaciones/uyu",
};

window.addEventListener("load", () => renderMonedas(endpoints));

async function llamadaAPI(endpoints) {
  try {
    const response = await fetch(endpoints);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function renderMonedas(endpoints) {
  for (const url of Object.values(endpoints)) {
    const monedita = await llamadaAPI(url);
    monedas.push(monedita);
    armarHTML(monedita);
  }

  estaEnFavoritos();
  document.getElementById("actualizacion").innerHTML =
    "Fecha de la cotización: " +
    new Date().toLocaleDateString("es-ES") +
    " a las " +
    new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }) +
    " hs";
}

function estaEnFavoritos() {
  if (listaFavoritos.length > 0) {
    const monedas_cards = document.querySelectorAll(
      ".contenido_main--box--card"
    );
    for (const card of monedas_cards) {
      for (const fav of listaFavoritos) {
        if (
          card.children[1].children[2].dataset.nombre == fav.nombre &&
          card.children[1].children[2].dataset.fecha ==
            fav.fechaActualizacion &&
          card.children[1].children[2].dataset.compra == fav.compra &&
          card.children[1].children[2].dataset.venta == fav.venta
        ) {
          card.children[1].children[2].checked = true;
        }
      }
    }
  }
}


function armarHTML(moneda) {
  padre.innerHTML += `
  <div class="contenido_main--box--card">
    <h3>${moneda.nombre}</h3>
    <div class="contenido_main--box--precios">
      <div class="compra">
        <h4>COMPRA</h4>
        <p>$${moneda.compra}</p>
      </div>
      <div class="venta">
        <h4>VENTA</h4>
        <p>$${moneda.venta}</p>
      </div>
      <input type="checkbox"
            id="starCheckbox-${moneda.nombre}" 
            data-nombre="${moneda.nombre}" 
            data-compra="${moneda.compra}" 
            data-venta="${moneda.venta}" 
            data-fecha="${moneda.fechaActualizacion}" 
            onclick="agregarAlStorage(this)" 
            class="starCheckbox"

      >
      <label for="starCheckbox-${moneda.nombre}" class="starCheckboxLabel"></label>
    </div>
  </div>`;
}

selectorMoneda.addEventListener("change", (event) => {
  const monedaElegida = event.target.value;
  padre.innerHTML = "";

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
  estaEnFavoritos();
});

function agregarAlStorage(e) {
  if (e.checked) {
    const favorito = {
      nombre: e.dataset.nombre,
      compra: e.dataset.compra,
      venta: e.dataset.venta,
      fechaActualizacion: e.dataset.fecha,
    };
    console.log(favorito.nombre);
    listaFavoritos.push(favorito);
    setearStorage(listaFavoritos);
  } else {
    listaFavoritos = listaFavoritos.filter(
      (elem) =>
        !(
          elem.nombre === e.dataset.nombre &&
          elem.fechaActualizacion === e.dataset.fecha &&
          elem.compra === e.dataset.compra &&
          elem.venta === e.dataset.venta
        )
    );
    setearStorage(listaFavoritos);
  }
}

function setearStorage(lista) {
  localStorage.setItem("favoritos", JSON.stringify(lista));
}

setInterval(() => {
  monedas = [];
  padre.innerHTML = "";
  renderMonedas(endpoints);
}, 300000);
