import prisma from "./client.js";

const createUser = async (username, password) => {
    try {
        const newUser = await prisma.user.create({
        data: {
            username: username,
            password: password,
        },
        });
        return newUser;
    } catch (error) {
        console.error(error);
    }
    }




    export default {
        createUser,
    };