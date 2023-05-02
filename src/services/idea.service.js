const BaseService = require('../services/base.service');
let _ideaRepository = null;

class IdeaService extends BaseService{
    constructor({IdeaRepository}){
        super(_ideaRepository);
        _ideaRepository = _ideaRepository;
    }

    async getUserIdeas(author){
        if(!author){
            const error = new Error();
            error.status = 400;
            error.message = "userid debe ser enviado";
            throw error;
        }

        return await _ideaRepository.getUserIdeas(author);
    }

    async upvoteIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaId debe ser enviado";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);

        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "ideaId no existe";
            throw error;
        }

        idea.upvotes.push(true);
        return await _ideaRepository.update(ideaId, {upvotes:idea.upvotes});
    }

    async downvoteIdea(ideaId){
        if(!ideaId){
            const error = new Error();
            error.status = 400;
            error.message = "ideaId debe ser enviado";
            throw error;
        }

        const idea = await _ideaRepository.get(ideaId);

        if(!idea){
            const error = new Error();
            error.status = 404;
            error.message = "ideaId no existe";
            throw error;
        }

        idea.downvotes.push(true);
        return await _ideaRepository.update(ideaId, {upvotes:idea.downvotes});
    }

}
module.exports = IdeaService;