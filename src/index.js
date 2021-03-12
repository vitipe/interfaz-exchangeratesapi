
function mostrarCurrenciesDelDia() {
    fetch('https://api.exchangeratesapi.io/latest')
    .then(respuesta => respuesta.json())
    .then(dataAPI => { 
        let arrayRatesKeys = Object.keys(dataAPI.rates);
        let arrayRatesValues = Object.values(dataAPI.rates)
        console.log(arrayRatesKeys)
        console.log(arrayRatesValues)
        
        arrayRatesKeys.forEach((rate, index) => {
            const $tableBody = document.querySelector('tbody');
            let $tableRow = document.createElement('tr');
            let $th = document.createElement('th');
            $th.id = `th-${index}`;
            $th.scope = "row";
            $th.textContent = rate;
            $tableBody.appendChild($tableRow);
            $tableRow.appendChild($th);
        });

        arrayRatesValues.forEach((value, index) => {

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

mostrarCurrenciesDelDia();

/*
Para asignar los valores a la tabla es:
Crear un <tr> (fila)
Crear un <th scope="row">(primer valor)
Crear un <td> (segundo valor)
append th al tr
append td al tr
*/

//para que cambie cuando cambian el value del select fijarse en 
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event

/*
                <tbody>
                  <tr>
                    <th scope="row">USD</th>
                    <td>1.50</td>
                  </tr>
                  <tr>
                    <th scope="row">EUR</th>
                    <td>1.50</td>
                  </tr>
                </tbody>
*/