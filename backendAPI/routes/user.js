import { Router } from 'express';
import userController from '../controllers/userController.js';
import  {loginValidator, registerValidator} from '../controllers/validateUserInput.js';

const router = Router();

router.get('/', (req, res) => {
  return res.json({message: 'API GET /users'});
});

router.post('/', registerValidator, userController.createUser);
router.post('/login', loginValidator, userController.authUser, userController.generateToken);
router.post('/register', userController.createUser);


export default router;