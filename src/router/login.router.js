const Router = require("koa-router");
const { wechatLogin } = require("../controller/login.controller");

const loginRouter = new Router({ prefix: "/login" });

// 微信小程序登录
loginRouter.post("/wechat", wechatLogin);

module.exports = loginRouter;
