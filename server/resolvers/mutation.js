const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutation = {
  async addUser(_, { input }, ctx) {
    const { email, password } = input;
    // hash input password
    const hashedPassword = await bcrypt.hash(password, 10);
    // save user to db
    const user = await ctx.models.user.create({
      email,
      password: hashedPassword,
    });
    // generate token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set token as cookie on the response so they are logged in
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
    // get id of current user
    const { userId } = ctx.request;
    const task = await ctx.models.task.create({
      name,
      unit,
      unitCount: parseFloat(unitCount),
      user: userId,
    });
    return task;
  },
  async addUnits(_, { input }, ctx) {
    const { task, units } = input;
    const updatedTask = await ctx.models.task
      .findOneAndUpdate(
        { _id: task },
        { $inc: { doneUnitCount: units } },
        { new: true }
      )
      .exec();
    return updatedTask;
  },
  async deleteTask(_, { id }, ctx) {
    const task = await ctx.models.task.findOneAndDelete({ _id: id }).exec();
    return task;
  },
  async changePassword(_, { password }, ctx) {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // get id of logged in user
    const { userId } = ctx.request;
    // update password
    await ctx.models.user
      .findOneAndUpdate({ _id: userId }, { password: hashedPassword })
      .exec();
    // return success
    return { message: 'Password changed' };
  },
};

module.exports = Mutation;
