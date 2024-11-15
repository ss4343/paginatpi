document.getElementById('registro-form').addEventListener('submit', async (event) => {
    event.preventDefault();  // Previene el comportamiento por defecto del formulario
    const formData = new FormData(event.target);  // Obtiene los datos del formulario
    const data = Object.fromEntries(formData);  // Convierte los datos a un objeto

    try {
        // Enviar la solicitud al servidor
        const response = await fetch('http://192.168.20.100:3006/registro-alumno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },  // Tipo de contenido: JSON
            body: JSON.stringify(data),  // Convertir los datos del formulario a JSON
        });

        // Procesar la respuesta del servidor
        const result = await response.json();  // Parsear la respuesta como JSON
        if (response.ok) {
            // Si la respuesta es exitosa, mostrar el mensaje de confirmación
            document.getElementById("mensaje-confirmacion").style.display = "block";
            document.getElementById("registro-form").reset();  // Limpiar el formulario
        } else {
            // Si hubo un error, mostrar el mensaje de error
            alert('Hubo un error: ' + result.error);
        }
    } catch (error) {
        // Manejar cualquier error que ocurra con la solicitud
        alert('Error de conexión: ' + error.message);
    }
});

// Función para cerrar el mensaje de confirmación
function cerrarMensaje() {
    document.getElementById("mensaje-confirmacion").style.display = "none";
}
