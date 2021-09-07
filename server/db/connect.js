const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL,{
    dbName : "gallerydb",
    useCreateIndex : true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => {
    console.log("Mongo connected....");
}).catch((err) => {
    console.log("error in mongo...");
})