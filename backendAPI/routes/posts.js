import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
import * as  jwtpkg  from 'jsonwebtoken'
const jwt = jwtpkg.default;

const router = Router();

router.get('/', (req, res) => {
  return res.json({message: 'API GET /posts'});
})

router.get('/:postId', (req, res) => {
  return res.send(req.context.models.posts[req.params.postId]);
});

router.post('/', verifyToken, (req, res) => {
  // const id = uuidv4();
  // const post = {
  //   id,
  //   text: req.body.text,
  //   userId: req.context.me.id,
  // };

  // req.context.models.posts[id] = post;

  // return res.send(post);
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if(err){
      res.sendStatus(403);
    }else{
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }else{
    res.sendStatus(403);
  }
}

router.delete('/:postId', (req, res) => {
  const {
    [req.params.postId]: post,
    ...otherposts
  } = req.context.models.posts;

  req.context.models.posts = otherposts;

  return res.send(post);
});

export default router;