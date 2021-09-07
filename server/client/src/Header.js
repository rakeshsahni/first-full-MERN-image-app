import {
  AppBar,
  Button,
  Container,
  Toolbar,
} from "@material-ui/core";
import { Home, LockOpen } from "@material-ui/icons";
// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import Afterlogin from "./Afterlogin";
function Header() {
  
  return (
    <Container>
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: "space-around" }}>
          <Button startIcon={<Home/>} color="inherit" component={Link} to="/">
            Home
          </Button>
          {localStorage.getItem("isLogin") ? (
            <Afterlogin/>
          ) : (
            <Button
              color="inherit"
              startIcon={<LockOpen/>}
              component={Link}
              to="/signuplogin"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Header;
