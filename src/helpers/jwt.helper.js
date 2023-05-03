const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports.generateToken = function(user){
    //sirve para generar un token que dure 1h
    return sign({user}, JWT_SECRET, { expiresIn: "1h"});
}