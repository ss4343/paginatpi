document.addEventListener("DOMContentLoaded", () => {
    // Obtener el nombre del admin desde sessionStorage
    const nombre = sessionStorage.getItem('nombre');
    const apellido = sessionStorage.getItem('apellido');
    const nombreAdminDiv = document.getElementById('nombreAdmin');

    // Mostrar el nombre y apellido del administrador
    if (nombre && apellido) {
        nombreAdminDiv.textContent = `Bienvenido, Administrador ${nombre} ${apellido}`;
    }

    // Botón de cerrar sesión
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', () => {
            // Eliminar los datos del sessionStorage
            sessionStorage.removeItem('usuario');
            sessionStorage.removeItem('nombre');
            sessionStorage.removeItem('apellido');
            sessionStorage.removeItem('isAdmin'); // Eliminar también el indicador de admin

            // Redirigir al login
            window.location.href = 'index.html'; // Asegúrate de que el archivo de login esté correctamente vinculado
        });
    }
});
