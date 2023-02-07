const { response, request } = require('express');

const usuarioGet = (req = request, res = response) => {

    const  {q, nombre = 'no name', apikey, page, limit} = req.query;

    res.json({
        msg: 'get API - controlador',
        q, nombre, apikey, page, limit
    });
}

const usuarioPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'Post API - controlador',
        nombre,
        edad
    });
}
const usuarioPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'Put API - controlador',
        id
    });
}
const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}
const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - controlador'
    });
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
}