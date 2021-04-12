import * as ui from './ui.js';
import fetchearDataAPI from './exchange.js';

async function cambiarMonedaYFecha(fecha, base) {
  const dataAPI = await fetchearDataAPI(fecha, base);
  ui.limpiarTabla();
  ui.actualizarFechaYTitulo(dataAPI);
  ui.armarSelectorMoneda(dataAPI);
  ui.crearTablaMonedas(dataAPI);
}

export default function manejarInputs() {
  const $selectorMoneda = document.querySelector('#selector-monedas');
  const $datePicker = document.querySelector('#fecha-cotizacion');

  $selectorMoneda.onchange = () => {
    if ($datePicker.value === '') {
      cambiarMonedaYFecha('latest', $selectorMoneda.value);
    } else {
      cambiarMonedaYFecha($datePicker.value, $selectorMoneda.value);
    }
  };

  $datePicker.onchange = () => {
    cambiarMonedaYFecha($datePicker.value, $selectorMoneda.value);
  };
}
