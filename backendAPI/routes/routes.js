import session from './session.js';
import user from './user.js';
import posts from './posts.js';
import dotenv from 'dotenv';
import userQueries from '../models/userQueries.js';

import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";

dotenv.config(); 

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
      const user = await userQueries.getUser(payload.user.username);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// Ensure passport middleware is used
router.use(passport.initialize());

router.get('/', (req, res) => {
  console.log('GET / route accessed');
  return res.json({message: 'API V1'});
});

// Add a protected route to test JWT authentication
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('Protected route accessed');
  return res.json({ message: 'You have accessed a protected route', user: req.user });
});

export default {
  session,
  user,
  posts,
  router
};