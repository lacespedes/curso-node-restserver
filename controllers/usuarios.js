const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usuarioGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {status: true};
    // const users = await User.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    //     const total = await User.countDocuments(query);

        const [ total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

    res.json({
         total,
         users
    });
}

const usuarioPost = async (req, res = response) => {
    const {name, email, password, rol} = req.body;
    const user = new User( {name, email, password, rol} );
    
    // encriptar la contrase;a
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    // Guardar en DB
    await user.save();

    res.json({
        msg: 'Post API - controlador',
        user
    });
}
const usuarioPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, ...resto} = req.body

    //TODO: Validar contra BD
    if (password) {        
        // encriptar la contrase;a
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json(user);
}
const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}
const usuarioDelete = async (req, res = response) => {
    const { id } = req.params;
    
    // Borrado fisicamente
    //const  user = await User.findByIdAndDelete( id ) ;
    
    // Borrado logico
    const user = await User.findByIdAndUpdate(id, { status: false});
    
    res.json(user);
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
}