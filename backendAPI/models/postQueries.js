import { get } from "http";
import prisma from "./client.js";
import relationLoadStrategy from "@prisma/client";

const getAllBlogPosts = async () => {
  try {
    const allPosts = await prisma.posts.findMany({
      relationLoadStrategy: "join",
      include: {
        author: true,
        Comments: true,
      },
    });
    console.log(allPosts);
    return allPosts;
  } catch (error) {
    console.error(error);
  }
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
  } catch (error) {
    console.error(error);
  }
};

const getMyBlogPosts = async (authorId) => {
  try {
    console.log("AuthorId", authorId);
    const myPosts = await prisma.posts.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        Comments: true,
      },
    });
    console.log("filtered Posts", myPosts, authorId);
    return myPosts;
  } catch (error) {
    console.error(error);
  }
};

const getOneBlogPost = async (postId) => {
  try {
    const onePost = await prisma.posts.findUnique({
      where: {
        id: postId,
      },
    });
    return onePost;
  } catch (error) {
    console.error(error);
  }
};

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
};
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
};

const getUserPublishedPosts = async (authorId) => {
  try {
    const publishedPosts = await prisma.posts.findMany({
      where: {
        authorId: authorId,
        published: true,
      },
    });
    return publishedPosts;
  } catch (error) {
    console.error(error);
  }
};

const getUserUnpublishedPosts = async (authorId) => {
  try {
    const unpublishedPosts = await prisma.posts.findMany({
      where: {
        authorId: authorId,
        published: false,
      },
    });
    return unpublishedPosts;
  } catch (error) {
    console.error(error);
  }
};

const getAuthor = async (authorId) => {
  try {
    const author = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });
    return author;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAllBlogPosts,
  createBlogPost,
  getMyBlogPosts,
  getOneBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getUserPublishedPosts,
  getUserUnpublishedPosts,
  getAuthor,
};
