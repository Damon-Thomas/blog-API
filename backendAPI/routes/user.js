import { Router } from 'express';
import userController from '../controllers/userController.js';
import  {loginInputValidator, registerValidator} from '../controllers/validators/validateUserInput.js';

const router = Router();

router.get('/', (req, res) => {
  return res.json({message: 'API GET /users'});
});

router.post('/', registerValidator, userController.createUser);
router.post('/login', loginInputValidator, userController.logIN, userController.generateToken);

export default router;