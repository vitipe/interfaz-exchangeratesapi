export function actualizarFechaYTitulo(dataAPI) {
  if (document.querySelector('#fecha-cotizacion').max === '') {
    document.querySelector('#fecha-cotizacion').max = dataAPI.date;
  }

  document.querySelector('#fecha-actual').textContent = `Fecha de cotización: ${dataAPI.date}`;
  document.querySelector('#titulo-moneda').textContent = `Todas las monedas cotizadas frente al ${dataAPI.base} (moneda base)`;
}

export function borrarNodosTabla() {
  const $trTabla = document.querySelectorAll('tbody tr');

  $trTabla.forEach((nodo) => {
    nodo.remove();
  });
}

export function crearTablaMonedas(dataAPI) {
  const arrayRatesKeys = Object.keys(dataAPI.rates);
  const arrayRatesValues = Object.values(dataAPI.rates);

  arrayRatesKeys.forEach((rate, index) => {
    const $tableBody = document.querySelector('tbody');
    const $tableRow = document.createElement('tr');
    const $tableHeader = document.createElement('th');
    $tableHeader.scope = 'row';
    $tableHeader.id = `th-${index}`;
    $tableHeader.textContent = rate;
    $tableBody.appendChild($tableRow);
    $tableRow.appendChild($tableHeader);
  });

  arrayRatesValues.forEach((value, index) => {
    const $tableRows = document.querySelectorAll('tbody tr');
    const $tableData = document.createElement('td');
    $tableData.textContent = value;
    $tableData.id = `td-${index}`;
    $tableRows[index].appendChild($tableData);
  });
}

export function armarSelectorMoneda(dataAPI) {
  if (document.querySelectorAll('option').length === 0) {
    const arrayRatesKeys = Object.keys(dataAPI.rates).concat('EUR').sort();
    const $selectorMoneda = document.querySelector('#selector-monedas');
    const $optionDefaultMoneda = document.createElement('option');
    $optionDefaultMoneda.value = '';
    $optionDefaultMoneda.textContent = '--Elija una moneda--';
    $selectorMoneda.appendChild($optionDefaultMoneda);

    arrayRatesKeys.forEach((rate) => {
      const $nuevaOptionMoneda = document.createElement('option');
      $nuevaOptionMoneda.value = rate;
      $nuevaOptionMoneda.textContent = rate;
      $selectorMoneda.appendChild($nuevaOptionMoneda);
    });
  }
}

export function manejarInputs() {
  const $selectorMoneda = document.querySelector('#selector-monedas');
  const $datePicker = document.querySelector('#fecha-cotizacion');

  $selectorMoneda.onchange = () => {
    if ($datePicker.value === '') {
      manejarTodo('latest', $selectorMoneda.value);
    } else {
      manejarTodo($datePicker.value, $selectorMoneda.value);
    }
  };

  $datePicker.onchange = () => {
    manejarTodo($datePicker.value, $selectorMoneda.value);
  };
}
