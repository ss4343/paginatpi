document.addEventListener('DOMContentLoaded', async () => {
    const id_alumno = sessionStorage.getItem('id_alumno');  // Obtener id_alumno desde sessionStorage

    if (id_alumno) {
        try {
            // Realizar la consulta a tu servidor para obtener las calificaciones
            const response = await fetch(`http://localhost:3006/calificaciones/${id_alumno}`);
            const result = await response.json();

            if (response.ok) {
                // Procesar las calificaciones y mostrarlas en el formulario
                mostrarCalificaciones(result);  // Llamada a la función para mostrar las calificaciones
            } else {
                alert('No se pudieron cargar las calificaciones.');
            }
        } catch (error) {
            alert('Error de conexión: ' + error.message);
        }
    } else {
        alert('No se encontró el ID del alumno.');
    }
});

// Función para mostrar las calificaciones en los inputs del formulario
function mostrarCalificaciones(calificaciones) {
    const notas = calificaciones.notas; // Accede a las notas dentro del objeto de respuesta

    // Itera sobre cada materia y asigna las calificaciones a los inputs correspondientes
    for (let materia in notas) {
        const materiaCalificacion = notas[materia];

        // Asigna las calificaciones a los campos correspondientes en el formulario
        if (materia === 'ingles') {
            document.getElementById('ingles_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('ingles_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('ingles_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('ingles_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('ingles_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('ingles_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('ingles_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('ingles_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('ingles_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('ingles_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#ingles_primer_informe, #ingles_segundo_informe, #ingles_nota_primer_cuatrimestre, #ingles_primer_informe2, #ingles_segundo_informe2, #ingles_nota_segundo_cuatrimestre, #ingles_calificacion_anual, #ingles_calificacion_diciembre, #ingles_calificacion_febrero_marzo, #ingles_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);  // Establecer el atributo 'readonly'
            });
        }
        
        if (materia === 'matematica') {
            document.getElementById('matematica_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('matematica_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('matematica_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('matematica_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('matematica_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('matematica_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('matematica_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('matematica_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('matematica_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('matematica_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#matematica_primer_informe, #matematica_segundo_informe, #matematica_nota_primer_cuatrimestre, #matematica_primer_informe2, #matematica_segundo_informe2, #matematica_nota_segundo_cuatrimestre, #matematica_calificacion_anual, #matematica_calificacion_diciembre, #matematica_calificacion_febrero_marzo, #matematica_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);  // Establecer el atributo 'readonly'
            });
        }
        if (materia === 'marco juridico') {
            document.getElementById('marco juridico_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('marco juridico_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('marco juridico_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('marco juridico_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('marco juridico_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('marco juridico_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('marco juridico_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('marco juridico_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('marco juridico_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('marco juridico_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#marco\\ juridico_primer_informe, #marco\\ juridico_segundo_informe, #marco\\ juridico_nota_primer_cuatrimestre, #marco\\ juridico_primer_informe2, #marco\\ juridico_segundo_informe2, #marco\\ juridico_nota_segundo_cuatrimestre, #marco\\ juridico_calificacion_anual, #marco\\ juridico_calificacion_diciembre, #marco\\ juridico_calificacion_febrero_marzo, #marco\\ juridico_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);  // Establecer el atributo 'readonly'
            });
        }
        if (materia === 'asistencia 2') {
            document.getElementById('asistencia 2_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('asistencia 2_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('asistencia 2_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('asistencia 2_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('asistencia 2_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('asistencia 2_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('asistencia 2_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('asistencia 2_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('asistencia 2_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('asistencia 2_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#asistencia\\ 2_primer_informe, #asistencia\\ 2_segundo_informe, #asistencia\\ 2_nota_primer_cuatrimestre, #asistencia\\ 2_primer_informe2, #asistencia\\ 2_segundo_informe2, #asistencia\\ 2_nota_segundo_cuatrimestre, #asistencia\\ 2_calificacion_anual, #asistencia\\ 2_calificacione_diciembre, #asistencia\\ 2_calificacion_febrero_marzo, #asistencia\\ 2_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);
            });
        }
        if (materia === 'autogestion') {
            document.getElementById('autogestion_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('autogestion_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('autogestion_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('autogestion_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('autogestion_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('autogestion_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('autogestion_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('autogestion_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('autogestion_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('autogestion_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#autogestion_primer_informe, #autogestion_segundo_informe, #autogestion_nota_primer_cuatrimestre, #autogestion_primer_informe2, #autogestion_segundo_informe2, #autogestion_nota_segundo_cuatrimestre, #autogestion_calificacion_anual, #autogestion_calificacion_diciembre, #autogestion_calificacion_febrero_marzo, #autogestion_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);
            });
            
        }
        if (materia === 'hardware 4') {
            document.getElementById('hardware 4_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('hardware 4_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('hardware 4_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('hardware 4_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('hardware 4_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('hardware 4_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('hardware 4_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('hardware 4_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('hardware 4_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('hardware 4_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#hardware\\ 4_primer_informe, #hardware\\ 4_segundo_informe, #hardware\\ 4_nota_primer_cuatrimestre, #hardware\\ 4_primer_informe2, #hardware\\ 4_segundo_informe2, #hardware\\ 4_nota_segundo_cuatrimestre, #hardware\\ 4_calificacion_anual, #hardware\\ 4_calificacion_diciembre, #hardware\\ 4_calificacion_febrero_marzo, #hardware\\ 4_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);
            });
            
        }
        if (materia === 'practicas 2') {
            document.getElementById('practicas 2_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('practicas 2_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('practicas 2_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('practicas 2_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('practicas 2_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('practicas 2_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('practicas 2_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('practicas 2_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('practicas 2_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('practicas 2_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#practicas\\ 2_primer_informe, #practicas\\ 2_segundo_informe, #practicas\\ 2_nota_primer_cuatrimestre, #practicas\\ 2_primer_informe2, #practicas\\ 2_segundo_informe2, #practicas\\ 2_nota_segundo_cuatrimestre, #practicas\\ 2_calificacion_anual, #practicas\\ 2_calificacion_diciembre, #practicas\\ 2_calificacion_febrero_marzo, #practicas\\ 2_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);
            });
            
        }
        if (materia === 'programacion 4') {
            document.getElementById('programacion 4_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('programacion 4_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('programacion 4_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('programacion 4_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('programacion 4_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('programacion 4_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('programacion 4_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('programacion 4_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('programacion 4_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('programacion 4_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#programacion\\ 4_primer_informe, #programacion\\ 4_segundo_informe, #programacion\\ 4_nota_primer_cuatrimestre, #programacion\\ 4_primer_informe2, #programacion\\ 4_segundo_informe2, #programacion\\ 4_nota_segundo_cuatrimestre, #programacion\\ 4_calificacion_anual, #programacion\\ 4_calificacion_diciembre, #programacion\\ 4_calificacion_febrero_marzo, #programacion\\ 4_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);
            });
            
        }
        if (materia === 'redes 3') {
            document.getElementById('redes 3_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('redes 3_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('redes 3_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('redes 3_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('redes 3_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('redes 3_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('redes 3_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('redes 3_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('redes 3_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('redes 3_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#redes\\ 3_primer_informe, #redes\\ 3_segundo_informe, #redes\\ 3_nota_primer_cuatrimestre, #redes\\ 3_primer_informe2, #redes\\ 3_segundo_informe2, #redes\\ 3_nota_segundo_cuatrimestre, #redes\\ 3_calificacion_anual, #redes\\ 3_calificacion_diciembre, #redes\\ 3_calificacion_febrero_marzo, #redes\\ 3_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);
            });
            
        }
        if (materia === 'arduino 3') {
            document.getElementById('arduino 3_primer_informe').value = materiaCalificacion.primer_informe || '';
            document.getElementById('arduino 3_segundo_informe').value = materiaCalificacion.segundo_informe || '';
            document.getElementById('arduino 3_nota_primer_cuatrimestre').value = materiaCalificacion.nota_primer_cuatrimestre || '';
            document.getElementById('arduino 3_primer_informe2').value = materiaCalificacion.primer_informe2 || '';
            document.getElementById('arduino 3_segundo_informe2').value = materiaCalificacion.segundo_informe2 || '';
            document.getElementById('arduino 3_nota_segundo_cuatrimestre').value = materiaCalificacion.nota_segundo_cuatrimestre || '';
            document.getElementById('arduino 3_calificacion_anual').value = materiaCalificacion.calificacion_anual || '';
            document.getElementById('arduino 3_calificacion_diciembre').value = materiaCalificacion.calificacion_diciembre || '';
            document.getElementById('arduino 3_calificacion_febrero_marzo').value = materiaCalificacion.calificacion_febrero_marzo || '';
            document.getElementById('arduino 3_calificacion_definitiva').value = materiaCalificacion.calificacion_definitiva || '';
            document.querySelectorAll('#arduino\\ 3_primer_informe, #arduino\\ 3_segundo_informe, #arduino\\ 3_nota_primer_cuatrimestre, #arduino\\ 3_primer_informe2, #arduino\\ 3_segundo_informe2, #arduino\\ 3_nota_segundo_cuatrimestre, #arduino\\ 3_calificacion_anual, #arduino\\ 3_calificacion_diciembre, #arduino\\ 3_calificacion_febrero_marzo, #arduino\\ 3_calificacion_definitiva').forEach(input => {
                input.setAttribute('readonly', true);
            });
            
        }
        
    }
    
}




