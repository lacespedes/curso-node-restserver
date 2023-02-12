const {response, json} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - correo'
            });
        }

        // si el usuario esta activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - estado: false'
            })
        }
        // verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - password'
            })
        }
        // generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: ' Hable con el administrador'
        })
    }

}

const googleSingIn = async(req, res = response) => {
    const { id_token } = req.body;

    try {
        const {email, name, img} = await googleVerify(id_token);

        let user = await User.findOne({email});
        if (!user){
            // Tengo que crearlo
            const data = {
                name,
                email,
                password: ' ',
                img,
                google: true,
                rol: 'USER_ROLE'
            };

            user = new User(data);
            await user.save();
            
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Hable con el administrador - usuariob loqueado'
            });            
        }

        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


}

module.exports = {
    login,
    googleSingIn
}