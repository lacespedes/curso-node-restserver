const { Categoria, Role, User, Producto } = require('../models');

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
    }
}

const existeUsuarioPorId = async ( id ) => {
    // verificar si el usuario existe
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ( ${id} ) del usuario no existe. `); 
    }
}

const existeCategoriaPorId = async ( id ) => {
    // verificar si la categoria existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ( ${id} ) de la categoria no existe. `); 
    }
}

const existeNombreCategoria = async ( nombre ) => {
    const nombreMay = nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre : nombreMay });
    if ( categoriaDB ) {        
        throw new Error(`La categoria ${ categoriaDB.nombre }, ya existe`);
    }
}

const existeIdProducto = async ( id ) => {
    // verificar si el producto existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id ( ${id} ) del producto no existe. `); 
    }
}

const existeNombreProducto = async ( nombre ) => {
    const nombreMay = nombre.toUpperCase();

    let query = { 
        nombre : nombreMay,
    };

    // if (id) {
    //     query.id = {id: {$ne : id} }
    // }
    // console.log(query);

    const productoDB = await Producto.findOne(query);
    console.log(productoDB);
    if ( productoDB ) {        
        throw new Error(`La categoria ${ productoDB.nombre }, ya existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeNombreCategoria,
    existeIdProducto,
    existeNombreProducto
}