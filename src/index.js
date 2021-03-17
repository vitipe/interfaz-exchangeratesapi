
function manejarDataAPI(fecha, base) {
    borrarNodosTabla();

    fetch(`https://api.exchangeratesapi.io/${fecha}?base=${base}`)
    .then(respuesta => respuesta.json())
    .then(dataAPI => { 
        actualizarFechaYTitulo(dataAPI);
        crearTablaMonedas(dataAPI);       
    })
    .catch((error) => {
        console.error('ERROR:', error)
    })
}

function manejarInputs() {
    let $selectorMoneda = document.querySelector('#selector-monedas')
    let $datePicker = document.querySelector('#fecha-cotizacion')
    
    $selectorMoneda.onchange = () => {
        if ($datePicker.value === "") {
            manejarDataAPI("latest", $selectorMoneda.value)
        } else {
            manejarDataAPI($datePicker.value, $selectorMoneda.value)
        }
    }
    
    $datePicker.onchange = () => {
        manejarDataAPI($datePicker.value, $selectorMoneda.value)
    }
}

function crearTablaMonedas(dataAPI) {
        let arrayRatesKeys = Object.keys(dataAPI.rates);
        let arrayRatesValues = Object.values(dataAPI.rates)

        arrayRatesKeys.forEach((rate, index) => {
            const $tableBody = document.querySelector('tbody');
            let $tableRow = document.createElement('tr');
            let $tableHeader = document.createElement('th');
            $tableHeader.scope = "row";
            $tableHeader.id = `th-${index}`
            $tableHeader.textContent = rate;
            $tableBody.appendChild($tableRow);
            $tableRow.appendChild($tableHeader);
        });

        arrayRatesValues.forEach((value, index) => {
            const $tableRows = document.querySelectorAll('tbody tr');
            let $tableData = document.createElement('td');
            $tableData.textContent = value
            $tableData.id = `td-${index}`
            $tableRows[index].appendChild($tableData)
        })
        armarSelectorMoneda(arrayRatesKeys); //Ver si esto tendría que ir acá. Así se aprovecha un sólo llamado a la API.
}

function armarSelectorMoneda(arrayRatesKeys) {
        arrayRatesKeys.forEach(rate => {
            let $selectorMoneda = document.querySelector('#selector-monedas');
            let $nuevaOptionMoneda = document.createElement('option');
            $nuevaOptionMoneda.value = rate;
            $nuevaOptionMoneda.textContent = rate;
            $selectorMoneda.appendChild($nuevaOptionMoneda);
        })
}

function actualizarFechaYTitulo(dataAPI) {
    document.querySelector('#fecha-actual').textContent = `Fecha de cotización: ${dataAPI.date}`;
    document.querySelector('#fecha-cotizacion').max = dataAPI.date; //Con esto limita fecha máxima del datePicker a la fecha del fecth del día actual
    document.querySelector('#titulo-moneda').textContent = `Todas las monedas cotizadas frente al ${dataAPI.base} (moneda base)`;
}

function borrarNodosTabla() {
    let $trTabla = document.querySelectorAll('tbody tr')
    
    $trTabla.forEach(nodo => {
        nodo.remove();
    })
}

manejarDataAPI("latest", "EUR")

manejarInputs()
