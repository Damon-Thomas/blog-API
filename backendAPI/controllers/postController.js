import commentQueries from "../models/commentQueries.js";
import postQueries from "../models/postQueries.js"
import asyncHandler from "express-async-handler";

const getPosts = asyncHandler(async (req, res) => {
    const posts =  await postQueries.getAllBlogPosts();
    console.log('posts', posts)
    res.json(posts);
    })

const getPostandComments = asyncHandler(async(req, res) => {
    const post = postQueries.getOneBlogPost(req.params.postId);
    const comments = commentQueries.getCommentsForPost(req.params.postId);
    res.json({post, comments});
})

export default {
    getPosts,
    getPostandComments
}