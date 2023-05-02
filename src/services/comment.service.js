const BaseService = require('../services/base.service');
let _commentRepository = null,
_ideaRepository = null;

class CommentService extends BaseService{
    constructor({CommentRepository, IdeaRepository}){
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    async getIdeaComments(ideaId){
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

        const { comments } = idea;
        return comments;
    }

    async createComment(comment,ideaId){
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

        const createComment = await _commentRepository.create(comment);
        idea.comments.push(createComment);

        return await _ideaRepository.update(ideaId, {comments: idea.comments});
    }
}

module.exports = CommentService;