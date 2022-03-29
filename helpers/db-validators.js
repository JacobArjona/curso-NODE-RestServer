const Role = require('../models/role.js');
const Usuario = require('../models/usuario');


// Verificar si el ROL es valido

const esRolValido = async(rol = '') =>{

    const existeRol = await Role.findOne({rol});
    
    if(!existeRol){
        throw new Error(`El rol: ${ rol } no esta registrado en la Base de Datos.`);
    }
}


// Verificar si el correo YA existe:
const existeEmail = async( correo = '') =>{
    const mail = await Usuario.findOne({correo});      
    if(mail){
        throw new Error(`El correo: ${correo} ya ha sido registrado.`)
        }
    }



// Verificar si el ID YA existe:
const existeUsuarioPorId = async( id = '') =>{
    const existeUsuario = await Usuario.findById(id);      
    if(!existeUsuario){
        throw new Error(`El Id: ${id} No existe.`)
        }
    }

module.exports = {
    esRolValido, existeEmail, existeUsuarioPorId
}