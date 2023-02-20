/* Esta es una tarea de desestructuración. Es una expresión de JavaScript que hace posible descomprimir
valores de matrices o propiedades de objetos en distintas variables. */
const {Router}= require('express');
const router = Router();

/* Importando las funciones desde el archivo index.controllers.js. */
const { getAdminstracion }=require('../controllers/index.controlles');
const { getAdminstracionById }=require('../controllers/index.controlles');
const { createAdminstracion }=require('../controllers/index.controlles');
const { updateAdministracion }=require('../controllers/index.controlles');
const { deleteAdministracion }=require('../controllers/index.controlles');

/* El código anterior crea un objeto de enrutador y luego usa el objeto de enrutador para crear rutas
para la API. */
router.get('/',getAdminstracion);
router.get('/:id', getAdminstracionById);
router.post('/', createAdminstracion);
router.put('/:id', updateAdministracion)
router.delete('/:id', deleteAdministracion);


/* Esta es una sintaxis de Node.js que hace que el objeto del enrutador en el archivo sea accesible
para otros archivos. */
module.exports=router;