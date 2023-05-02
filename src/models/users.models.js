const mongose = require('mongoose');
const { Schema } = mongose;
const { compareSync, hashSync, genSaltSync} = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required:true},
    username: {type: String, required:true},
    password: {type: String, required:true}
});

UserSchema.methods.toJson = function(){
    //para eliminar el campo contraseña
    let user = this.toObject();
    delete user.password;
    return user;
}

//para comparar las contraseñas enviadas
UserSchema.methods.comparePasswords = function(password){
    return compareSync(password, this.password);
}

UserSchema.pre('save', async function( next){
    const user = this;

    if(!user.isModified("password")){
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
});

module.exports = mongose.model('user', UserSchema);