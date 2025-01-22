import commentQueries from "../models/commentQueries.js";
import postQueries from "../models/postQueries.js"
import asyncHandler from "express-async-handler";

const getPosts = asyncHandler(async (req, res) => {
    const posts =  await postQueries.getAllBlogPosts();
    console.log('posts', posts)
    res.json(posts);
    })

const getPostandComments = asyncHandler(async(req, res) => {
    const post = await postQueries.getOneBlogPost(req.params.postId);
    const comments = await commentQueries.getCommentsForPost(req.params.postId);
    console.log(post, comments)
    res.json({post, comments});
})

const createPost = asyncHandler(async(req, res) => {
    const post = await postQueries.createBlogPost(req.body);
    res.json(post);
})

const getUsersPosts = asyncHandler(async(req, res) => {
    console.log('getUsersPosts', req.user)
    const posts = await postQueries.getMyBlogPosts(req.user.id);
    res.json(posts);
})

const getUserPublishedPosts = asyncHandler(async(req, res) => {
    const posts = await postQueries.getUserPublishedPosts(req.user.id);
    res.json(posts);
})

const getUserUnpublishedPosts = asyncHandler(async(req, res) => {
    const posts = await postQueries.getUserUnpublishedPosts(req.user.id);
    res.json(posts);
})

const deletePost = asyncHandler(async(req, res) => {
    const post = await postQueries.getOneBlogPost(req.params.postId);
    if (req.user.id !== post.authorId) {
        return res.status(401).json({message: 'You are not authorized to delete this post'});
    }
    else{
        await postQueries.deleteBlogPost(req.params.postId);
        res.json(post);
    }  
})

const updatePost = asyncHandler(async(req, res) => {
    const post = await postQueries.getOneBlogPost(req.params.postId);
    if (req.user.id !== post.authorId) {
        return res.status(401).json({message: 'You are not authorized to update this post'});
    }
    else{
        const updatedPost = await postQueries.updateBlogPost(req.params.postId, req.body);
        res.json(updatedPost);
    }
})

export default {
    getPosts,
    getPostandComments,
    createPost,
    getUsersPosts,
    getUserPublishedPosts,
    getUserUnpublishedPosts,
    deletePost,
    updatePost
}