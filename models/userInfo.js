const mongooes = require('mongoose');

const Schema = mongooes.Schema;

const userSchema = new Schema({
    phone:{
        type:String,
        required: true
    },
    pass: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now()
    }
})

mongooes.model('user',userSchema)
