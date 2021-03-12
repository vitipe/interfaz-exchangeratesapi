
function mostrarCurrenciesDelDia(base) {
    fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
    .then(respuesta => respuesta.json())
    .then(dataAPI => { 
        let arrayRatesKeys = Object.keys(dataAPI.rates);
        let arrayRatesValues = Object.values(dataAPI.rates)
        
        arrayRatesKeys.forEach((rate, index) => {
            const $tableBody = document.querySelector('tbody');
            let $tableRow = document.createElement('tr');
            let $tableHeader = document.createElement('th');
            //$tableHeader.id = `th-${index}`;
            $tableHeader.scope = "row";
            $tableHeader.textContent = rate;
            $tableBody.appendChild($tableRow);
            $tableRow.appendChild($tableHeader);
        });

        arrayRatesValues.forEach((value, index) => {
            const $tableRows = document.querySelectorAll('tbody tr');
            let $tableData = document.createElement('td');
            $tableData.textContent = value;
            $tableRows[index].appendChild($tableData)

        })
    });
}

function mostrarCurrencyElegida(base) {

}

function mostrarDiaActual() {
    let hoy = new Date().toLocaleDateString("es-AR")
    document.querySelector('#fecha-actual').textContent = hoy;
}

mostrarDiaActual();

mostrarCurrenciesDelDia("EUR");
