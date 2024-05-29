const padre = document.querySelector("#ver-moneda");

fetch("https://dolarapi.com/v1/dolares")
  .then((response) => response.json())
  .then((monedas) => {
    monedas.forEach((moneda) => {
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
    });
  })
  .catch((error) => console.log(error));