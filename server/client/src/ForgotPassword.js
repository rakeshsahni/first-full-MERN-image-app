import {
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
  IconButton,
  Snackbar,
} from "@material-ui/core";
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
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const SubmitHandeler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/forgotpassword", { email });
      // console.log(data);
      setMsg(data.message);
      setOpen(true);
    } catch (error) {
      setMsg(error.message);
      setOpen(true);
    }
  };
  // console.log(msg);
  const classes = UseStyle();
  return !localStorage.getItem("isLogin") ? (
    <Container maxWidth="sm" className={classes.root}>
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
            type="email"
            name="email"
            variant="outlined"
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            name="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  ) : (
    <F04page />
  );
}

export default ForgotPassword;
