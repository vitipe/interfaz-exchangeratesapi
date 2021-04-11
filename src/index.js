import fetchearDataApi from './exchange.js';

import {
  actualizarFechaYTitulo, borrarNodosTabla, crearTablaMonedas, armarSelectorMoneda, manejarInputs,
} from './ui.js';

async function manejarTodo(fecha, base) {
  borrarNodosTabla();
  let dataAPI = await fetchearDataApi(fecha, base);
  actualizarFechaYTitulo(dataAPI);
  armarSelectorMoneda(dataAPI);
  crearTablaMonedas(dataAPI);
}

manejarTodo('latest', 'EUR');

manejarInputs(); // No me estaría andando esto, refactorizarlo
