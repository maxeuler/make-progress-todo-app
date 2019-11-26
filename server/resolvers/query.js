const Query = {
  async user(_, __, ctx) {
    // check if there is user id on the request
    if (!ctx.request.userId) {
      return null;
    }
    const user = await ctx.models.user.findById(ctx.request.userId).exec();
    return user;
  },
};

module.exports = Query;
