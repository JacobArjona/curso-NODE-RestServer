const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

    const usuariosGet =async (req = request, res = response) => {
       
    //    const query = req.query;

        const {limite = 5, desde=0} = req.query;
        const query= {estado: true};   

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))

        ]);

        res.json({
           total,
           usuarios
        });
    }


     const usuariosPut = async(req, res) => {
         
        const  id  = req.params.id;

        // Extraemos TODO lo que NO necesito que se grabe:
        const {_id,password, google,correo, ...resto} = req.body;

        if (password) {
            
            // Encriptar Contraseña:
        const salt= bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto,{new:true});
        
        res.json({
    
            usuario
         });
     }


     const usuariosPost =async (req, res) => {

        const {nombre, correo, password, rol} = req.body;
        
        const usuario = new Usuario({nombre, correo, password, rol});
        
        // Encriptar Contraseña:
        const salt= bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);


        // Guardamos Usuario:
        await usuario.save();

         res.json({
             msg: 'post API -Desde Controller',
             usuario 
         });
     }


     const usuariosDelete =  async(req, res) => {
        
        const {id} = req.params;
        
        // Borrar fisicamente
        // const usuario = await Usuario.findByIdAndDelete(id);
        
        const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});   

        res.json({
             usuario  
         });
     }


module.exports = {

    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}