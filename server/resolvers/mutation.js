const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
  async addUser(_, { input }, ctx) {
    const { email, password } = input;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await ctx.models.user.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set token as cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    return user;
  },
  async signin(_, { input }, ctx) {
    const { email, password } = input;
    // check email
    const user = await ctx.models.user.findOne({ email }).exec();
    if (!user) {
      throw new Error('No such user found with that email');
    }
    // check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password');
    }
    // generate jwt
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set token as cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // return user
    return user;
  },
  signout(_, __, ctx) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye' };
  },
  async addTask(_, { input }, ctx) {
    const { name, unit, unitCount } = input;
    const task = await ctx.models.task.create({
      name,
      unit,
      unitCount: parseFloat(unitCount),
    });
    return task;
  },
};

module.exports = Mutation;
