import { Router } from 'express';
import * as  jwtpkg  from 'jsonwebtoken'
const jwt = jwtpkg.default;
import 'dotenv/config';
const router = Router();

router.get('/', (req, res) => {
  return res.json({message: 'API GET /users'});
});

router.post('/', (req, res) => {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return next(err); // Pass the error to the next middleware
    }
    if (!user) {
      return res.json({message: 'User not found'});
    }
    req.login(user, function (err) {
      if (err) {
        return next(err); // Pass the error to the next middleware
      }
      next();
    });
  })
});

router.post('/login', (req, res) => {
  const user = {
    id:1,
    username:'Damon',
    email:'damon@email.com'
  }
  jwt.sign({user}, process.env.SECRET_KEY,{ expiresIn: '1d'}, (err, token) => {
    res.json({
      token
    });
  });
  // res.json({message: 'API POST /users/login'});
});

// router.get('/:userId', (req, res) => {
//   return res.send(req.context.models.users[req.params.userId]);
// });

export default router;