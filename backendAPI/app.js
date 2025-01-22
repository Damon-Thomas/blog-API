import 'dotenv/config';
import express from 'express';
import models from './models/postQueries.js';
import routes from './routes/routes.js';
import jwt from 'jsonwebtoken'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes.router);
app.use('/comments', routes.comments);
app.use('/users', routes.user);
app.use('/posts', routes.posts);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);