import prisma from './client.js';

const getCommentsForPost = async (postId) => {
    try {
        const comments = await prisma.comments.findMany({
            where: {
                postId: postId,
            },
        });
        return comments;
    } catch (error) {
        console.error(error);
    }
  }

  const createComment = async (comment) => {
    try {
        const newComment = await prisma.comment.create({
            data: {
                content: comment.content,
                userId: comment.userId,
                postId: comment.postId,
            },
        });
        return newComment;
    } catch (error) {
        console.error(error);
    }
  }

  const deleteComment = async (commentId) => {
    try {
        const deletedComment = await prisma.comments.delete({
            where: {
                id: commentId,
            },
        });
        return deletedComment;
    } catch (error) {
        console.error(error);
    }
  }

  const updateComment = async (commentId, comment) => {
    try {
        const updatedComment = await prisma.comments.update({
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
  }

  const getMyComments = async (authorId) => {
    try {
        const myComments = await prisma.comments.findMany({
            where: {
                authorId: authorId,
            },
        });
        return myComments;
    } catch (error) {
        console.error(error);
    }
  }

  export default {
    getCommentsForPost,
    createComment,
    deleteComment,
    updateComment,
    getMyComments,
  };