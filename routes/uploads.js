const { Router } =  require('express');
const { check } = require('express-validator');

const { validarCampos, validarSiArchivo } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarSiArchivo, cargarArchivo);    

router.put('/:coleccion/:id',[
         validarSiArchivo,
         check('id', 'El id debe ser de mongo').isMongoId(),
         check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
         validarCampos
//    ], actualizarImagen);    
], actualizarImagenCloudinary);    
    
router.get('/:coleccion/:id',[
    //validarSiArchivo,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;