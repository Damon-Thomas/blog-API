# blog-API

Blog API Project from The Odin Project => [Odin Assignment](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api)

The project is made of 4 parts.

1. Backend RESTful API hosted on Railway
2. Postgres database that is managed by a Prisma ORM which is also hosted on Railway
3. Blog Viewer Application for viewing blog posts and making comments. Hosted on Vercel.
4. Creator Application for creating blog posts, managing posts, managing comments, and seeing user stats. Also hosted on Vercel.

The following was implemented/used to create the project:

- HTML, CSS, Javascript
- React, ReactRouter, Vite, Tailwind
- PostgreSQL, primsa
- Node.js, Typescript, Express.js
- JWT authentication, bcrypt
- Shadcn Components, Figma, Lucide Icons
- Railway, Vercel

# See Live Project => [Blog API](https://blog-api-green-mu.vercel.app/)

Test login info is pre-populated in the login form. Login and take a look at the Creator Application as well.

## Screenshots

<div style="display: flex; width: 100%; justify-content: center; align-items: flex-start; gap: 2%;">
  <!-- Left: 3 images stacked vertically -->
  <div style="display: flex; flex-direction: column; width: 66%;">
    <img src="./screenshots/blog-api-creator.vercel.app_.png" alt="Creator App Desktop" style="width: 100%; margin-bottom: 2%;" />
    <img src="./screenshots/blog-api-green-mu.vercel.app_.png" alt="Viewer App Blog List" style="width: 100%; margin-bottom: 2%;" />
    <img src="./screenshots/blog-api-green-mu.vercel.app_post_5611dcc8-d16b-4a5b-a859-6366cd3e0644.png" alt="Viewer App Post Detail" style="width: 100%;" />
  </div>
  <!-- Right: Mobile image centered vertically -->
  <div style="display: flex; align-items: center; width: 33%; min-width: 150px;">
    <img src="./screenshots/blog-api-creator.vercel.app_(iPhone SE).png" alt="Creator App Mobile" style="width: 100%; max-width: 250px; margin: auto;" />
  </div>
</div>
