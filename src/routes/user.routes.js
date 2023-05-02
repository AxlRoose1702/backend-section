const { Router } = require('express');

module.exports = function({ UserController }){
    const router = Router();

    router.get('/:userId', UserController.get);
    router.get('', UserController.get);
    router.patch('/:userId', UserController.update);
    router.delete('/:userId', UserController.delete);


    return router;
};