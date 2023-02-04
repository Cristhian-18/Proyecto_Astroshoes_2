const express = require('express');
const cors = require('cors');
const app = express();
const indexControllers = require('./controllers/index.controlles');

// Politcas CORS
app.use(cors());


//añadir nombre del puerto en este caso es el Fly ----- o el localthost
require('dotenv').config();

const port = process.env.PORT;

//middlewars
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cookieParser = require('cookie-parser');
// app.use(cookieParser());
// app.use(indexControllers.verifyToken);


//cors
app.use(cors({
    origin: true,
    methods: ['GET', 'POST']
}));


//Login and register
app.route('/register')
    .post(indexControllers.setRegister);

app.route('/login')
    .post(indexControllers.setLogin);


// Favoritos
app.route('/favoritos')
    .post(indexControllers.createFavorito);

//pp.route('/listarFavoritos/:email').get(indexControllers.listarFavoritos);
app.use('/listarFavoritos', require('./routers/index'));
// app.use(cookieParser());
// app.use(indexControllers.verifyToken);


//router
app.use('/producto', require('./routers/index'));
app.use('/marca', require('./routers/indexM'));
app.use('/categoria', require('./routers/indexC'));
app.use('/usuario', require('./routers/indexU'));
app.use('/favoritos', require('./routers/indexF'));
app.use('/administracion', require('./routers/indexA'));

app.listen(port);
console.log('INICIO DE SERVER EXITOSO', port, '!!');