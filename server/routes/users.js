import express from "express";

import {
  test,
  signup,
  signin,
  signinWithGoogle,
} from "../controllers/users.js";
const router = express.Router();
router.post("/signin", (req, res) => {
  console.log("signin");
  signin(req, res);
});
router.post("/signinWithGoogle", (req, res) => {
  console.log("signinWithGoogle");
  signinWithGoogle(req, res);
});

router.post("/signup", async (req, res) => {
  console.log("signup");
  signup(req, res);
});

export default router;
