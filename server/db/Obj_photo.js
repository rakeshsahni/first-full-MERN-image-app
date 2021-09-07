const mongoose = require("mongoose");

const Cls = new mongoose.Schema({
    photo : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true 
    },
    title : {
        type : String,
        required : true
    },
    cloudinary_id : {
        type : String,
        required : true,
    },
    likeCount : {
        type : [],
        default : [],
    },
    description : {
        type : String,
        required : true
    },
    owner : {
        type : String,
        required : true,
    },
    jsonComment : {
        type : [{}],
        default : [{
            commentId: "1",
            commentName: 'Rakesh Kumar Sahni',
            comment: 'Awesome Image 👍 🥰 😏'
        }],
    }
},{
    timestamps : true
})

const Obj_photo = mongoose.model("Obj_photo",Cls);

module.exports = Obj_photo;