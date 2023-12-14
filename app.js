const express = require('express');
const app = express();
const path = require("path");
const routerProducto = require("./router/productoRouter");
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routerProducto);

app.listen(3000, () => console.log("Server corriendo en el puerto 3000"));
