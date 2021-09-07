const express = require("express");
const app = express();
require("dotenv").config();
require("./db/connect");
const path = require("path");

const PORT = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(express.static(path.join(__dirname, "./upload")));

app.use(require("./routers/method"));

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"client","build","index.html"));
    })    
}

app.listen(PORT,() => {
    console.log(`Listening... ${PORT}`);
})