document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;
    // const curso = document.getElementById('curso').value;  // Eliminar esta línea

    const data = { usuario, contraseña }; // Ya no se incluye el curso

    try {
        const response = await fetch('http://localhost:3006/iniciar-sesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Guardar en sessionStorage los datos del usuario
            sessionStorage.setItem('usuario', usuario);
            sessionStorage.setItem('nombre', result.nombre);
            sessionStorage.setItem('apellido', result.apellido);

            // Verificar si el usuario es un administrador
            if (result.isAdmin) {
                sessionStorage.setItem('isAdmin', 'true');
                sessionStorage.setItem('id_alumno', null);  // No se guarda id_alumno para administrador
                sessionStorage.setItem('id_curso', null);  // No se guarda id_curso para administrador
                console.log('Administrador logueado');
            } else {
                sessionStorage.setItem('isAdmin', 'false');
                sessionStorage.setItem('id_alumno', result.id_alumno);  // Guardar id_alumno
                sessionStorage.setItem('id_curso', result.id_curso);  // Guardar id_curso
                console.log('Alumno logueado', result.id_alumno, result.id_curso);
            }

            // Verificar que los datos se guardaron correctamente
            console.log("id_alumno guardado:", sessionStorage.getItem('id_alumno'));
            console.log("id_curso guardado:", sessionStorage.getItem('id_curso'));

            // Redirige según el tipo de usuario
            setTimeout(() => {
                window.location.href = result.redirect; // Redirigir según el tipo de usuario
            }, 100);
        } else {
            // Mostrar el mensaje de error si el inicio de sesión falla
            alert('Error al iniciar sesión: ' + result.message);
        }
    } catch (error) {
        // Mostrar un mensaje en caso de error de conexión
        alert('Error de conexión: ' + error.message);
    }
});



