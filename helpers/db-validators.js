const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async( rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`el rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async(email) => {
    // Verificar si el correo existe
    const existeEmail = await User.findOne({email});
    if ( existeEmail ) {
        throw new Error(`El correo (${email}) ya esta registrado.`)
        // return res.status(400).json({
        //     msg: 'El correo ya esta registrado.'
        // });
    }
}

const existeUsuarioPorId = async ( id ) => {
    // verificar si el usuario existe
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ( ${id} ) no existe. `); 
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}