import postQueries from "../postQueries.js";
// take authorIds from 1createusers.js and paste them here
const seedDB = async () => {

    
    const post1 = {
        title: "My first blog post",
        content: "This is my first blog post. I hope you enjoy it!",
        published: true,
        authorId: "394a90b7-6395-4e73-8924-7ee77b760370"
    };
    const post2 = {
        title: "My second blog post",
        content: "This is my second blog post. I hope you enjoy it!",
        published: true,
        authorId: "9f644308-821b-4cf5-b5e8-95ea03997a82"
    };
    const post3 = {
        title: "My third blog post",
        content: "This is my third blog post. I hope you enjoy it!",
        published: true,
        authorId: "394a90b7-6395-4e73-8924-7ee77b760370"
    };

    const newPost1 = await postQueries.createBlogPost(post1);
    const newPost2 = await postQueries.createBlogPost(post2);
    const newPost3 = await postQueries.createBlogPost(post3);

    console.log(newPost1, newPost2, newPost3);

    
    }

    seedDB();