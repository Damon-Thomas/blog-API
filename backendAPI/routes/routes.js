import session from './session.js';
import user from './user.js';
import posts from './posts.js';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../models/postQueries.js';

const router = Router();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.get('/', (req, res) => {
  return res.json({message: 'API V1'});
});

export default {
  session,
  user,
  posts,
  router
};