import commentQueries from "../../models/commentQueries.js";


// paste authorIds from 1createUsers.js and postIds from 2seedPosts.js
const comment1 = {
    content: "This is a great post!",
    username: "user3",
    postId: "1842e08e-6149-4f47-bd73-5bb95eba5005"
};
const comment2 = {
    content: "I love this post!",
    username: "user3",
    postId: "c89e6b3b-4f0b-41f4-917c-85af5d108274"
};
const comment3 = {
    content: "This post is amazing!",
    username: "user3",
    postId: "ef04f72c-849b-4f1f-8f0b-f1800157e303"
}



const newComment1 = await commentQueries.createComment2(comment1);
const newComment2 = await commentQueries.createComment2(comment2);
const newComment3 = await commentQueries.createComment2(comment3);


console.log(newComment1, newComment2, newComment3);

//change postIds/usernames to generated ids from 2createPosts.js
// Run this file with node models/seedDBfiles/3seedComments.js