// const list_slider = document.querySelector(".list")
// export const endpoints = {
//     oficial: "https://dolarapi.com/v1/dolares/oficial",
//     blue: "https://dolarapi.com/v1/dolares/blue",
//     bolsa: "https://dolarapi.com/v1/dolares/bolsa",
//     contadoconliqui: "https://dolarapi.com/v1/dolares/contadoconliqui",
//     tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
//     mayorista: "https://dolarapi.com/v1/dolares/mayorista",
//     cripto: "https://dolarapi.com/v1/dolares/cripto",
//     eur: "https://dolarapi.com/v1/cotizaciones/eur",
//     brl: "https://dolarapi.com/v1/cotizaciones/brl",
//     clp: "https://dolarapi.com/v1/cotizaciones/clp",
//     uyu: "https://dolarapi.com/v1/cotizaciones/uyu",
// };

// window.addEventListener("load", () => renderMonedas(endpoints));

// async function llamadaAPI(endpoints) {
//     try {
//         const response = await fetch(endpoints);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error:", error);
//         throw error;
//     }
// }

// async function renderMonedas(endpoints) {
//     let posicion = 1;

//     for (const url of Object.values(endpoints)) {
//         const moneda = await llamadaAPI(url);
//         armarHTML(moneda, posicion);
//         posicion += 1;
//     }

//     function armarHTML(moneda, num_posicion) {
//         list_slider.innerHTML += `
//     <div class="moneda--card" style="--position: ${num_posicion};">
//         <div class="moneda--card--info">
//             <p>- ${moneda.nombre}</p>
//             <p>$${moneda.compra} -</p>
//         </div>
//     </div>
//     `
//     }
// }

// renderMonedas();