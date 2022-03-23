const { response, request } = require('express');


    const usuariosGet = (req = request, res = response) => {
       
       const query = req.query;
        res.json({
            msg: 'get API -Desde Controller',
            query
        });
    }


     const usuariosPut = (req, res) => {
         
        const  id  = req.params.id;
        
        res.json({
    
             msg: 'put API -Desde Controller',
             id
         });
     }


     const usuariosPost =(req, res) => {
        const {nombre, edad} = req.body;

         res.json({
             msg: 'post API -Desde Controller',
             nombre,
             edad  
         });
     }


     const usuariosDelete =  (req, res) => {
         res.json({
    
             msg: 'delete API -Desde Controller'
         });
     }


module.exports = {

    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}