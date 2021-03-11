
function mostrarDiaActual() {
    let hoy = new Date().toLocaleDateString("es-AR")
    document.querySelector('#fecha-actual').textContent = hoy;
}

mostrarDiaActual();
