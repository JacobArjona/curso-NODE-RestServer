
const express = require('express');
const cors = require('cors');

class Server{

constructor(){

    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';

// MiddleWares 
    this.middlewares();

// (Funciones que van añadirle otra funcionalidad a mi WEB server)

// Rutas de mi aplicacion:
    this.routes();
}

middlewares(){
    // el [.use] es lo que caracteriza a un middleware

    // CORS:
    this.app.use(cors());

    // Lectura y Parseo del body (raw)
    this.app.use(express.json());

    // Directorio Publico:
    this.app.use( express.static('public'));
}

routes() {

  this.app.use(this.usuariosPath, require('../routes/usuarios'));
}


listen(){

    this.app.listen(this.port, () =>{
        console.log('Servidor corriendo en puerto: ', this.port);
    });
}

}

module.exports = Server;