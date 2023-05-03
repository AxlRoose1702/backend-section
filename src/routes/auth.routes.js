const { Router } = require('express');

module.exports = function({ AuthController }){
    const router = Router();

    router.get('/signUp', AuthController.signUp);
    router.get('/signIn', AuthController.signIn);
    return router;
};