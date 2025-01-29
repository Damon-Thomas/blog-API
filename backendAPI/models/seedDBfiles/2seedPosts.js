import postQueries from "../postQueries.js";
// take authorIds from 1createusers.js and paste them here
const seedDB = async () => {

    
    const post1 = {
        title: "My first blog post",
        content: "This is my first blog post. I hope you enjoy it!",
        published: true,
        authorId: "900cc93a-b9a1-4aac-8861-a6c05f90d042"
    };
    const post2 = {
        title: "My second blog post",
        content: "This is my second blog post. I hope you enjoy it!",
        published: true,
        authorId: "05b85eb0-eac6-445c-b4a6-e6c6bfd9f83c"
    };
    const post3 = {
        title: "My third blog post",
        content: "This is my third blog post. I hope you enjoy it!",
        published: true,
        authorId: "42aded87-24e5-47db-8711-c6266f45dc66"
    };

    const newPost1 = await postQueries.createBlogPost(post1);
    const newPost2 = await postQueries.createBlogPost(post2);
    const newPost3 = await postQueries.createBlogPost(post3);

    console.log(newPost1, newPost2, newPost3);

    
    }

    seedDB();

    //change authorIds to generated ids from 1createUsers.js
    // Run this file with node models/seedDBfiles/2seedPosts.js