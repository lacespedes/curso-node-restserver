const { response } = require("express");
const { Producto } = require('../models');

//obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
                .populate('usuario', 'name')
                .populate('categoria','nombre')
                .skip(Number(desde))
                .limit(Number(limite))
    ]);

res.json({
     total,
     productos
});
 }

//obtenerProducto - populate {}
const obtenerProducto = async (req, res) => {
    const { id } = req.params;
    try {
        
        const producto = await Producto.findById(id)
            .populate({
                path: 'usuario',
                select: 'name email'
            })
            .populate('categoria','nombre')
            .exec();
    
        res.json(producto);        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `No se pudo obtener los datos de la Producto con id ${id}`
        });
    }

 }

const crearProducto = async (req, res = response) => {
    
    const { estado, usuario, disponible, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    
    const producto = new Producto( data );
    await producto.save();
    res.status(201).json(producto);
}

//actualizarProducto
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();    
    }
    
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, {new : true} );
    
    res.json(producto);
 }

//borrarProducto - estado:false
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false}, {new: true});
    
    res.json(producto);
 }

module.exports = {
    obtenerProducto,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
}