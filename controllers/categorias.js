const { response } = require("express");
const { Categoria } = require('../models');

//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
                .populate('usuario', 'name')
                .skip(Number(desde))
                .limit(Number(limite))
    ]);

res.json({
     total,
     categorias
});
 }

//obtenerCategoria - populate {}
const obtenerCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        
        const categoria = await Categoria.findById(id)
            .populate({
                path: 'usuario',
                select: 'name email'
            })
            .exec();
    
        res.json(categoria);        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `No se pudo obtener los datos de la categoria con id ${id}`
        });
    }

 }

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    await categoria.save();
    res.status(201).json(categoria);
}

//actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate( id, data, {new : true} );
    
    res.json(categoria);
 }

//borrarCategoria - estado:false
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false}, {new: true});
    
    res.json(categoria);
 }

module.exports = {
    obtenerCategoria,
    obtenerCategorias,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}