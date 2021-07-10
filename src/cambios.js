import * as ui from './ui.js';
import fetchearDataAPI from './exchange.js';

async function cambiarFechaYMoneda(fecha, base) {
  const dataAPI = await fetchearDataAPI(fecha, base);
  ui.limpiarTabla();
  ui.actualizarFechaYTitulo(dataAPI);
  ui.armarSelectorMoneda(dataAPI);
  ui.crearTablaMonedas(dataAPI);
}

export default function manejarCambios() {
  const $selectorMoneda = document.querySelector('#selector-monedas');
  const $datePicker = document.querySelector('#fecha-cotizacion');

  $selectorMoneda.onchange = () => {
    if ($datePicker.value === '') {
      cambiarFechaYMoneda('latest', $selectorMoneda.value);
    } else {
      cambiarFechaYMoneda($datePicker.value, $selectorMoneda.value);
    }
  };

  $datePicker.onchange = () => {
    cambiarFechaYMoneda($datePicker.value, $selectorMoneda.value);
  };
}
