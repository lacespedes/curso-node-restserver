const { Router } =  require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { existeIdProducto, existeNombreProducto, existeCategoriaPorId } = require('../helpers/db-validators');

const { obtenerProductos,
        obtenerProducto,
        crearProducto,
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');

const router = Router();

//obtener todas la categorias - publica
router.get('/',obtenerProductos);

 // Obtener una categoria por id - publico
 router.get('/:id', [
   check('id', 'No es un id de Mongo Valido').isMongoId(),
   check('id').custom( existeIdProducto ),
   validarCampos
 ], obtenerProducto );    

 // Crear categoria - privado cualquie persona con un token invalido
 router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('nombre').custom(existeNombreProducto),
   check('categoria', 'No es un id de categoria Mongo Valido').isMongoId(),
   check('categoria', 'La categoria es obligatoria').not().isEmpty(),
   check('categoria').custom(existeCategoriaPorId),
   validarCampos
], crearProducto );

 // Actualiza - privado
 router.put('/:id', [
   validarJWT,
   check('id', 'No es un id de Mongo Valido').isMongoId(),
   check('id').custom( existeIdProducto ),
   check('nombre').if((req => req.body.categoria)).custom(existeNombreProducto),
   check('categoria', 'No es un id de categoria Mongo Valido').isMongoId(),
   check('categoria').custom(existeCategoriaPorId),
   validarCampos
 ], actualizarProducto );
 
 //Borrar una  categoria - Admin, borrado logico
 router.delete('/:id', [
   validarJWT,
   esAdminRol,
   check('id', 'No es un id de Mongo Valido').isMongoId(),
   check('id').custom( existeIdProducto ),
   validarCampos
], borrarProducto);

module.exports = router; 