document.addEventListener('DOMContentLoaded', cargarCursos); // Cargar cursos al cargar la página

document.getElementById('alumno').addEventListener('change', function() {
    const alumnoId = this.value;
    document.getElementById('id_alumno').value = alumnoId;  // Asignar el id del alumno al campo oculto
});

function limpiarInputs() {
    // Selecciona todos los inputs dentro del formulario con el ID 'boletinForm'
    const inputs = document.querySelectorAll('#boletinForm input[type="number"]');
    
    // Recorre cada input y establece su valor en vacío
    inputs.forEach(input => input.value = '');
}


async function cargarCursos() {
    const cursoSelect = document.getElementById('curso');

    try {
        // Cargar cursos desde el servidor
        const response = await fetch('http://192.168.20.100:3006/cursos');
        if (!response.ok) throw new Error('Error en la respuesta de cursos');
        const cursos = await response.json();

        // Llenar el select de cursos
        cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.id_curso;
            option.text = curso.nombre_curso;
            cursoSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los cursos:', error);
        alert('No se pudieron cargar los cursos, intenta de nuevo más tarde.');
    }
}

async function cargarAlumnos() {
    const cursoId = document.getElementById('curso').value;
    const alumnoSelect = document.getElementById('alumno');

    // Limpiar los alumnos anteriores
    alumnoSelect.innerHTML = "<option value=''>-- Seleccionar --</option>";

    if (cursoId) {
        try {
            const response = await fetch(`http://192.168.20.100:3006/alumnos-por-curso/${cursoId}`);
            if (!response.ok) throw new Error('Error en la respuesta de alumnos');
            const alumnos = await response.json();

            // Llenar el select de alumnos con los datos recibidos
            alumnos.forEach(alumno => {
                const option = document.createElement('option');
                option.value = alumno.id_alumno;
                option.text = alumno.nombre + ' ' + alumno.apellido;
                alumnoSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar alumnos:', error);
            alert('No se pudieron cargar los alumnos, intenta de nuevo más tarde.');
        }
    }
}

function verNotas() {
    console.log("verNotas se ejecutó");
    const alumnoId = document.getElementById("alumno").value;  
    const cursoId = document.getElementById("curso").value;

    if (!alumnoId || !cursoId) {
        alert("Por favor, selecciona un curso y un alumno.");
        return;
    }

    fetch(`http://192.168.20.100:3006/obtenerNotas?id_alumno=${alumnoId}&id_curso=${cursoId}`)
        .then(response => response.json())
        .then(data => {
            console.log("Datos recibidos:", data);
            
            if (data && data.notas) {
                const notas = data.notas;
        
                // Verificar las materias que estamos recibiendo
                console.log("Materias recibidas:", Object.keys(notas));
        
                // Recorre cada materia y actualiza los inputs correspondientes
                for (const materia in notas) {
                    const materiaNotas = notas[materia];
        
                    // Verifica que la materia sea válida
                    console.log("Notas para la materia", materia, materiaNotas);
        
                    // Recorre cada propiedad de las notas de la materia y actualiza el input correspondiente
                    for (const key in materiaNotas) {
                        const inputId = `${materia.toLowerCase()}_${key.toLowerCase()}`;
                        const input = document.getElementById(inputId);
        
                        if (input) {
                            input.value = materiaNotas[key] || '';  // Asigna el valor o vacío si no existe
                        }
                    }
                }
            } else {
                alert("No se encontraron notas para el alumno seleccionado.");
            }
        })
    }        
async function enviarCalificaciones() {
    const id_alumno = document.getElementById('id_alumno').value;
    const id_curso = document.getElementById('curso').value;

    if (!id_alumno || !id_curso) {
        alert("Por favor, selecciona un alumno y un curso.");
        return;
    }

    const materias = {};
    const filas = document.querySelectorAll('table tr');

    filas.forEach((fila, index) => {
        if (index === 0) return;  // Ignorar la primera fila (cabecera)

        const nombreMateria = fila.cells[0].innerText.trim();
        const materiaData = {};

        for (let i = 1; i < fila.cells.length; i++) {
            const input = fila.cells[i].querySelector('input');

            if (input && input.value !== "") {
                const campo = input.name.split('[')[1].split(']')[0];
                materiaData[campo] = input.value;
            }
        }

        if (Object.keys(materiaData).length > 0) {
            materias[nombreMateria] = materiaData;
        }
    });

    if (Object.keys(materias).length === 0) {
        alert("Por favor, ingresa al menos una calificación.");
        return;
    }

    const data = {
        id_alumno: id_alumno,
        id_curso: id_curso,
        materias: materias
    };

    fetch('http://192.168.20.100:3006/api/calificaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'Calificaciones guardadas exitosamente');
        document.getElementById('boletinForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error en el envío de los datos.');
    });
}