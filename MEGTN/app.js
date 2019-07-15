'use strict';

// Inclusión de una librería con funciones de depuración de código
var debug = require('debug');

// Inclusión de la librería Express
var express = require('express');

// Inclusión de las librerías encargadas del análisis sintáctico de peticiones 
var bodyParser = require('body-parser');
var multer = require('multer'); // Codificación "multipart/form-data" (archivos enviados con formularios)

// Inclusión de la librería que permite trabajar con el sistema de archivos del servidor
var fs = require('fs');

// Inclusión de librería que permite establecer asertos que ayuden en ciertos procesos de evaluación
var assert = require('assert');

// Se determina aquí la ubicación y nomenclatura de los archivos que se suban al servidor
var nombreFotoPerfil = null
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads')
    },
    filename: function (req, file, cb) {
        nombreFotoPerfil = Date.now() + '_' + file.originalname;
        cb(null, nombreFotoPerfil);
    }
});
var upload = multer({ storage: storage });

// Configuración que permita el uso de la librería jQuery
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require('jquery')(window);

// Instancia a Express
var app = express();

// Instancia al driver de MongoDB para Node.js
var mongodb = require('mongodb');

// Enlazado de cierto procesador de peticiones con el "middleware"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Esta "instanciación" posibilitará la interacción con el servidor
var MongoClient = mongodb.MongoClient; 
// URL del clúster en el que tenemos almacenada nuestra base de datos (MongoDB Atlas)
var urlMongoDB = "<url_para_conectar_aplicacion>";

console.log(__dirname);

/*
 * Para cualquier petición que se haga, estableceremos un renombrado específico para determinadas rutas de archivos del servidor,
 * que ayude a dotar de mayor sencillez y claridad semántica a esas direcciones.
 */ 
app.use('/recursos', express.static(__dirname + '/public'));
app.use('/ng-recursos', express.static(__dirname + '//megtn-ng/dist/megtn-ng'));

// Asignación de título de página (nombre de la aplicación en nuestro caso)
app.set('title', 'MEGTN');

/*
 * Petición GET que dirige a la página de inicio.
 */
app.get('/', (req, res) => {
    console.log('Página de inicio: ');
    res.sendFile(__dirname + '/index.html');
}); 

/*
 * Petición GET (solapada con una opción del "router" de Angular) que responde a la elección
 * de esa opción de la página principal que permite consultar el registro de desaparecidos.
 */ 
app.get('/consultarRegistro', (req, res) => {
    console.log('Consulta de registro');
    res.sendFile(__dirname + '/index.html');
}); 

/*
 * Petición GET que nos devuelve un objeto de datos cuyo registro "codDesap" coincida
 * con el mismo que hemos pasado por parámetro.
 */
app.get('/buscarAlerta/:codDesap', (req, res) => {
    MongoClient.connect(
            urlMongoDB, 
            { useNewUrlParser: true },
            (error, db) => {
                if (error)
                    throw error;

                // Referencia a la colección de datos sobre personas desaparecidas
                var registroDesaparecidos = db.db("registro").collection("desaparecidos");

                // Búsqueda de una alerta concreta en esa colección (cod_desap ha de coincidir con el parámetro)
                registroDesaparecidos.find({ cod_desap: parseInt(req.params.codDesap) })
                    .toArray((error, result) => {
                        if (error)
                            throw error;

                        // console.log(result[0]["foto_perfil"]);

                        res.send(result);

                        db.close();
                    });
            }
        );
});

/*
 * Petición GET que efectúa la descarga de un archivo concreto almacenado en nuestra base de datos
 * (esta función se preparó para descargar fotos de perfil del desaparecido, pero dadas las restricciones
 * de escritura en el sistema de archivos de Google App Engine, se desactivó).
 *
 * app.get('/descargarImagenBD/:nombreArchivo', (req, res) => {
        MongoClient.connect(urlMongoDB, { useNewUrlParser: true }, (error, db) => {
            if (error)
                throw error;

            console.log(req.params.nombreArchivo);

            var bucket = new mongodb.GridFSBucket(db.db("registro"));
            bucket.openDownloadStreamByName(req.params.nombreArchivo).
                pipe(fs.createWriteStream(__dirname + '\\public\\uploads\\_' + req.params.nombreArchivo).
                    on('error', function (error) {
                        assert.ifError(error);
                        console.log(error);
                    }).
                    on('finish', function () {
                        res.send('/recursos/uploads/_' + req.params.nombreArchivo);
                        db.close();
                    }));
        });
    });
 */

/*
 * Petición GET que nos devuelve un objeto con toda la información de la colección de alertas de
 * personas desaparecidas almacenada en el registro.
 */
app.get('/obtenerRegistro', (req, res) => {
    MongoClient.connect(urlMongoDB, { useNewUrlParser: true }, (error, db) => {
        if (error)
            throw error;

        var registroDesaparecidos = db.db("registro").collection("desaparecidos");
        registroDesaparecidos.find({})
            .toArray((error, result) => {
                if (error)
                    throw error;
                res.send(result);
                db.close();
            });
    });
});

/*
 * Petición GET (solapada con una opción del "router" de Angular) que responde a la elección
 * de esa opción de la página principal que muestra el formulario de aportación de nuevas pistas.
 */
app.get('/aportarNuevasPistas', (req, res) => {
    console.log("Abriendo formulario...");
    res.sendFile(__dirname + '/index.html');
});

/*
 * Petición GET (solapada con una opción del "router" de Angular) que responde a la elección
 * de esa opción de la página principal que muestra el formulario de creación de alertas de desaparición.
 */
app.get('/crearNuevaAlerta', (req, res) => {
    console.log('Creación de nueva alerta');
    res.sendFile(__dirname + '/index.html');
});

/*
 * Petición POST que actualiza el campo de pistas de una determinada alerta
 * con la información remitida a través del formulario de remisión de pistas.
 * 
 * Las pistas se almacenan en un array en el que se añadirá un nuevo registro.
 */
app.post('/registrarPistas', (req, res) => {
    if (!req.body)
        return res.sendStatus(400);

    MongoClient.connect(urlMongoDB, { useNewUrlParser: true }, (error, db) => {
        if (error)
            throw error;

        var registroDesaparecidos = db.db("registro").collection("desaparecidos");
        var valoresNuevaPista = [
            Date.now(),
            req.body.sample5
        ];

        console.log(req.body.alertaElegida);

        registroDesaparecidos.updateOne(
            { cod_desap: parseInt(req.body.alertaElegida) },
            { $push: { pistas: { fecha: new Date(valoresNuevaPista[0]), detalle: valoresNuevaPista[1]} } },
            (error, result) => {
                if(error)
                    throw error;
                
                res.sendFile(__dirname + '/index.html');
                db.close();
            });
        });
});

/*
 * Esta función hace una petición AJAX de tipo GET al servidor de Google Maps
 * para obtener las coordenadas geográficas (latitud y longitud) correspondientes
 * con una localización determinada. Precisamente, se obtendrá un objeto de datos JSON.
 */
var obtenerGeodatos = (localizacion) => {
    var geodatos = null;
    $.ajax({
        type: "GET",
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + localizacion + '&key=AIzaSyDuNe5eYehxSxOgjr2_YGZpmSnb2YjzzUc',
        success: (data) => {
            geodatos = data;
        },
        dataType: 'json',
        async: false
    });
    return geodatos;
};

/*
 * Petición POST que registra en la colección "desaparecidos" de la base de datos una información con la que
 * tendríamos registrada una nueva alerta.
 */
app.post('/registrarNuevaAlerta', (req, res) => {
    console.log(req.body);
    // console.log(req.file);

    if (!req.body)
        return res.sendStatus(400);

    MongoClient.connect(urlMongoDB, { useNewUrlParser: true }, (error, db) => {
        if (error)
            throw error;

        var registroDesaparecidos = db.db("registro").collection("desaparecidos");
        var nuevaAlerta = req.body;
        console.log(nuevaAlerta);
        // var archivoAdjunto = req.file;
        var fechaDesaparicion = Date.now();

        // Almacenamiento en variable de las coordenadas geográficas de una ubicación concreta
        var geodatos = obtenerGeodatos(encodeURI(nuevaAlerta.lugar_desaparicion)).results;
        var geolocalizacion = geodatos[0].geometry.location;
        
        // Inserción de un nuevo documento (alerta) a la colección "desaparecidos"
        registroDesaparecidos.insertOne({
            cod_desap: parseInt(Date.now() / nuevaAlerta.nombre.length, 10),
            nombre: nuevaAlerta.nombre,
            apellido1: nuevaAlerta.apellido1,
            apellido2: nuevaAlerta.apellido2,
            edad: nuevaAlerta.edad,
            foto_perfil: "sinfoto",
            lugar_desaparicion: [
                geolocalizacion.lat,
                geolocalizacion.lng
            ],
            fecha_desaparicion: fechaDesaparicion,
            descripcion: nuevaAlerta.descripcion,
            pistas: []
        },
        (error, result) => {
           if (error)
             throw error;

           console.log('Alerta creada con éxito');

          res.sendFile(__dirname + '/index.html');
          db.close();
        });
    });
}); 

/*
 * Petición POST que registraría en la base de datos una nueva alerta con el archivo (imagen) a remitir por medio del formulario
 * de creación de nuevas alertas. Eso sí, está desactivada por los mismos motivos que GET /descargarImagenBD.
 * 
 * app.post('/registrarNuevaAlerta', upload.single('foto_desaparecido'), urlencodedParser, (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    if (!req.body)
        return res.sendStatus(400);

    MongoClient.connect(urlMongoDB, { useNewUrlParser: true }, (error, db) => {
        if (error)
            throw error;

        var registroDesaparecidos = db.db("registro").collection("desaparecidos");
        var nuevaAlerta = req.body;
        console.log(nuevaAlerta);
        var archivoAdjunto = req.file;
        var fechaDesaparicion = Date.now();
        var geodatos = obtenerGeodatos(encodeURI(nuevaAlerta.lugar_desaparicion)).results;
        var geolocalizacion = geodatos[0].geometry.location;

        var bucket = new mongodb.GridFSBucket(db.db("registro"));
        console.log(archivoAdjunto);

        fs.createReadStream(__dirname + '\\uploads\\' + nombreFotoPerfil).
            pipe(bucket.openUploadStream(nombreFotoPerfil)).
            on('error', (error) => {
                assert.ifError(error);
            }).
            on('finish', () => {
                console.log('¡Archivo subido!');
                registroDesaparecidos.insertOne({
                    cod_desap: parseInt(Date.now() / nuevaAlerta.nombre.length, 10),
                    nombre: nuevaAlerta.nombre,
                    apellido1: nuevaAlerta.apellido1,
                    apellido2: nuevaAlerta.apellido2,
                    edad: nuevaAlerta.edad,
                    foto_perfil: nombreFotoPerfil,
                    lugar_desaparicion: [
                        geolocalizacion.lat,
                        geolocalizacion.lng
                    ],
                    fecha_desaparicion: fechaDesaparicion,
                    descripcion: nuevaAlerta.descripcion,
                    pistas: []
                },
                (error, result) => {
                    if (error)
                        throw error;

                    console.log('Alerta creada con éxito');

                    res.sendFile(__dirname + '/index.html');
                    db.close();
                });
            });
    });
}); 
*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
