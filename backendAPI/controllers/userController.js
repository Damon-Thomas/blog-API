import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import userQueries from "../models/userQueries.js";


const authUser = (req, res, next) => {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return next(err); // Pass the error to the next middleware
    }
    if (!user) {
      return res.json({ message: "User not found" });
    }
    req.login(user, function (err) {
      if (err) {
        return next(err); // Pass the error to the next middleware
      }
      return next();
    });
  });
};

const generateToken = (req, res) => {
  jwt.sign(
    { user: req.user },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
    (err, token) => {
      res.json({
        token,
      });
    }
  );
};

const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  const salt =  await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await userQueries.createUser(username, hashedPassword);
    res.redirect("/login");
    return res.json(user);
  } catch (err) {
    return res.json({ message: err.message });
  }
});

export default {
  authUser,
  generateToken,
  createUser,
};
