const jwt = require('jsonwebtoken');
const  auth = (req,res,next) => {
    try {
        // const token1 = req.headers.authorization;
        // console.log("Hello");
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        if(!token) return res.status(500).json({message : "Invalid user"});
        const verifed = jwt.verify(token,process.env.SECRET);
        // console.log(verifed);
        req.name = verifed.name;
        req.owner = verifed.id;

        // console.log(token);
        next();
    } catch (error) {
        // console.error(error);
        res.status(500).json({message : "Invalid User"});
    }
}

module.exports = auth;