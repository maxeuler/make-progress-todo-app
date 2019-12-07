const Query = {
  async user(_, __, ctx) {
    // check if there is user id on the request
    if (!ctx.request.userId) {
      return null;
    }
    const user = await ctx.models.user.findById(ctx.request.userId).exec();
    return user;
  },
  async task(_, { id }, ctx) {
    const task = await ctx.models.task.findById(id).exec();
    return task;
  },
  async tasks(_, __, ctx) {
    // check if there is user id on the request
    if (!ctx.request.userId) {
      return null;
    }
    const tasks = await ctx.models.task
      .find({ user: ctx.request.userId })
      .exec();
    return tasks;
  },
};

module.exports = Query;
