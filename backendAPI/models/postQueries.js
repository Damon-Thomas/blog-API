
import prisma from './client.js';
import asyncHandler from "express-async-handler";

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

  









  export default {
    getAllBlogPosts,
    createBlogPost,
    getMyBlogPosts,
    getOneBlogPost,
    updateBlogPost,
    deleteBlogPost,

  };