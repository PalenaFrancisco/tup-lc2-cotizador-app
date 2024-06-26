const storage = JSON.parse(localStorage.getItem("favoritos")) || [];
const informe = {};

for (const key of storage) {
  console.log(key);

  if (!informe[key.nombre]) {
    informe[key.nombre] = {
      nombre: key.nombre,
      datos: {
        fechas: [],
        compra: [],
        venta: [],
      },
    };
  }
  informe[key.nombre].datos.fechas.push(key.fechaActualizacion);
  informe[key.nombre].datos.compra.push(key.compra);
  informe[key.nombre].datos.venta.push(key.venta);

  // for (let i = 0; i < informe[key.nombre].datos.venta.length - 1; i++) {
  //     if (informe[key.nombre].datos.venta[i] >= informe[key.nombre].datos.venta[i + 1]) {
  //         console.log("subió wachin")
  //     }
  // }
}

console.log(informe);

for (const [key, inf] of Object.entries(informe)) {
//   inf.datos.fechas.sort((a, b) => new Date(b) - new Date(a));

  inf.datos.fechas.map((fecha) => console.log(fecha));
}
