class BaseService {
    constructor(repository){
        this.repository = repository;
    }

    async get(id){
        if(!id){
            const error = new Error();
            error.status = 400;
            error.message = "enviar id";
            throw error;
        }

        const currentEntity = await this.repository.get(id);

        if(!currentEntity){
            const error = new Error();
            error.status = 400;
            error.message = "No se encuentra entidad";
            throw error;
        }

        return currentEntity;
    }

    async getAll(){
        return await this.repository.getAll();
    }

    async create(){
        return await this.repository.create(entity);
    }

    async update(id){
        if(!id){
            const error = new Error();
            error.status = 400;
            error.message = "enviar id";
            throw error;
        }
        return await this.repository.update(id,entity);
    }

    async delete(id){
        if(!id){
            const error = new Error();
            error.status = 400;
            error.message = "enviar id";
            throw error;
        }
        return await this.repository.delete(id);
    }
}

module.exports = BaseService;