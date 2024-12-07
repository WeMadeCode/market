const errorTypes = require("../constants/error-types");

const verifyWeChatCode = async (ctx, next) => {
  const { code } = ctx.request.body;

  if (!code || code.length === 0) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

module.exports = {
  verifyWeChatCode,
};
