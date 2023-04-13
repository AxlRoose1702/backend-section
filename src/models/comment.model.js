const mogoose = require('mongoose');
const { Schema } = mogoose;

const CommentSchema = new Schema({
    comment: {type: String, required:true},
    author: {
        type: Schema.Types.ObjectId, 
        ref:'user',
        required:true,
        autopopulate:true
    },
    
});

module.exports = mongoose.model('comment', CommentSchema);