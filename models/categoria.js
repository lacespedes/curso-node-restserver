const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function() {
    const {__v, _id, ...categoria} = this.toObject();
    categoria.uid = _id;
    return categoria;
    //return {...user, uid: _id};
}

module.exports = model('Categoria', CategoriaSchema);