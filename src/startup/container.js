const {createContainer, asClass, asValue, asFunction } = require('awilix');

//se importa config
const config = require("../config");
const app = require('.');

//Se importan los servicios
const {HomeService, UserService, IdeaService, CommentService } = require("../services");

//se importan los controllers
const {HomeController, UserController, IdeaController, CommentController} = require("../controllers");

//se importan las rutas
const { HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes } = require('../routes/index.routes');
const routes = require('../routes');

//se importan los modelos
const { User, Idea, Comment } = require('../models/');

//se impo|rtan los repositorios
const { UserRepository, IdeaRepository, CommentRepository } = require('../repositories');

//Se crea el contenedor
const container = createContainer();

//Se registran los servicios/contenedores
container.register({
    app: asClass(app).singleton(),
    router: asFunction(routes).singleton(),
    config: asValue(config)
}).register({
    //se registran los servicios
    HomeService: asClass(HomeService).singleton(),
    UserService: asClass(UserService).singleton(),
    IdeaService: asClass(IdeaService).singleton(),
    CommentService: asClass(CommentService).singleton()
}).register({
    //se registran los controllers
    homeController: asClass(HomeController.bind(HomeController)).singleton(),
    UserController: asClass(UserController.bind(UserController)).singleton(),
    IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
    CommentController: asClass(CommentController.bind(CommentController)).singleton()

}).register({
    //se registran las rutas
    homeRoutes: asFunction(HomeRoutes).singleton(),
    userRoutes: asFunction(UserRoutes).singleton(),
    ideaRoutes: asFunction(IdeaRoutes).singleton(),
    commentRoutes: asFunction(CommentRoutes).singleton()

}).register({
    User: asValue(User),
    Idea: asValue(Idea),
    Comment: asValue(Comment),
}).register({
    UserRepository: asClass(UserRepository).singleton(),
    CommentRepository: asClass(CommentRepository).singleton(),
    IdeaRepository: asClass(IdeaRepository).singleton()

});

module.exports = container;