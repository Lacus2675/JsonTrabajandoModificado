const fs = require('fs');
const path = require('path');
const productosFilePath = path.join(__dirname, '../data/productos.json');
let productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const productosController = {

    list: (req, res) => {
        res.render('home', { productos });
    },

    create: (req, res) => {
        res.render('creacionProd');
    },

    stock: (req, res) => {
        const { marca, modelo, precio } = req.body;
        const newProduct = {
            id: productos.length + 1,
            marca,
            modelo,
            precio,
        };
        productos.push(newProduct);
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, ' '));
        res.redirect('/');
    },
    
    detalle: (req, res) => {
        const productId = parseInt(req.params.id);
        const producto = productos.find((p) => p.id === productId);

        if (producto) {
            res.render('detalle', { producto });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },
    
    editForm: (req, res) => {
        const productId = parseInt(req.params.id);
        const producto = productos.find((p) => p.id === productId);

        if (producto) {
            res.render('editarProd', { producto });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },
    
    edit: (req, res) => {
        const productId = parseInt(req.params.id);
        const { marca, modelo, precio } = req.body;

        // Buscar y actualizar el producto
        const productoIndex = productos.findIndex((p) => p.id === productId);

        if (productoIndex !== -1) {
            productos[productoIndex] = {
                id: productId,
                marca,
                modelo,
                precio,
            };

            fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, ' '));
            res.redirect(`/detalle/${productId}`);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },

    delete: (req, res) => {
        const productId = parseInt(req.params.id);

        // Filtrar productos, excluyendo el producto a eliminar
        const updatedProductos = productos.filter((p) => p.id !== productId);

        if (updatedProductos.length < productos.length) {
            fs.writeFileSync(productosFilePath, JSON.stringify(updatedProductos, null, ' '));
            // Actualizamos la lista de productos después de eliminar
            productos = updatedProductos;

            res.redirect('/');
        } else {
            res.status(404).send('Producto no encontrado');
        }
    },

        search: (req, res) => {
            const searchTerm = req.query.q; // Obtener el término de búsqueda desde la consulta
            const filteredProductos = productos.filter(producto =>
                producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                producto.modelo.toLowerCase().includes(searchTerm.toLowerCase())
            );
    
            res.render('home', { productos: filteredProductos, searchTerm });
        }
        
    
    };


module.exports = productosController;
