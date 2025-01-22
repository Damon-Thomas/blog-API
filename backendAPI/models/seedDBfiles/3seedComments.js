import commentQueries from "../../models/commentQueries.js";


// paste authorIds from 1createUsers.js and postIds from 2seedPosts.js
const comment1 = {
    content: "This is a great post!",
    username: "user3",
    postId: "4d68c29a-790f-4699-a084-5d08a25f66b0"
};
const comment2 = {
    content: "I love this post!",
    username: "user3",
    postId: "b7c8750f-3253-46c5-94a3-0e2c2cb819c5"
};
const comment3 = {
    content: "This post is amazing!",
    username: "user3",
    postId: "e332ccd6-4e97-4b5c-856d-d3526bccd170"
}



const newComment1 = await commentQueries.createComment(comment1);
const newComment2 = await commentQueries.createComment(comment2);
const newComment3 = await commentQueries.createComment(comment3);


console.log(newComment1, newComment2, newComment3);

// Run this file with node models/seedDBfiles/3seedComments.js