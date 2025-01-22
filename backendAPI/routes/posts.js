
import { Router } from 'express';
import userController from '../controllers/userController.js';
import postController from '../controllers/postController.js';

const router = Router();

//Protect routes using this middleware: userController.verifyToken, userController.authUser, 

router.get('/', postController.getPosts);
router.get('/user', userController.verifyToken, userController.authUser, postController.getUsersPosts);
router.get('/published', userController.verifyToken, userController.authUser, postController.getUserPublishedPosts); 
router.get('/unpublished', userController.verifyToken, userController.authUser, postController.getUserUnpublishedPosts);
router.get('/:postId', postController.getPostandComments);

router.post('/', userController.verifyToken, userController.authUser, postController.createPost);

router.put('/:postId', userController.verifyToken, userController.authUser, postController.updatePost);

router.delete('/:postId', userController.verifyToken, userController.authUser, postController.deletePost);

export default router;