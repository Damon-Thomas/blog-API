import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import userQueries from "../userQueries.js";

//to seed db start here
const seedUser = asyncHandler(async (username, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
      try {
        const user = await userQueries.createUser(username, hashedPassword);
        return user;
      }
        catch (error) {
            console.error(error);
        }
})

const user1 = await seedUser('user1', 'password1');
const user2 = await seedUser('user2', 'password2');
const user3 = await seedUser('user3', 'password3');

console.log(user1, user2, user3);

//    node models/seedDBfiles/1createUsers.js