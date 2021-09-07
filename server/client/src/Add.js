import {
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory } from "react-router-dom";
import postAction from "./redux/actions/postAction";
import updateAction from "./redux/actions/updateAction";
import SignUpLogin from "./SignUpLogin";
const useStyle = makeStyles((them) => ({
  root: {
    "& .MuiTextField-root": {
      margin: them.spacing(1),
    },
    "& .MuiButton-root": {
      margin: them.spacing(1),
    },
  },
  Paper: {
    padding: them.spacing(2),
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100wh",
  },
}));
function Add({match}) {
  const id = match.params.id;
  // const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ph, setPh] = useState("");
  const dispatch = useDispatch();
  const dt = useSelector( state => id !== "true" ?  state.getReducer.getData.find( p => p._id === id) : null);
  const {postMessage} = useSelector(state => state.getReducer);
  const {token} = useSelector(state => state.genTokenReducer)
  const history = useHistory();
  // for snackbar
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if(dt) {
      // setCreator(dt.creator);
      setTitle(dt.title);
      setDescription(dt.description);
    }
  },[dispatch,id,dt])

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("name", user?.result?.name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("multerimg", ph);
    if(!dt) {
      dispatch(postAction(formData,token));
      setOpen(true);
    }
    else{
      dispatch(updateAction(id,formData,token,history));
      setOpen(true);
    }
    // if(dt.postError) alert(dt.message);
    // console.log(postError);
    // history.goBack();
  };
  // console.log(hello);
  // if(hello.postError) alert(hello.postError);
  const classes = useStyle();

  return (
    localStorage.getItem("isLogin") ? (<Container maxWidth="xs" className={classes.container}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={5 * 1000}
        onClose={handleClose}
        message={postMessage ? postMessage : "Uploding..."}
        action={
          <IconButton key="close" color="inherit" onClick={handleClose}>
            x
          </IconButton>
        }
      />
      {/* {hello.postError && (<h4>{hello.postError}</h4>)} */}
      <Paper className={classes.Paper}>
        <form
          className={classes.root}
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <Typography variant="h4" align="center">
            {
              !dt ? "Add New " : "Update " 
            }
            Gallery
          </Typography>
          <TextField
            required={ !dt ? true : false}
            fullWidth
            variant="outlined"
            name="title"
            label="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            required={ !dt ? true : false}
            fullWidth
            variant="outlined"
            label="description"
            name="description"
            multiline
            rowsMax={3}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <TextField
            required={ !dt ? true : false}
            fullWidth
            variant="outlined"
            type="file"
            onChange={(e) => setPh(e.target.files[0])}
          />
          <Button
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            size="large"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => {
              // setCreator("");
              setDescription("");
              setTitle("");
              setPh("");
            }}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </Container>) : (<SignUpLogin/>)
  );
}

export default Add;
