document.addEventListener("DOMContentLoaded", () => {
    // Obtener el estado del usuario desde sessionStorage
    const usuario = sessionStorage.getItem('usuario');
    const nombre = sessionStorage.getItem('nombre');
    const apellido = sessionStorage.getItem('apellido');
    const boton = document.getElementById('BotonNotas');
    const mensajeBienvenida = document.getElementById('mensajeBienvenida');
    const cerrarSesionBtn = document.getElementById('cerrarSesion'); // Botón de cerrar sesión

    if (usuario) {
        // Si el usuario ha iniciado sesión, habilita el botón y muestra el mensaje de bienvenida
        boton.disabled = false;
        mensajeBienvenida.textContent = `Bienvenido, ${nombre} ${apellido}`;
    } else {
        // Si el usuario no ha iniciado sesión, deshabilita el botón y muestra el mensaje restrictivo
        boton.disabled = true;
        boton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir la acción del botón si no hay usuario
            alert("Acción disponible solo para usuarios registrados.");
        });
    }

    // Manejo del cierre de sesión
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', () => {
            sessionStorage.removeItem('usuario'); // Eliminar el usuario del sessionStorage
            sessionStorage.removeItem('nombre'); // Eliminar el nombre
            sessionStorage.removeItem('apellido'); // Eliminar el apellido
            window.location.reload(); // Recargar la página para limpiar el estado
        });
    }
});

