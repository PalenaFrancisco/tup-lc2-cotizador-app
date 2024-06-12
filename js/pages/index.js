const padre = document.querySelector("#ver-moneda");
const selectorMoneda = document.getElementById("moneda");
const API = "https://dolarapi.com/v1/dolares";

async function llamadaAPI(param = "") {
  try {
    const response = await fetch(`${API}${param}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function renderMonedas(param) {
  const monedas = await llamadaAPI(param);
  padre.innerHTML = ""
  if(monedas.length > 1) {
    for(let i = 0; i < monedas.length; i++) {
      armarHTML(monedas[i]);
    }
  } else {
    armarHTML(monedas);
  }
}

function armarHTML(moneda) {
  padre.innerHTML += `<div class="contenido_main--box--card">
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
    <input type="checkbox" id="starCheckbox-${moneda.nombre}" class="starCheckbox">
    <label for="starCheckbox-${moneda.nombre}" class="starCheckboxLabel"></label>
  </div>
</div>`;
}

selectorMoneda.addEventListener("change", (event) => {
  const data = event.target.value;
  renderMonedas(data);
});

renderMonedas();
