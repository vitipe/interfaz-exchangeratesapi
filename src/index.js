
function muestraCurrenciesDelDia() {
    fetch('https://api.exchangeratesapi.io/latest')
    .then(respuesta => respuesta.json())
    .then(data => console.log(data))  // despues del arrow le digo que es lo que quiero hacer(crear los elementos de la tabla)
}

function mostrarDiaActual() {
    let hoy = new Date().toLocaleDateString("es-AR")
    document.querySelector('#fecha-actual').textContent = hoy;
}

mostrarDiaActual();

muestraCurrenciesDelDia();