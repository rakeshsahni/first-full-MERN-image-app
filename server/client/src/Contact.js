import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { Facebook, LinkedIn, YouTube } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
const useStyle = makeStyles((them) => ({
  root: {
    display: "flex",
    width: "100wh",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& .MuiButton-root" : {
      marginTop : them.spacing(2),
    }
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    padding: them.spacing(1),
    background : blue[100],
  },
  cardAction: {
    // justifyContent : "space-around",
    marginLeft: "15px",
    display: "flex",
    flexDirection: "column",
  },
}));
function Contact() {
  const classes = useStyle();
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper className={classes.paper}>
        <Box>
          <img src="/personal/p16.jpg" alt="personal_img" />
        </Box>
        <Box className={classes.cardAction}>
          <Typography variant="h6" align="center">
            <strong>Intro</strong>
          </Typography>
          <Typography
            variant="subtitle1" 
            align="center"
            color="primary"
          >
            I am Rakesh and it's my <strong>Image Gallery App</strong>.
          </Typography>
          
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            component={Link}
            target="_blank"
            to={{
              pathname:
                "https://www.youtube.com/channel/UCG0z1BGdPKmcy-1DfwDkN1Q",
            }}
          >
            <YouTube/>
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            target="_blank"
            to={{
              pathname: "https://www.linkedin.com/in/rakesh-sahni-7b1b581b6",
            }}
          >
            <LinkedIn />
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            component={Link}
            target="_blank"
            to={{
              pathname:
                "https://www.facebook.com/profile.php?id=100051425001984",
            }}
          >
            <Facebook />
          </Button>
        </Box>
      </Paper>
    </Container>

    // </Box>
  );
}

export default Contact;
