import { Router } from "express";
import userController from "../controllers/userController.js";
import commentController from "../controllers/commentController.js";

const router = Router();

router.get(
  "/user",
  userController.verifyToken,
  userController.authUser,
  commentController.getUsersComments
);
router.post(
  "/:postId",
  userController.verifyToken,
  userController.authUser,
  commentController.createComment
);
router.get(
  "/:commentId",
  userController.verifyToken,
  userController.authUser,
  commentController.getComment
);

router.delete(
  "/:commentId",
  userController.verifyToken,
  userController.authUser,
  commentController.deleteComment
);
router.put(
  "/:commentId",
  userController.verifyToken,
  userController.authUser,
  commentController.updateComment
);
export default router;
