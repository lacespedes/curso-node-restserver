const express = require('express');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'
        // Middleware
        this.middlewares();
        // Rutas de la aplicacione
        this.routes();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        // Lectura y parseo del bod
        this.app.use( express.json() );
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use(this.usuarioPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
module.exports = Server;