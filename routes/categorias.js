const { Router } =  require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const { existeCategoriaPorId, existeNombreCategoria } = require('../helpers/db-validators');

const { obtenerCategoria,
        obtenerCategorias,
        actualizarCategoria,
        crearCategoria,
        borrarCategoria } = require('../controllers/categorias');

const router = Router();

//obtener todas la categorias - publica
router.get('/',obtenerCategorias);

 // Obtener una categoria por id - publico
 router.get('/:id', [
   check('id', 'No es un id de Mongo Valido').isMongoId(),
   check('id').custom( existeCategoriaPorId ),
   validarCampos
 ], obtenerCategoria );    

 // Crear categoria - privado cualquie persona con un token invalido
 router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('nombre').custom(existeNombreCategoria),
   validarCampos
], crearCategoria );

 // Actualiza - privado
 router.put('/:id', [
   validarJWT,
   check('id').custom( existeCategoriaPorId ),
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('nombre').custom(existeNombreCategoria),
   validarCampos
 ], actualizarCategoria );
 
 //Borrar una  categoria - Admin, borrado logico
 router.delete('/:id', [
   validarJWT,
   esAdminRol,
   check('id', 'No es un id de Mongo Valido').isMongoId(),
   check('id').custom( existeCategoriaPorId ),
   validarCampos
], borrarCategoria);

module.exports = router; 