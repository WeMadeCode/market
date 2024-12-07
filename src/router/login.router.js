const Router = require("koa-router");
const { verifyWeChatCode } = require("../middleware/login.middleware");
const { wechatLogin } = require("../controller/login.controller");

const loginRouter = new Router({ prefix: "/login" });

loginRouter.post("/wechat", verifyWeChatCode, wechatLogin);

module.exports = loginRouter;
