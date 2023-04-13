const {createContainer, asClass, asValue, asFunction } = require('awilix');

//se importa config
const config = require("../config");
const app = require('.');

//Se importan los servicios
const {HomeService} = require("../services");

//se importan los controllers
const {homeController, HomeController} = require("../controllers");

//se importan las rutas
const { homeRoutes } = require('../routes/index.routes');
const routes = require('../routes');


//Se crea el contenedor
const container = createContainer();

//Se registran los servicios/contenedores
container.register({
    app: asClass(app).singleton(),
    router: asFunction(routes).singleton(),
    config: asValue(config)
}).register({
    //se registran los servicios
    HomeService: asClass(HomeService).singleton()
}).register({
    //se registran los controllers
    homeController: asClass(homeController.bind(HomeController)).singleton()
}).register({
    //se registran las rutas
    homeRoutes: asFunction(homeRoutes).singleton()
});

module.exports = container;