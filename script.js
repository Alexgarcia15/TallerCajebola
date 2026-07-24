let carrito = [];
let total = 0;

function agregarServicio() {
    const select = document.getElementById('selector-servicios');
    const precio = parseInt(select.value);
    const nombreServicio = select.options[select.selectedIndex].text.split(" - ")[0];

    if (!select.value) return;
    if (carrito.find(s => s.nombre === nombreServicio)) {
        alert("Este servicio ya está en la lista.");
        select.value = "";
        return;
    }

    carrito.push({ nombre: nombreServicio, precio });
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
    document.getElementById('cuadro-total').innerText = "Total Estimado: $" + total.toLocaleString();
}

function enviarWhatsApp() {
    const nombre = document.getElementById('nombre').value;
    const placa = document.getElementById('placa').value;
    const falla = document.getElementById('falla').value || "No especificada"; // Por si no escribe nada
    const telefono = "18099832335"; 

    if (!nombre || !placa || carrito.length === 0) {
        alert("Por favor, llene los datos y seleccione al menos un servicio.");
        return;
    }

    const listaStr = carrito.map(s => "- " + s.nombre + ": $" + s.precio.toLocaleString()).join("%0A");
    
    const mensaje = `*🛠️ ORDEN DE REPARACIÓN - CAJEBOLA*%0A%0A` +
                    `*Dueño/Chofer:* ${nombre}%0A` +
                    `*Ficha o Placa:* ${placa}%0A%0A` +
                    `*Falla reportada:*%0A${falla}%0A%0A` +
                    `*Servicios solicitados:*%0A${listaStr}%0A%0A` +
                    `*TOTAL ESTIMADO:* $${total.toLocaleString()}%0A%0A` +
                    `*¿Cuando paso por alla maestro?*`; 

    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}


// 1. Configuramos el botón de suscripción
const btnSuscribir = document.getElementById('btnSuscribirPro');

// 2. Tu número de WhatsApp (Ejemplo: 1809XXXXXXX)
const miTelefono = "18295581414"; // <--- CAMBIA ESTO POR TU NÚMERO REAL

btnSuscribir.addEventListener('click', () => {
    // 3. Creamos el mensaje personalizado
    const mensaje = encodeURIComponent("¡Hola! Me interesa activar el Plan Profesional para mi taller. Vengo desde la aplicación.");
    
    // 4. Creamos el enlace de WhatsApp
    const urlWhatsApp = `https://wa.me/${miTelefono}?text=${mensaje}`;
    
    // 5. Abrimos WhatsApp en una pestaña nueva
    window.open(urlWhatsApp, '_blank');
});


// 1. Seleccionamos el botón de "Empezar Gratis"
const btnGratis = document.getElementById('btnGratis');

// 2. Escuchamos el clic
btnGratis.addEventListener('click', () => {
    // 3. Buscamos el cotizador por su ID y nos movemos hacia él
    document.getElementById('cotizador').scrollIntoView({
        behavior: 'smooth', // Esto hace el movimiento suave
        block: 'start'      // Alinea el inicio del cotizador arriba
    });
});