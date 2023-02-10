const { Schema, model} = require('mongoose');

const Userschema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

Userschema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
    //return {...user, uid: _id};
}

module.exports = model( 'User', Userschema);