const { Router } = require('express');

module.exports = function({ homeController }){
    const router = Router();

    router.get('/', homeController.index);
    return router;
};