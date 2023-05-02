const { Router } = require('express');

module.exports = function({ IdeaController }){
    const router = Router();

    router.get('', IdeaController.get);
    router.get('/:ideaId', IdeaController.get);    
    router.get('/:ideaId/all', IdeaController.getUserIdeas);
    router.post('', IdeaController.create)    
    router.patch('/:ideaId', IdeaController.update);
    router.delete('/:ideaId', IdeaController.delete);
    router.post('/:ideaId', IdeaController.upvoteIdea)    
    router.post('/:ideaId', IdeaController.upvoteIdea)

    return router;
};