import { Container, makeStyles, Paper,  Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import F04page from "./F04page";

const UseStyle = makeStyles( them => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
  },
  paper : {
    padding : them.spacing(5) 
  }
}));

function VerifyMail({ match }) {
  const dispatch = useDispatch();
  const token = match.params.id;
  console.log(token);
  const [msg,setMsg] = useState({
    message : "",
    name : "",
  });
  
  useEffect(() => {
    const Fun = async () => {
      try {
        const {data} = await axios.post("/verifymail", { token });
        
        setMsg({message : data.message, name : data.name});
        // console.log(data);
      } catch (error) {
        setMsg({message : error.message})
      }
    };
    Fun();
  }, [dispatch,token]);
  const classes = UseStyle();
  return (
    !localStorage.getItem("isLogin") ? (<Container className={classes.root}>
      { msg.name ? (
        <Paper className={classes.paper}>
          <Typography variant="h1" align="center">😂😂</Typography>
          <Typography variant="h1" align="center">👍👍</Typography>
          <Typography variant="h3" color="primary" align="center">Hello {msg.name}</Typography>
          <Typography variant="h4" align="center">{msg.message}</Typography>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="h1" align="center">😭😭</Typography>
          <Typography variant="h1" align="center">👎👎</Typography>
        <Typography variant="h4" align="center">{msg.message}</Typography>
        <Typography variant="h4" align="center">Try again...</Typography>
        </Paper>
      )}
    </Container>) : (<F04page/>)
  );
}

export default VerifyMail;
