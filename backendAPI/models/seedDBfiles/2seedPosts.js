import postQueries from "../postQueries.js";
// take authorIds from 1createusers.js and paste them here
const seedDB = async () => {

    
    const post1 = {
        title: "My first blog post",
        content: "This is my first blog post. I hope you enjoy it!",
        published: true,
        authorId: "82b6b7c1-ee6d-410a-8ac2-e504633b603c"
    };
    const post2 = {
        title: "My second blog post",
        content: "This is my second blog post. I hope you enjoy it!",
        published: true,
        authorId: "82b6b7c1-ee6d-410a-8ac2-e504633b603c"
    };
    const post3 = {
        title: "My third blog post",
        content: "This is my third blog post. I hope you enjoy it!",
        published: true,
        authorId: "ff067de1-ecda-4b1e-8c43-48291909a33f"
    };

    const newPost1 = await postQueries.createBlogPost(post1);
    const newPost2 = await postQueries.createBlogPost(post2);
    const newPost3 = await postQueries.createBlogPost(post3);

    console.log(newPost1, newPost2, newPost3);

    
    }

    seedDB();

    // Run this file with node models/seedDBfiles/2seedPosts.js