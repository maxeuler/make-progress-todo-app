const bcrypt = require('bcryptjs');

const Mutation = {
  addUser: async (_, { input }, ctx) => {
    const { email, password } = input;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await ctx.models.user.create({
      email,
      password: hashedPassword,
    });
    return user.id;
  },
};

module.exports = Mutation;
