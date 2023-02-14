const { Router } =  require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRole
} = require('../middlewares')

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuarioGet,
        usuarioPut,
        usuarioPost,
        usuarioDelete,
        usuarioPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuarioGet);          

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId().bail(),
    check('id').custom( existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuarioPut );    

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('email').custom(emailExiste),
    //check('email', 'El correo no es valido').isEmail(),
    //check('rol', 'No es un rol permitio').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //check('rol').custom( (rol) => esRoleValido(rol) ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuarioPost);    

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID valido').isMongoId().bail(),
    check('id').custom( existeUsuarioPorId),
    validarCampos
], usuarioDelete);    

router.patch('/', usuarioPatch);

module.exports = router;