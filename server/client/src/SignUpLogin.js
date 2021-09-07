import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Lock, LockOpen, Visibility, VisibilityOff } from "@material-ui/icons";

import React, { useState } from "react";
import AuthStyle from "./AuthStyle";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,Link } from "react-router-dom";
import F04page from "./F04page";
import signupAction from "./redux/actions/singupAction";
import loginAction from "./redux/actions/loginAction";
function SignUpLogin() {
  const {authmsg} = useSelector(state => state.genTokenReducer);
  const dispatch = useDispatch();
  const [isSignup, setisSignup] = useState(false);
  const [checkVis, setCheckVis] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      if(isSignup){
        dispatch(signupAction(formData))
        // setMsg(authmsg);
        setOpen(true);
        // setMsg(data.message);
      }else{
        dispatch(loginAction(formData,history));
        // const {data} = await axios.post("/login",formData);
        setOpen(true);
        
      }
    } catch (error) {
      // console.log(error.message);
      setOpen(true);
    }
  };
  // console.log(authmsg);
  const classes = AuthStyle();
  return (
    !localStorage.getItem("isLogin") ? (<Container maxWidth="xs" className={classes.container}>
      {/* <h2>{msg}</h2> */}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5 * 1000}
        onClose={handleClose}
        message={authmsg}
        action={
          <IconButton key="close" color="inherit" onClick={handleClose}>
            x
          </IconButton>
        }
      />
      <Paper className={classes.paper}>
        <Box align="center">
          <Avatar>
            {isSignup ? (
              <Lock color="secondary" />
            ) : (
              <LockOpen color="primary" />
            )}
          </Avatar>
        </Box>
        <Typography align="center">
          {isSignup ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.root} onSubmit={handleSubmit}>
          {isSignup && (
            <Box className={classes.box}>
              <TextField
                required
                name="firstName"
                label="First Name"
                fullWidth
                variant="outlined"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <TextField
                required
                name="lastName"
                label="Last Name"
                fullWidth
                variant="outlined"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Box>
          )}
          <TextField
            required
            name="email"
            label="email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            required
            name="password"
            label="password"
            fullWidth
            type={checkVis ? "text" : "password"}
            variant="outlined"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setCheckVis((vis) => !vis)}>
                    {checkVis ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isSignup && (
            <TextField
              required
              name="repeatPassword"
              label="Repeat Password"
              fullWidth
              type={checkVis ? "text" : "password"}
              variant="outlined"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          )}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            name="submit"
            color="primary"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <Box className={classes.btmst}>
        {!isSignup && (
            <Box className={classes.fg} >
              <Link to="/forgotpassword">Forgot Password</Link>
            </Box>
          )}
          <Button 
            onClick={() => setisSignup((st) => !st)}
          >
            {isSignup ? "Already have an account" : "Don't have an account"}
          </Button>
          
        </Box>
      </Paper>
    </Container> ) : (<F04page/>)
  );
}

export default SignUpLogin;
