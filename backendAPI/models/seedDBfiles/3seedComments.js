import commentQueries from "../../models/commentQueries.js";


// paste authorIds from 1createUsers.js and postIds from 2seedPosts.js
const comment1 = {
    content: "This is a great post!",
    username: "user3",
    postId: "3635ffc2-bede-46a9-b15f-74dd70620e35"
};
const comment2 = {
    content: "I love this post!",
    username: "user3",
    postId: "92b4c3ad-106a-4a94-b34e-c4570d0a9c4f"
};
const comment3 = {
    content: "This post is amazing!",
    username: "user3",
    postId: "c7d9ca79-6e42-44da-bf75-1b7394f4dd88"
}



const newComment1 = await commentQueries.createComment2(comment1);
const newComment2 = await commentQueries.createComment2(comment2);
const newComment3 = await commentQueries.createComment2(comment3);


console.log(newComment1, newComment2, newComment3);

//change postIds/usernames to generated ids from 2createPosts.js
// Run this file with node models/seedDBfiles/3seedComments.js