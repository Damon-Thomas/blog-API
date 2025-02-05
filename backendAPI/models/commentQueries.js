import prisma from "./client.js";

const getCommentsForPost = async (postId) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
    return comments;
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (comment, postId, username) => {
  console.log("comment", comment);
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        username: username,
        postId: postId,
      },
    });
    return newComment;
  } catch (error) {
    console.error(error);
  }
};

const createComment2 = async (comment) => {
  try {
    const newComment = await prisma.comment.create({
      data: {
        content: comment.content,
        username: comment.username,
        postId: comment.postId,
      },
    });
    return newComment;
  } catch (error) {
    console.error(error);
  }
};

const deleteComment = async (commentId) => {
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    return deletedComment;
  } catch (error) {
    console.error(error);
  }
};

const updateComment = async (commentId, comment) => {
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: comment.content,
      },
    });
    return updatedComment;
  } catch (error) {
    console.error(error);
  }
};

const getMyComments = async (username) => {
  try {
    const myComments = await prisma.comment.findMany({
      where: {
        username: username,
      },
    });
    return myComments;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getCommentsForPost,
  createComment,
  createComment2,
  deleteComment,
  updateComment,
  getMyComments,
};
