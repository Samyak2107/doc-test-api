const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        res.status(400).json({ message: "User already exists" });
      } else {
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({
          name: name,
          email: email,
          password: hash,
          userType: "Doctor",
        });
        const savedUser = await newUser.save();
        const acctoken = await JWT.sign(
          {
            _id: savedUser._id,
            email: savedUser.email,
            name: savedUser.name,
            userType: savedUser.userType,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const rfToken = await JWT.sign(
          {
            _id: savedUser._id,
            email: savedUser.email,
            name: savedUser.name,
            userType: savedUser.userType,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        res.status(201).json({
          error: false,
          data: savedUser,
          message: "User created",
          acctoken: acctoken,
          rftoken: rfToken,
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Please provide all fields !" });
  } else {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const acctoken = await JWT.sign(
          {
            _id: user._id,
            email: user.email,
            name: user.name,
            userType: user.userType,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const rftoken = await JWT.sign(
          {
            _id: user._id,
            email: user.email,
            name: user.name,
            userType: user.userType,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        res
          .json({
            error: false,
            data: user,
            message: "User logged in successfully",
            acctoken: acctoken,
            rftoken: rftoken,
          })
          .status(200);
      } else {
        res.status(400).json({ message: "Incorrect password" });
      }
    }
  }
};

const handleRefreshToken = async (req, res) => {
  const { rftoken } = req.body;
  if (!rftoken) {
    res.status(400).json({ message: "Token not found" });
  } else {
    try {
      const decoded = await JWT.verify(
        rftoken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findOne({ _id: decoded._id });
      if (!user) {
        res.status(400).json({ message: "User does not exist" });
      } else {
        const acctoken = await JWT.sign(
          {
            _id: user._id,
            email: user.email,
            name: user.name,
            userType: user.userType,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        res
          .json({
            error: false,
            data: user,
            message: "User logged in successfully",
            acctoken: acctoken,
          })
          .status(200);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { handleNewUser, handleLogin, handleRefreshToken };
