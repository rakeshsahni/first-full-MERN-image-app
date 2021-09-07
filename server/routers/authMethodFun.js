const Obj_registation = require("../db/Obj_registation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendMailFun = require("./sendMail");

const postSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(202).json({ message: "enter all inputs" });
    }

    const dt = await Obj_registation.findOne({ email });
    // if(!dt) console.log(dt);
    // console.log(Boolean(dt));
    if (dt)
      return res.status(202).json({
        message: "Email is Already exists"
      });
    
      if(password.length < 6) return res.status(202).json({
        message : "Please Enter passowrd more then 5 charactor"
      })  
      if (password !== confirmPassword)
        return res.status(202).json({
          message: "Password , Repeat Password doesn't match",
        });
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const user_data = {
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    };
    // const dt = await user_data.save();
    const token = jwt.sign(user_data, process.env.SECRET, {
      expiresIn: "5m",
    });

    // console.log(firstName, lastName, email, password, confirmPassword);
    const url = `${process.env.REDIRECT_URI}/verifymail/${token}`;
    sendMailFun(email, url, "check you email and verify");
    res.json({
      message : "check you email and verify Account"
    });
  } catch (error) {
    res.status(404).json({
      message: "Error in signUp",
    });
  }
};

const verifyMail = async (req, res) => {
  try {
    const { token } = req.body;
    // console.log(req.body);
    const dt = jwt.verify(token, process.env.SECRET);
    // console.log(dt);
    const { name, email, password } = dt;
    const reCheck = await Obj_registation.findOne({ email });
    if (reCheck)
      return res.status(202).json({
        message: "Emai is Allready exist",
      });
    const regData = new Obj_registation({
      name,
      email,
      password,
    });
    // console.log(regData);
    await regData.save();
    res.status(200).json({
      name,
      message : "Account created successfully..."
    });
  } catch (error) {
    res.status(404).json({
      message: "Error in registation mailVerify",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password) {
      return res.status(202).json({ message: "enter all inputs" });
    }
    const exits_user = await Obj_registation.findOne({ email });
    // console.log("Login Part");
    // console.log(exits_user);
    if (!exits_user) {
      return res.status(202).json({
        message : "worng username or password",
      });
    }
    const passwordCorrect = await bcrypt.compare(password, exits_user.password);
    if (!passwordCorrect) {
      return res.status(202).json({
        message: "worng username or password",
      });
    }
    const token = jwt.sign({ id: exits_user._id ,name : exits_user.name}, process.env.SECRET, {
      expiresIn: "7d",
    });
    // console.log(token);
    res.cookie("profile", token, {
      httpOnly: true,
      path : "/gentoken",
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.status(202).json({
      message: "login successfully...",
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      message : "something wrong in Login p/z try again.."
    });
  }
};

const postRefreshToken = (req, res) => {
  try {
    const rf = req.cookies.profile;
    if (!rf)
      return res.status(400).json({
        message: "please login..",
      });
    // console.log(req.cookies.profile);
    const dt = jwt.verify(rf, process.env.SECRET);
    // console.log(dt);

    const access_token = jwt.sign({ id: dt.id , name : dt.name}, process.env.SECRET, {
      expiresIn: "30m",
    });
    // console.log(access_token);
    return res.status(200).json({id : dt.id,name : dt.name, access_token });
  } catch (error) {
    return res.status(500).json({
      message: "Please Login...",
    });
  }
};

const logout = (req, res) => {
  try {
    res
      .cookie("profile", "", {
        httpOnly: true,
        path : "/gentoken",
        expires: new Date(0),
      })
      .json({
        message: "Logout successfully....",
      });
  } catch (error) {
    res.status(404).json({
      message: "logout is unsuccessful",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(202).json({
        message: "Please Insert email",
      });
    const validUser = await Obj_registation.findOne({ email });
    if (!validUser)
      return res.status(202).json({
        message: "Invalid email",
      });
    // console.log(email);
    const access_token = jwt.sign({ id: validUser._id }, process.env.SECRET, {
      expiresIn: "15m",
    });
    // console.log(access_token);
    const url = `${process.env.REDIRECT_URI}/resetpassword/${access_token}`;
    sendMailFun(email, url, "forgotPassword");
    res.status(202).json({
      message: "Please verify password in your gmail",
    });
  } catch (error) {
    res.status(500).json({
      message: "wrong with forgotPassword",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { access_token, password } = req.body;
    // console.log(password);
    if(password.length < 6) return res.status(202).json({
      message : "Please Enter passowrd more then 5 charactor"
    })
    if (!access_token || !password)
      return res.status(202).json({
        message: "Please Enter valid password",
      });
    const verifytoken = jwt.verify(access_token, process.env.SECRET);
    // console.log(password);
    // const {id} = verifytoken;
    const salt = await bcrypt.genSalt(12);
    const HashPass = await bcrypt.hash(password, salt);
    // console.log(verifytoken);
    await Obj_registation.findByIdAndUpdate(verifytoken.id, {
      password: HashPass,
    });
    res.status(202).json({
      message: "reset password successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "reverify password in your mail",
    });
  }
};

const changeName = async (req,res) => {
  try {
    if(!req.owner) return res.status(202).json({
      message : "You cannot change profile name"
    })
    const {name} = req.body;
    if(!name) return res.status(202).json({
      message : "please Enter changeing name"
    })
    // console.log(name);
    const check = await Obj_registation.findById(req.owner);
    if(!check) return res.status(202).json({
      message : "You are not Authorized"
    })

    const newName = await Obj_registation.findByIdAndUpdate(req.owner,{name : name},{new : true});
    // console.log("change_name");
    // console.log(newName);
    return res.status(200).json({
      name : newName.name,
      message : "Profile name changed.Logout & ReSignIn"
    })
  } catch (error) {
    res.status(500).json({
      message : "Not able to change your Name"
    })
  }
}

module.exports = {
  postSignup,
  verifyMail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  postRefreshToken,
  changeName,
};
