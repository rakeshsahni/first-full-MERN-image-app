import {
  CircularProgress,
  Container,
  Fab,
  Grid,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Singledata from "./Singledata";
import { useDispatch, useSelector } from "react-redux";
import getAction from "./redux/actions/getAction";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
const useStyle = makeStyles((them) => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  fab: {
    position : "fixed",
    bottom : them.spacing(3),
    right : them.spacing(3),
    zIndex : them.zIndex.tooltip,
  },
}));
function Home() {
  const dispatch = useDispatch();
  const { loading, getData } = useSelector((state) => state.getReducer);
  useEffect(() => {
    dispatch(getAction());
  }, [dispatch]);
  const classes = useStyle();
  return loading ? (
    <>
      <Toolbar /> <CircularProgress />
    </>
  ) : (
    <Container className={classes.root}>
      <Toolbar />
      <Grid container>
        {getData.map((dt, i) => (
          <Singledata key={i} dt={dt} />
        ))}
      </Grid>
      <Fab
        color="primary"
        variant="extended"
        className={classes.fab}
        component={Link}
        to={localStorage.getItem("isLogin") ? `/add/${true}` : "/signuplogin"}
      >
        <Add />Add
      </Fab>
    </Container>
  );
}

export default Home;
