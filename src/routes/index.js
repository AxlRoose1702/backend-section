const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const homeRoutes = require('../routes/home.routes');
const NotfoundMiddleware = require('../middlewares/not-found.middleware');
const ErrorMiddleware = require('../middlewares/error.middleware');
require('express-async-errors');

module.exports = function({homeRoutes}){
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