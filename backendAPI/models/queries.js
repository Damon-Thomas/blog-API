import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()




  const getAllBlogPosts = async() => {
    try {
        const allPosts = await prisma.posts.findMany();
        return allPosts;
    } catch (error) {
        console.error(error);
    };
  };

  const createBlogPost = async (post) => {
    try {
        const newPost = await prisma.posts.create({
            data: {
                title: post.title,
                content: post.content,
                authorId: post.authorId,
                published: post.published,
            },
        });
        return newPost;
    }
    catch (error) {
        console.error(error);
    }
  };

  const getMyBlogPosts = async (authorId) => {
    try {
        const myPosts = await prisma.posts.findMany({
            where: {
                authorId: authorId,
            },
        });
        return myPosts;
    } catch (error) {
        console.error(error);
    }
  };

  const getOneBlogPost = async (postId) => {
    try{  
        const onePost = await prisma.posts.findUnique({
            where: {
                id: postId,
            },
        });
        return onePost;
    }
    catch (error) {
        console.error(error);
    }};

  const updateBlogPost = async (postId, post) => {
    try {
        const updatedPost = await prisma.posts.update({
            where: {
                id: postId,
            },
            data: {
                title: post.title,
                content: post.content,
                published: post.published,
            },
        });
        return updatedPost;
    } catch (error) {
        console.error(error);
    }
  }
  const deleteBlogPost = async (postId) => {
    try {
        const deletedPost = await prisma.posts.delete({
            where: {
                id: postId,
            },
        });
        return deletedPost;
    } catch (error) {
        console.error(error);
    }
  }

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
        const newComment = await prisma.comments.create({
            data: {
                content: comment.content,
                authorId: comment.authorId,
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
    getAllBlogPosts,
    createBlogPost,
    getMyBlogPosts,
    getOneBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getCommentsForPost,
    createComment,
    deleteComment,
    updateComment,
    getMyComments

  };