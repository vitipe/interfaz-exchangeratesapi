function armarSelectorMoneda(dataAPI) {
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

function actualizarFechaYTitulo(dataAPI) {
  if (document.querySelector('#fecha-cotizacion').max === '') {
    document.querySelector('#fecha-cotizacion').max = dataAPI.date;
  }

  document.querySelector('#fecha-actual').textContent = `Fecha de cotización: ${dataAPI.date}`;
  document.querySelector('#titulo-moneda').textContent = `Todas las monedas cotizadas frente al ${dataAPI.base} (moneda base)`;
}

function borrarNodosTabla() {
  const $trTabla = document.querySelectorAll('tbody tr');

  $trTabla.forEach((nodo) => {
    nodo.remove();
  });
}

function crearTablaMonedas(dataAPI) {
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

function manejarDataAPI(fecha, base) {
  borrarNodosTabla();

  fetch(`https://api.ratesapi.io/api/${fecha}?base=${base}`)
    .then((respuesta) => respuesta.json())
    .then((dataAPI) => {
      armarSelectorMoneda(dataAPI);
      actualizarFechaYTitulo(dataAPI);
      crearTablaMonedas(dataAPI);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('ERROR:', error);
    });
}

function manejarInputs() {
  const $selectorMoneda = document.querySelector('#selector-monedas');
  const $datePicker = document.querySelector('#fecha-cotizacion');

  $selectorMoneda.onchange = () => {
    if ($datePicker.value === '') {
      manejarDataAPI('latest', $selectorMoneda.value);
    } else {
      manejarDataAPI($datePicker.value, $selectorMoneda.value);
    }
  };

  $datePicker.onchange = () => {
    manejarDataAPI($datePicker.value, $selectorMoneda.value);
  };
}

manejarDataAPI('latest', 'EUR');

manejarInputs();
