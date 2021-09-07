const mongoose = require("mongoose");

const Cls = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
},{
    timestamps : true
});

const Obj_registation = mongoose.model("Obj_registation",Cls);

module.exports = Obj_registation;