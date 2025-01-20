import prisma from "./client.js";

const createUser = async (username, password) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  return newUser;
};

export default {
  createUser,
};
