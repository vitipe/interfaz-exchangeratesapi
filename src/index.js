import fetchearDataAPI from './exchange.js'; // Cuando importás defaults viene sin curly braces
import * as ui from './ui.js'; // "ui" pasaría a ser un objeto que tiene las funciones como propiedades
import manejarCambios from './cambios.js';

async function inicializar(fecha, base) {
  const dataAPI = await fetchearDataAPI(fecha, base);
  ui.actualizarFechaYTitulo(dataAPI);
  ui.armarSelectorMoneda(dataAPI);
  ui.crearTablaMonedas(dataAPI);
  manejarCambios();
}

inicializar('latest', 'EUR');
