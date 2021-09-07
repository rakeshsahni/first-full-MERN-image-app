const router = require("express").Router();
const path = require("path");
const authMiddleware = require("./../middleware/authMiddleware");

const multer = require("multer");

const {
  postPhotos,
  patchPhotosUpdate,
  pathPhotosLike,
  deletePhotos,
  getPhotos,
  writeComment,
  deleteComment,
  getcommentData,
} = require("./postMethodFun");
const {
  postSignup,
  login,
  verifyMail,
  forgotPassword,
  resetPassword,
  logout,
  postRefreshToken,
  changeName,
} = require("./authMethodFun");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "./../upload/images"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

const upload = multer({ 
  storage: multer.diskStorage({}) ,
  fileFilter : (req,file,cb) => {
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" ||file.mimetype == "image/jpeg"){
      cb(null,true);
    }else{
      cb(null,false);
      // return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits : {fileSize : 5*1024*1024},// max size of images is 5 MB 
});

router.post("/photos",authMiddleware,upload.single("multerimg"), postPhotos);

router.get("/photos",getPhotos);

router.delete("/photos/delete/:id",authMiddleware, deletePhotos);

router.patch(
  "/photos/update/:id",
  authMiddleware,
  upload.single("multerimg"),
  patchPhotosUpdate
);

router.patch("/photos/like/:id",authMiddleware ,pathPhotosLike);

router.get("/commentdata/:id",authMiddleware,getcommentData);

router.patch("/writecomment",authMiddleware,writeComment);

router.patch("/deletecomment",authMiddleware,deleteComment);


// auth router 

router.post("/signup", postSignup);

router.post("/verifymail", verifyMail);

router.post("/login", login);

router.post("/gentoken",postRefreshToken);

router.post("/forgotpassword", forgotPassword);

router.post("/resetpassword", resetPassword);

router.get("/logout", logout);

router.patch("/change_name",authMiddleware,changeName);

// router.get("*",(req,res) => {
//   res.send("Page 404....");
// })

module.exports = router;
