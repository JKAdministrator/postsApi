import React, { useState, useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />

          <Route
            path="/auth"
            exact
            element={
              <GoogleOAuthProvider clientId="633329944250-dhhaq10j3e3b2bfii474uq1k1t5sdisl.apps.googleusercontent.com">
                <Auth />
              </GoogleOAuthProvider>
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
