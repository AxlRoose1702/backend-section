const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
//const {HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes} = require('../routes/index')
const compression = require('compression');
require('express-async-errors');

module.exports = function({
    homeRoutes, 
    userRoutes, 
    ideaRoutes, 
    commentRoutes
})
    {
    const router = express.Router();
    const apiRoutes = express.Router();
    const { NotfoundMiddleware, ErrorMiddleware } = require('../middlewares');

    apiRoutes
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(compression())

    apiRoutes.use("/home", homeRoutes);
    apiRoutes.use("/user", userRoutes);
    apiRoutes.use("/idea", ideaRoutes);
    apiRoutes.use("/comment", commentRoutes);

    router.use('/v1/api', apiRoutes);

    //se agrega los middleware para mostrar paginas de errores
    router.use(NotfoundMiddleware);
    router.use(ErrorMiddleware);

    return router;
}