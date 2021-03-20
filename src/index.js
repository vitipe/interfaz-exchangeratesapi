//arreglar que el max siempre va cambiando (no hardcodearlo pero ver como hacer para que lo tome la primera vez y listo)
//arreglar que no se dupliquen los options del selector (sacarlo al carajo del dom y hardcodearlo mepa)

function manejarDataAPI(fecha, base) {
    borrarNodosTabla();
    console.log(fecha, base)
    fetch(`https://api.exchangeratesapi.io/${fecha}?base=${base}`)
    .then(respuesta => respuesta.json())
    .then(dataAPI => {
        armarSelectorMoneda(dataAPI);
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
}

function armarSelectorMoneda(dataAPI) {
    
    if (document.querySelectorAll('option').length === 0) {
        let arrayRatesKeys = Object.keys(dataAPI.rates);
        let $selectorMoneda = document.querySelector('#selector-monedas');
        let $optionDefaultMoneda = document.createElement('option');
        let $optionEURMoneda = document.createElement('option');
        $optionDefaultMoneda.value = "";
        $optionDefaultMoneda.textContent = "--Elija una moneda--";
        $optionEURMoneda.value = "EUR"
        $optionEURMoneda.textContent = "EUR"
        $selectorMoneda.appendChild($optionDefaultMoneda);
        $selectorMoneda.appendChild($optionEURMoneda);

        arrayRatesKeys.forEach(rate => {
            let $nuevaOptionMoneda = document.createElement('option');
            $nuevaOptionMoneda.value = rate;
            $nuevaOptionMoneda.textContent = rate;
            $selectorMoneda.appendChild($nuevaOptionMoneda);
        })
    }
}

function actualizarFechaYTitulo(dataAPI) {
    
    if (document.querySelector('#fecha-cotizacion').max ===  "") {
        document.querySelector('#fecha-cotizacion').max = dataAPI.date;
    }

    document.querySelector('#fecha-actual').textContent = `Fecha de cotización: ${dataAPI.date}`;
    document.querySelector('#titulo-moneda').textContent = `Todas las monedas cotizadas frente al ${dataAPI.base} (moneda base)`;
}

function borrarOptionsMoneda() {
    let $optionsMoneda = document.querySelectorAll('option')
    
    $optionsMoneda.forEach(nodo => {
        nodo.remove();
    })
}

function borrarNodosTabla() {
    let $trTabla = document.querySelectorAll('tbody tr')
    
    $trTabla.forEach(nodo => {
        nodo.remove();
    })
}

manejarDataAPI("latest", "EUR")

manejarInputs()
