import {
  Box,
    Button,
  Container,
  Fab,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Toolbar,
  Typography,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAction from "./redux/actions/getAction";
import Singledata from "./Singledata";
import { Link } from "react-router-dom";
import changeNameAction from "./redux/actions/changeNameAction";
import SignUpLogin from "./SignUpLogin";
const useStyle = makeStyles((them) => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  fab: {
    position: "fixed",
    bottom: them.spacing(3),
    right: them.spacing(3),
    zIndex: them.zIndex.tooltip,
  },
  form : {
      display : "flex",
    flexDirection : "column",
    alignItems : "center",
    justifyContent : "center",
    margin : them.spacing(1),
  },
  paper : {
    padding : them.spacing(2),
  }
}));

function Profile() {
  const dispatch = useDispatch();
  const [openText,setOpenText] = useState(false);
  const [name,setName] = useState("");
  const { loger_id, loger_name,token,changeNameMessage} = useSelector((state) => state.genTokenReducer);
  const { getData } = useSelector((state) => state.getReducer);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyle();
  // console.log(getData);
  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(changeNameAction(name,token));
      setOpen(true);
  }
  useEffect(() => {
    if (localStorage.getItem("isLogin")) dispatch(getAction());
  }, [dispatch]);
  return (
    localStorage.getItem("isLogin") ? (<Container className={classes.root}>
      <Toolbar />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5 * 1000}
        onClose={handleClose}
        message={changeNameMessage}
        action={
          <IconButton key="close" color="inherit" onClick={handleClose}>
            x
          </IconButton>
        }
      />
      <Box m={2}>
        <Paper className={classes.paper}>
          <Typography variant="h1" align="center">
            🙏
          </Typography>
          <Typography variant="h3" align="center" color="primary">
            {loger_name}
            <IconButton
            color="primary"
            onClick={() => setOpenText( des => !des)} 
          >
            <Edit />
          </IconButton>
          </Typography>
          
            <Box hidden={!openText}>
            <form onSubmit={submitHandler} className={classes.form} >
                <TextField
                    type="text"
                    required
                    color="primary"
                    name="changeName"
                    label="changeName"
                    variant="outlined"
                    margin="dense"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button
                    color="primary"
                    type="submit"
                    name="submit"
                    variant="contained"
                    
                >change name</Button>
            </form>
            </Box>
            <Typography variant="h4" align="center"> Your All Posted Images 👇</Typography>
        </Paper>
      </Box>
      <Grid container>
        {getData.map(
          (dt, i) => loger_id === dt.owner && <Singledata key={i} dt={dt} />
        )}
      </Grid>
      <Fab
        color="primary"
        variant="extended"
        className={classes.fab}
        component={Link}
        to={`/add/${true}`}
      >
        <Add />
        Add
      </Fab>
    </Container>) : (<SignUpLogin/>)
  );
}

export default Profile;
