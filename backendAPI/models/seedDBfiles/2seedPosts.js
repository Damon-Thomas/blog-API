import postQueries from "../postQueries.js";
// take authorIds from 1createusers.js and paste them here
const seedDB = async () => {

    
    const post1 = {
        title: "My first blog post",
        content: "This is my first blog post. I hope you enjoy it!",
        published: true,
        authorId: "15a5c4e0-c43c-476a-8c92-0f51e566184a"
    };
    const post2 = {
        title: "My second blog post",
        content: "This is my second blog post. I hope you enjoy it!",
        published: true,
        authorId: "15a5c4e0-c43c-476a-8c92-0f51e566184a"
    };
    const post3 = {
        title: "My third blog post",
        content: "This is my third blog post. I hope you enjoy it!",
        published: true,
        authorId: "708c5b28-fac4-4a46-ad5c-e443487b3808"
    };

    const newPost1 = await postQueries.createBlogPost(post1);
    const newPost2 = await postQueries.createBlogPost(post2);
    const newPost3 = await postQueries.createBlogPost(post3);

    console.log(newPost1, newPost2, newPost3);

    
    }

    seedDB();

    //change authorIds to generated ids from 1createUsers.js
    // Run this file with node models/seedDBfiles/2seedPosts.js