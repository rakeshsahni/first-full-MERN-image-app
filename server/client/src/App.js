import React, { useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Contact from "./Contact";
import Add from "./Add";

import SignUpLogin from "./SignUpLogin";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import VerifyMail from "./VerifyMail";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import genTokenAction from "./redux/actions/genTokenAction";
import F04page from "./F04page";

import Comment from "./Comment";
const them = createMuiTheme({});
function App() {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.genTokenReducer);
  useEffect(() => {
    if (localStorage.getItem("isLogin")) dispatch(genTokenAction());
  }, [dispatch,token,localStorage.getItem("isLogin")]);
  return (
    <ThemeProvider theme={them}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/add/:id" component={Add} />
          <Route exact path="/signuplogin" component={SignUpLogin} />
          <Route exact path="/verifymail/:id" component={VerifyMail} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/resetpassword/:id" component={ResetPassword} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/commentpage/:id" component={Comment} />
          <Route component={F04page} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
