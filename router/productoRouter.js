const router = require("express").Router();
const productoController = require("../controller/productosController");

console.log("productoController:", productoController); // Agregado para verificar la importación

router.get('/', productoController.list);
router.get('/create', productoController.create);
router.post('/create', productoController.stock); // Asegúrate de que 'stock' esté definido en productosController
router.get('/detalle/:id', productoController.detalle);
router.get('/edit/:id', productoController.editForm);
router.post('/edit/:id', productoController.edit);
router.get('/delete/:id', productoController.delete);

module.exports = router;
