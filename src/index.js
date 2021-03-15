
function armarTablaMonedas(base) {
    fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
    .then(respuesta => respuesta.json())
    .then(dataAPI => { 
        let arrayRatesKeys = Object.keys(dataAPI.rates);
        let arrayRatesValues = Object.values(dataAPI.rates)

        //esto de aca abajo tengo la idea de que lo puedo hacer en un solo forEach, con dataAPI.base y dataAPI.base.values o algo asi
        arrayRatesKeys.forEach((rate, index) => {
            const $tableBody = document.querySelector('tbody');
            let $tableRow = document.createElement('tr');
            let $tableHeader = document.createElement('th');
            //$tableHeader.id = `th-${index}`;
            $tableHeader.scope = "row";
            $tableHeader.id = `th-${index}`
            $tableHeader.textContent = rate;
            $tableBody.appendChild($tableRow);
            $tableRow.appendChild($tableHeader);
        });

        arrayRatesValues.forEach((value, index) => {
            const $tableRows = document.querySelectorAll('tbody tr');
            let $tableData = document.createElement('td');
            $tableData.textContent = value;
            $tableData.id = `td-${index}`
            $tableRows[index].appendChild($tableData)

        })
    })
    .catch((error) => {
        console.error('ERROR:', error)
    })
}


function actualizarFechaYTitulo() {
    fetch(`https://api.exchangeratesapi.io/latest`)
    .then(respuesta => respuesta.json())
    .then(dataAPI => { 
        document.querySelector('#fecha-actual').textContent = `Fecha de cotización: ${dataAPI.date}`;
        document.querySelector('#titulo-moneda').textContent = `Todas las monedas cotizadas frente al ${dataAPI.base} (moneda base)`;
    });
}

function mostrarTablaMonedaElegida(base) {
    fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
    .then(respuesta => respuesta.json())
    .then(dataAPI => { 
        let arrayRatesKeys = Object.keys(dataAPI.rates);
        let arrayRatesValues = Object.values(dataAPI.rates)

        //seleccionar todos los th
        //seleccionar todos los td
        //cambiar los valores de todos fetecheando la moneda elegida

    });
}

function cambiarFechaMoneda(fecha) {
    //hace un fetch con la fecha elegida
    //cambia el titulo de la fecha
    //rearma la tabla
}

function armarSelectorMoneda() {
    fetch('https://api.exchangeratesapi.io/latest')
    .then(respuesta => respuesta.json())
    .then(dataAPI => {
        let arrayRatesKeys = Object.keys(dataAPI.rates);

        arrayRatesKeys.forEach(rate => {
            let $selectorMoneda = document.querySelector('#selector-monedas');
            let $nuevaOptionMoneda = document.createElement('option');
            $nuevaOptionMoneda.value = rate;
            $nuevaOptionMoneda.textContent = rate;
            $selectorMoneda.appendChild($nuevaOptionMoneda);
        })

        //<option value="audi">Audi</option>
    })
}


actualizarFechaYTitulo();

armarTablaMonedas("EUR");

armarSelectorMoneda();
