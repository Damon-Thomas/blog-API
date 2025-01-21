import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import userQueries from "../models/userQueries.js";


const authUser = (req, res, next) => {
    console.log('authUser1', req.headers)
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log('jwt nor verified')
            res.sendStatus(403);
        } else {
            req.user = user;
            console.log('authUser2', req.user)
            next();
        }
        })
};

const generateToken = (req, res) => {
  jwt.sign(
    { user: req.user },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
    (err, token) => {
        console.log('generateToken', token)
      res.json({ 
        'token': token
      });
    }
  );
};

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    console.log('verifyToken', bearerHeader)
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
    }

const logIN = asyncHandler(async (req, res, next) => {
    console.log('login', req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log('post errors')
    try {
        //check if user exists
        const userExists = await userQueries.getUser(req.body.username);
        if (!userExists)
          return res.status(400).json({ message: "user does not exist" });
    
        // check if password is correct
        if (!await bcrypt.compare(req.body.password, userExists.password))
          return res.status(400).json({ message: "incorrect password" });
        else {
            req.user = userExists;
            console.log('user acquired', req.user)
        }
        next()
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
    

const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await userQueries.createUser(username, hashedPassword);
    return res.json(user);
  } catch (err) {
    if (
      err.message.includes(
        "Unique constraint failed on the fields: (`username`)"
      )
    ) {
      return res.json({ message: "Username already exists", failure: true });
    } else {
      return res.json({ message: err.message, failure: true });
    }
  }
});

const logoutUser = (req, res) => {
  res.json({ message: "Logged out" });
};

export default {
  authUser,
  generateToken,
  createUser,
  logoutUser,
  verifyToken,
  logIN,
};
