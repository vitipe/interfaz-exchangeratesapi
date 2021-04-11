const BASE_URL = 'https://api.ratesapi.io/api';

export default function fetchearDataAPI(fecha, base) {
  // SUPER IMPORTANTE que aca el fetch venga en un return así
  // lo pueden usar las otras funciones en index
  return fetch(`${BASE_URL}/${fecha}?base=${base}`)
    .then((respuesta) => respuesta.json())
    .then((dataAPI) => dataAPI);
}

// function manejarDataAPI(fecha, base) {
//   borrarNodosTabla();

//   fetch(`https://api.ratesapi.io/api/${fecha}?base=${base}`)
//     .then((respuesta) => respuesta.json())
//     .then((dataAPI) => {
//       armarSelectorMoneda(dataAPI);
//       actualizarFechaYTitulo(dataAPI);
//       crearTablaMonedas(dataAPI);
//     })
//     .catch((error) => {
//       // eslint-disable-next-line no-console
//       console.error('ERROR:', error);
//     });
// }
