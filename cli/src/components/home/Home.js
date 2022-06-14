import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { getGoogleUserInfo } from "../../actions/auth";
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const access_token = useSelector((state) => state?.authData?.access_token);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId}></Posts>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
export default Home;
