const storage = JSON.parse(localStorage.getItem("favoritos")) || [];
const informe = {};

for (const key of storage) {

  if (!informe[key.nombre]) {
    informe[key.nombre] = {
      nombre: key.nombre,
      datos: []
    };
  }

  informe[key.nombre].datos.push({
    fecha: key.fechaActualizacion,
    compra: key.compra,
    venta: key.venta
  })

  // for (let i = 0; i < informe[key.nombre].datos.venta.length - 1; i++) {
  //     if (informe[key.nombre].datos.venta[i] >= informe[key.nombre].datos.venta[i + 1]) {
  //         console.log("subió wachin")
  //     }
  // }
}

console.log(informe);

for (const [key, inf] of Object.entries(informe)) {
//   inf.datos.fechas.sort((a, b) => new Date(b) - new Date(a));

  // inf.datos.fechas.map((fecha) => console.log(fecha));
}
