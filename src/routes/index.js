const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const homeRoutes = require('./home.routes');
const notFoundMiddleware = require('../middlewares/not-found.middleware');
const errorMiddleware = require('../middlewares/error.middleware');
require('express-async-errors');

module.exports = function({homerouters}){
    const router = express.Router();
    const apiRoutes = express.Router();
    const { NotfoundMiddleware, ErrorMiddleware } = require('../middlewares');

    apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression())

    apiRoutes.use("/home", homeRoutes);

    router.use('/v1/api', apiRoutes);

    //se agrega los middleware para mostrar paginas de errores
    router.use(NotfoundMiddleware);
    router.use(ErrorMiddleware);

    return router;
}