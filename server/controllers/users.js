import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.clear();
  try {
    const existingUser = await User.findOne({ email });
    console.log("signin...");
    if (!existingUser) {
      console.log("signin... USER DONT EXISTS");
      return res.status(404).json({ message: "User does not exists" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      console.log("signin... INVALID PASSWORD");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    console.log("signin result", { existingUser });
    res.status(200).json({
      result: {
        _id: existingUser._id,
        email: existingUser.email,
        picture: existingUser.picture,
        name: existingUser.name,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords dont match" });
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashPassword,
      picture: null,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    console.log("signup result");

    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signinWithGoogle = async (req, res) => {
  const {
    email,
    family_name: lastName,
    given_name: firstName,
    picture,
  } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      existingUser = await User.create({
        email,
        password: "",
        picture: picture,
        name: `${firstName} ${lastName}`,
      });
    } else {
      existingUser = await User.findByIdAndUpdate(
        existingUser._id,
        {
          email,
          password: "",
          picture: picture,
          name: `${firstName} ${lastName}`,
        },
        {
          new: true,
          returnOriginal: false,
        }
      );
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      result: {
        _id: existingUser._id,
        email: existingUser.email,
        picture: existingUser.picture,
        name: existingUser.name,
      },
      token,
    });
  } catch (error) {
    console.log("error", { error });
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const test = async (req, res) => {
  res.status(200).json({ result: "test ok" });
};
