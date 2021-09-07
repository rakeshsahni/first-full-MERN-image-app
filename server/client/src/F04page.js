import {
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((them) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: them.spacing(4),
  },
}));
function F04page() {
  const classes = useStyle();
  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h1" align="center">
          😭👎
        </Typography>
        <Typography variant="h1" align="center">
          😠😩
        </Typography>
        <Typography variant="h3" align="center" color="error">
          Opps 404 Page
        </Typography>
      </Paper>
    </Container>
  );
}

export default F04page;
