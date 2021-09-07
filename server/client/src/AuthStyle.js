import { makeStyles } from "@material-ui/core";
const AuthStyle = makeStyles((them) => ({
  root: {
    "& .MuiTextField-root": {
      margin: them.spacing(1),
    },
    "& .MuiButton": {
      margin: them.spacing(1),
    },
  },
  container: {
    display: "flex",
    height: "100vh",
    width: "100wh",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: them.spacing(2),
  },
  box: {
    display: "flex",
    flexDirection: "row",
  },
  btm: {
    marginRight: them.spacing(1),
    marginTop: them.spacing(2),
  },
  googlestyle: {
    marginTop: them.spacing(1),
  },
  btmst : {
    marginTop : them.spacing(1)
  },
  fg : {
    margin : them.spacing(1)
  }
}));

export default AuthStyle;
