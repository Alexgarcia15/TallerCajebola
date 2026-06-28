let carrito = [];
let total = 0;

function agregarServicio() {
    const select = document.getElementById('selector-servicios');
    const precio = parseInt(select.value);
    const nombre = select.options[select.selectedIndex].text.split(" - ")[0];

    if (!select.value) return;

    if (carrito.find(s => s.nombre === nombre)) {
        alert("Este servicio ya está en la lista.");
        select.value = "";
        return;
    }

    carrito.push({ nombre, precio });
    total += precio;
    actualizarInterfaz();
    select.value = "";
}

function eliminarServicio(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarInterfaz();
}

function actualizarInterfaz() {
    const contenedor = document.getElementById('lista-seleccionados');
    contenedor.innerHTML = "";
    carrito.forEach((s, index) => {
        contenedor.innerHTML += `
            <div class="tag-servicio">
                ${s.nombre} ($${s.precio.toLocaleString()})
                <span onclick="eliminarServicio(${index})">&times;</span>
            </div>`;
    });
    document.getElementById('cuadro-total').innerText = "Total: $" + total.toLocaleString();
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre').value;
    const placa = document.getElementById('placa').value;
    const telefono = "18099832335"; 

    if (!nombre || !placa || carrito.length === 0) {
        alert("Por favor, llene sus datos y elija al menos un servicio.");
        return;
    }

    const listaStr = carrito.map(s => "- " + s.nombre + ": $" + s.precio.toLocaleString()).join("%0A");
    
    // EL MENSAJE CON LA PREGUNTA AL FINAL
    const mensaje = `*COTIZACIÓN TALLER CAJEBOLA*%0A%0A` +
                    `*Cliente:* ${nombre}%0A` +
                    `*Placa:* ${placa}%0A%0A` +
                    `*Servicios:*%0A${listaStr}%0A%0A` +
                    `*TOTAL:* $${total.toLocaleString()}%0A%0A` +
                    `*¿Cuando paso por alla maestro?*`; 

    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}