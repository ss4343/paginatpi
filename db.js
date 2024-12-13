const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3006;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abc123456',
    database: 'ColegioGuevara'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        return;
    }
    console.log('Conectado a la base de datos');
});

app.get('/cursos', (req, res) => {
    connection.query('SELECT id_curso, nombre_curso FROM cursos', (err, results) => {
        if (err) {
            console.error('Error al obtener cursos:', err.message);
            return res.status(500).json({ error: 'Error al obtener cursos' });
        }
        res.status(200).json(results); // Responde con los cursos
    });
});

app.get('/alumnos-por-curso/:cursoId', (req, res) => {
    const sql = 'SELECT * FROM alumnos WHERE curso = ?';
    connection.query(sql, [req.params.cursoId], (err, results) => {
        if (err) {
            console.error('Error al obtener alumnos:', err.message);
            return res.status(500).json({ error: 'Error al obtener alumnos' });
        }
        res.status(200).json(results);  // Devolver los alumnos del curso
    });
});

app.post('/registro-alumno', (req, res) => {
    const { nombre, apellido, usuario, contraseña, curso } = req.body;
    const sql = 'INSERT INTO alumnos (nombre, apellido, usuario, contraseña, curso) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [nombre, apellido, usuario, contraseña, curso], (err) => {
        if (err) {
            console.error('Error al registrar alumno:', err.message);
            return res.status(500).json({ error: 'Error al registrar alumno' });
        }
        res.status(200).json({ message: 'Alumno registrado con éxito' });
    });
});

// Ruta para iniciar sesión
app.post('/iniciar-sesion', (req, res) => {
    const { usuario, contraseña } = req.body; // Eliminar curso de aquí

    // Verificación para administradores
    const queryAdmin = 'SELECT * FROM administradores WHERE usuario = ? AND contraseña = ?';
    connection.query(queryAdmin, [usuario, contraseña], (err, resultAdmin) => {
        if (err) {
            console.error('Error al verificar administrador:', err); // Mejorado el log
            return res.status(500).json({ error: 'Error al verificar administrador' });
        }

        if (resultAdmin.length > 0) {
            // El usuario es administrador
            return res.status(200).json({
                redirect: 'http://localhost:3006/indexadmin.html',
                nombre: resultAdmin[0].nombre,
                apellido: resultAdmin[0].apellido,
                isAdmin: true // Indicamos que es un administrador
            });
        }

        // Verificar como alumno (ya sin curso en la consulta)
        const queryAlumno = 'SELECT * FROM alumnos WHERE usuario = ? AND contraseña = ?';
        connection.query(queryAlumno, [usuario, contraseña], (err, resultAlumno) => {
            if (err) {
                console.error('Error al verificar alumno:', err); // Mejorado el log
                return res.status(500).json({ error: 'Error al verificar alumno' });
            }

            if (resultAlumno.length > 0) {
                // El alumno tiene acceso
                const idAlumno = resultAlumno[0].id_alumno;
                const idCurso = resultAlumno[0].id_curso;

                return res.status(200).json({
                    redirect: 'http://localhost:3006/tablauser.html',  // Redirigir al alumno
                    nombre: resultAlumno[0].nombre,
                    apellido: resultAlumno[0].apellido,
                    isAdmin: false,  // Indica que no es un administrador
                    id_alumno: idAlumno,
                    id_curso: idCurso  // Devolver también el id_curso
                });
            }

            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        });
    });
});



// Código para manejar el envío de las calificaciones con el ID del alumno

app.post('/api/calificaciones', (req, res) => {
    const { id_alumno, id_curso, materias } = req.body;

    console.log('id_curso:', id_curso);  // Verifica si llega bien
    console.log('materias:', materias);  // Verifica los datos de materias

    if (!id_alumno || !id_curso || !materias || Object.keys(materias).length === 0) {
        return res.status(400).json({ message: 'Faltan datos requeridos o no se enviaron materias.' });
    }

    const promises = [];

    // Recorrer todas las materias y sus calificaciones
    for (let materia in materias) {
        const materiaData = materias[materia];

        if (!materiaData || !materiaData.primer_informe) {
            // Si alguna materia no tiene datos o no tiene calificaciones, la saltamos
            console.log(`Saltando materia ${materia} debido a falta de datos.`);
            continue;
        }

        // Preparamos los valores de la consulta
        const params = [
            id_alumno,
            id_curso,  // Asegúrate de que id_curso esté aquí
            materia,   // Nombre de la materia
            materiaData.primer_informe || null,
            materiaData.segundo_informe || null,
            materiaData.nota_primer_cuatrimestre || null,
            materiaData.primer_informe2 || null,
            materiaData.segundo_informe2 || null,
            materiaData.nota_segundo_cuatrimestre || null,
            materiaData.calificacion_anual || null,
            materiaData.calificacion_diciembre || null,
            materiaData.calificacion_febrero_marzo || null,
            materiaData.calificacion_definitiva || null
        ];

        const query = `
        INSERT INTO calificaciones (id_alumno, id_curso, materia, primer_informe, segundo_informe, 
                                    nota_primer_cuatrimestre, primer_informe2, segundo_informe2, 
                                    nota_segundo_cuatrimestre, calificacion_anual, 
                                    calificacion_diciembre, calificacion_febrero_marzo, 
                                    calificacion_definitiva)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            primer_informe = IFNULL(VALUES(primer_informe), primer_informe),
            segundo_informe = IFNULL(VALUES(segundo_informe), segundo_informe),
            nota_primer_cuatrimestre = IFNULL(VALUES(nota_primer_cuatrimestre), nota_primer_cuatrimestre),
            primer_informe2 = IFNULL(VALUES(primer_informe2), primer_informe2),
            segundo_informe2 = IFNULL(VALUES(segundo_informe2), segundo_informe2),
            nota_segundo_cuatrimestre = IFNULL(VALUES(nota_segundo_cuatrimestre), nota_segundo_cuatrimestre),
            calificacion_anual = IFNULL(VALUES(calificacion_anual), calificacion_anual),
            calificacion_diciembre = IFNULL(VALUES(calificacion_diciembre), calificacion_diciembre),
            calificacion_febrero_marzo = IFNULL(VALUES(calificacion_febrero_marzo), calificacion_febrero_marzo),
            calificacion_definitiva = IFNULL(VALUES(calificacion_definitiva), calificacion_definitiva)
        `;

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(query, params, (err, results) => {
                    if (err) {
                        console.error('Error al insertar la calificación para materia ' + materia, err.message);
                        return reject(err);
                    }
                    console.log('Calificación guardada para materia: ' + materia);
                    resolve(results);
                });
            })
        );
    }

    Promise.all(promises)
        .then(() => {
            res.status(200).json({ message: 'Calificaciones guardadas o actualizadas exitosamente.' });
        })
        .catch((error) => {
            console.error('Error en la base de datos:', error.message);
            res.status(500).json({ message: 'Error al guardar las calificaciones.' });
        });
});

// Ruta para obtener las notas de un alumno
app.get('/obtenerNotas', (req, res) => {
    const id_alumno = req.query.id_alumno;
    const id_curso = req.query.id_curso;

    const query = `
    SELECT materia, primer_informe, segundo_informe, nota_primer_cuatrimestre, primer_informe2, segundo_informe2,
           nota_segundo_cuatrimestre, calificacion_anual, calificacion_diciembre, calificacion_febrero_marzo,
           calificacion_definitiva
    FROM calificaciones
    WHERE id_alumno = ? AND id_curso = ?`;  // Se mantiene 'id_curso' para las calificaciones

    connection.query(query, [id_alumno, id_curso], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Error en la base de datos" });
            return;
        }

        if (results.length > 0) {
            const notasResponse = {
                notas: results.reduce((acc, row) => {
                    acc[row.materia.toLowerCase()] = {
                        primer_informe: row.primer_informe,
                        segundo_informe: row.segundo_informe,
                        nota_primer_cuatrimestre: row.nota_primer_cuatrimestre,
                        primer_informe2: row.primer_informe2,
                        segundo_informe2: row.segundo_informe2,
                        nota_segundo_cuatrimestre: row.nota_segundo_cuatrimestre,
                        calificacion_anual: row.calificacion_anual,
                        calificacion_diciembre: row.calificacion_diciembre,
                        calificacion_febrero_marzo: row.calificacion_febrero_marzo,
                        calificacion_definitiva: row.calificacion_definitiva,
                    };
                    return acc;
                }, {})
            };

            res.json(notasResponse);
        } else {
            res.status(404).json({ message: "Notas no encontradas" });
        }
    });
});

app.get('/calificaciones/:id_alumno', (req, res) => {
    const { id_alumno } = req.params;

    // Aquí realizas la consulta a la base de datos para obtener las calificaciones del alumno
    const query = `
        SELECT materia, primer_informe, segundo_informe, 
               nota_primer_cuatrimestre, primer_informe2, segundo_informe2, 
               nota_segundo_cuatrimestre, calificacion_anual, 
               calificacion_diciembre, calificacion_febrero_marzo,
               calificacion_definitiva
        FROM calificaciones
        WHERE id_alumno = ?
    `;

    connection.query(query, [id_alumno], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener calificaciones' });
        }

        // Formato de respuesta estructurado por materia
        const calificacionesResponse = results.reduce((acc, row) => {
            acc[row.materia.toLowerCase()] = {
                primer_informe: row.primer_informe,
                segundo_informe: row.segundo_informe,
                nota_primer_cuatrimestre: row.nota_primer_cuatrimestre,
                primer_informe2: row.primer_informe2,
                segundo_informe2: row.segundo_informe2,
                nota_segundo_cuatrimestre: row.nota_segundo_cuatrimestre,
                calificacion_anual: row.calificacion_anual,
                calificacion_diciembre: row.calificacion_diciembre,
                calificacion_febrero_marzo: row.calificacion_febrero_marzo,
                calificacion_definitiva: row.calificacion_definitiva
            };
            return acc;
        }, {});

        if (Object.keys(calificacionesResponse).length > 0) {
            res.json({ notas: calificacionesResponse });
        } else {
            res.status(404).json({ message: "Notas no encontradas" });
        }
    });
});



app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Login.html')));

app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));

module.exports = connection;