import commentQueries from "../models/commentQueries.js";

const getUsersComments = async (req, res) => {
  console.log("id", req.user);
  const comments = await commentQueries.getMyComments(req.user.username);
  console.log(comments);
  res.json(comments);
};

const getComment = async (req, res) => {
  const comment = await commentQueries.getComment(req.params.commentId);
  res.json(comment);
};

const createComment = async (req, res) => {
  console.log("req.body", req.body);
  const comment = await commentQueries.createComment(
    req.body.values,
    req.params.postId,
    req.user.username
  );
  res.json(comment);
};
const deleteComment = async (req, res) => {
  const comment = await commentQueries.deleteComment(req.params.commentId);
  res.json(comment);
};

const updateComment = async (req, res) => {
  const comment = await commentQueries.updateComment(
    req.params.commentId,
    req.body
  );
  res.json(comment);
};

export default {
  getUsersComments,
  createComment,
  deleteComment,
  updateComment,
  getComment,
};
