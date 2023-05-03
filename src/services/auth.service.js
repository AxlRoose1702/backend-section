const {JwtHelper} = require('../helpers');
let _userService = null;

class AuthService{
    constructor({UserService}){
        _userService = UserService
    }

    async singUp(user){
        const {username} = user;
        const userExist = await _userService.getUserByUsername(username);

        if(userExist){
            const error = new Error();
            error.status = 401;
            error.message = "ya existe";
            throw error;

        }
        return await _userService.create(user);
    }

    async singIn(user){
        const {username, password} = user;
        const userExist = await _userService.getUserByUsername(username);

        if(!userExist){
            const error = new Error();
            error.status = 404;
            error.message = "no existe";
            throw error;

        }
        const validPassword = userExist.comparePasswords(password);
        if(!validPassword){
            const error = new Error();
            error.status = 400;
            error.message = "contraseña invalida";
            throw error;
        }   
        
        const userToEncode = {
            username: userExist.username,
            id: userExist._id
        };
        const token = JwtHelper.generateToken(userToEncode);
        return { token, user:userExist };
    }
}

module.exports = AuthService;