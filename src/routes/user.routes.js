const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

module.exports = function({ UserController }){
    const router = Router();

    router.get('', [ authMiddleware ], UserController.getAll);
    router.get('/:userId', UserController.get);
    router.patch('/:userId', UserController.update);
    router.delete('/:userId', UserController.delete);


    return router;
};