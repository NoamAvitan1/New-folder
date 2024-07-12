const { Schema, default: mongoose } = require("mongoose");

const testSchema = new Schema({
    title:{
        type:String,
        required:true
    }
})

const Test = mongoose.model('Test',testSchema);

module.exports=Test;