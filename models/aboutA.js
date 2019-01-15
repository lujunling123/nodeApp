const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    selectA:{
        type:String,
        required:true
    },
    text: {
        type:String
    },
    data: {
        type:Date,
        default:Date.now()
    }
})

mongoose.model('about', AboutSchema)