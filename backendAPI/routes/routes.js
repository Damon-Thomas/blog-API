import session from './session.js';
import user from './user.js';
import posts from './posts.js';

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.json({message: 'API V1'});
});

export default {
  session,
  user,
  posts,
  router
};