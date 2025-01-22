import commentQueries from "../../models/commentQueries.js";


// paste authorIds from 1createUsers.js and postIds from 2seedPosts.js
const comment1 = {
    content: "This is a great post!",
    userId: "5ccf5d35-fcaf-4de8-b341-4c644e1641d9",
    postId: "307461de-7961-4638-ad00-4bdbc26b7f92"
};
const comment2 = {
    content: "I love this post!",
    userId: "5ccf5d35-fcaf-4de8-b341-4c644e1641d9",
    postId: "505334fd-16ef-48d0-a3d9-f3b21640d04a"
};
const comment3 = {
    content: "This post is amazing!",
    userId: "5ccf5d35-fcaf-4de8-b341-4c644e1641d9",
    postId: "ba4ab43a-eab9-4eba-acd3-983aa3bcc52e"
}



const newComment1 = await commentQueries.createComment(comment1);
const newComment2 = await commentQueries.createComment(comment2);
const newComment3 = await commentQueries.createComment(comment3);


console.log(newComment1, newComment2, newComment3);