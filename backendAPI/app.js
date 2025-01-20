import 'dotenv/config';
import express from 'express';
import models from './models/queries.js';
import routes from './routes/routes.js';
import jwt from 'jsonwebtoken'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     req.context = {
//         models,
//         me: models.users[1],
//     };
// next();
// });

app.use('/', routes.router);
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/posts', routes.posts);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);