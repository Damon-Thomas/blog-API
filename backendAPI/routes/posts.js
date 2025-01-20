
import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.get('/', (req, res) => {
  return res.json({message: 'API GET /posts'});
})

router.get('/:postId', (req, res) => {
  res.json({message: 'API GET /posts/:postId'});
});

router.post('/', userController.verifyToken, userController.authUser, (req, res) => {
  res.json({message: 'API POST /posts', 'token': req.token})
});



router.delete('/:postId', (req, res) => {
  res.json({message: 'API DELETE /posts'});
});

export default router;