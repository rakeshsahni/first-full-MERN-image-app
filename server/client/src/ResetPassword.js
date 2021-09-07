import {
  Button,
  Container,
  TextField,
  makeStyles,
  IconButton,
  Snackbar,
  InputAdornment,
  Paper,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import F04page from "./F04page";

const UseStyle = makeStyles((them) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },
  paper: {
    padding: them.spacing(2),
  },
  form: {
    "& .MuiTextField-root": {
      margin: them.spacing(5),
    },
    "& .MuiButton": {
      margin: them.spacing(1),
    },
    display: "flex",
    flexDirection: "column",
  },
}));
function ResetPassword({ match }) {
  const access_token = match.params.id;
  const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [vis, setVis] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const SubmitHandeler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/resetpassword", {
        access_token,
        password,
      });
      // console.log("Hello");
      // console.log(data);
      setMsg(data.message);
      setOpen(true);
      // alert(msg)
    } catch (error) {
      // alert(msg)
      // console.log(error)
      console.log(error.message);
      setMsg(error.message);
      setOpen(true);
    }
  };
  const classes = UseStyle();
  return (
    !localStorage.getItem("isLogin") ? (<Container maxWidth="sm" className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5 * 1000}
        onClose={handleClose}
        message={msg}
        action={
          <IconButton key="close" color="inherit" onClick={handleClose}>
            x
          </IconButton>
        }
      />
      <Paper className={classes.paper}>
        <form onSubmit={SubmitHandeler} className={classes.form}>
          <TextField
            required
            // margin="dense"
            type={!vis ? "password" : "text"}
            name="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVis((des) => !des)}>
                    {vis ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            name="submit"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>) : (<F04page/>)
  );
}

export default ResetPassword;
