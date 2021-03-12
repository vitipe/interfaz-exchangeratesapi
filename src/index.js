
function mostrarCurrenciesDelDia() {
    fetch('https://api.exchangeratesapi.io/latest')
    .then(respuesta => respuesta.json())
    .then(dataAPI => { 
        let arrayRatesKeys = Object.keys(dataAPI.rates);
        let arrayRatesValues = Object.values(dataAPI.rates)
        console.log(arrayRatesKeys)
        console.log(arrayRatesValues)
    });
}

function mostrarDiaActual() {
    let hoy = new Date().toLocaleDateString("es-AR")
    document.querySelector('#fecha-actual').textContent = hoy;
}

mostrarDiaActual();

mostrarCurrenciesDelDia();