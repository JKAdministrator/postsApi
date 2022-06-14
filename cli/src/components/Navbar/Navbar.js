import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Toolbar,
  Avatar,
  Button,
} from "@material-ui/core";
import useStyles from "./styles.js";
import memories from "../../images/memories.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authData"))
  );
  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("authData")));
  }, [location, dispatch]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img src={memories} alt="memories" height={"60"}></img>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.profile.name}
              src={user.profile.picture}
            >
              {user.profile.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.profile.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign-in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
