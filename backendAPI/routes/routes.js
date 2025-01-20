import session from './session.js';
import user from './user.js';
import posts from './posts.js';
import dotenv from 'dotenv';
import userQueries from '../models/userQueries.js';


import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";

dotenv.config(); // Ensure dotenv is configured

import { Router } from 'express';
const router = Router();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      console.log('payload', payload)
      const user = userQueries.getUser(payload.username)
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

router.get('/', (req, res) => {
  return res.json({message: 'API V1'});
});

export default {
  session,
  user,
  posts,
  router
};