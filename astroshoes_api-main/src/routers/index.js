/* Esta es una tarea de desestructuración. Es una expresión de JavaScript que hace posible descomprimir
valores de matrices o propiedades de objetos en distintas variables. */
const {Router}= require('express');
const router = Router();

/* Importando las funciones desde el archivo index.controllers.js. */
const { getProdcuto }=require('../controllers/index.controlles');
const { getProdcutoById }=require('../controllers/index.controlles');
const { createProducto }=require('../controllers/index.controlles');
const { updateProducto }=require('../controllers/index.controlles');
const { deleteProducto }=require('../controllers/index.controlles');

/* El código anterior crea un objeto de enrutador y luego usa el objeto de enrutador para crear rutas
para la API. */
router.get('/',getProdcuto);
router.get('/:id', getProdcutoById);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);


/* Esta es una forma de exportar el objeto del enrutador para que pueda usarse en otros archivos. */
module.exports=router;