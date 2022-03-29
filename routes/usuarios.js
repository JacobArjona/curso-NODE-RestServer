const { Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controller/usuarios');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();

// GET:
router.get('/', usuariosGet);


// PUT:
router.put('/:id',[
    check('id','No es un ID valido.').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuariosPut);


// POST:
router.post('/',[

check('nombre','El nombre es obligatorio').not().isEmpty(),
check('password','El password es obligatorio y debe ser de mas de 6 letras.').isLength({min: 6}),
check('correo','Formato incorrecto para el correo.').isEmail(),
check('correo').custom(existeEmail),
// check('rol','No es un rol valido.').isIn(['ADMIN_ROLE','USER_ROLE']),
check('rol').custom( esRolValido ),

validarCampos], usuariosPost);


// DELETE:
router.delete('/:id',[

    check('id','No es un ID valido.').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

],usuariosDelete);



module.exports = router;