const fs = require("fs");
const axios = require("axios");
const userDB = require("../service/user.service");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");

class LoginController {
  async wechatLogin(ctx, next) {
    const { code } = ctx.request.body;
    const wechatId = "wxa23a23fa2266cb6a";
    const wechatAppSecret = "414c4c6826912b5df74ac4ce0f7c565b";
    const response = await axios.get(
      "https://api.weixin.qq.com/sns/jscode2session",
      {
        params: {
          appid: wechatId,
          secret: wechatAppSecret,
          js_code: code,
          grant_type: "authorization_code",
        },
      }
    );

    const data = response.data;

    if (data.errcode) {
      ctx.status = 400;
      ctx.body = {
        message: data.errmsg,
        code: data.errcode,
        data: null,
      };
    } else {
      // openid: 用户唯一标识
      // session_key: 会话密钥
      const { openid, session_key } = response.data;

      const users = await userDB.queryUserByOpenId(openid);
      if (users.length === 0) {
        await userDB.create({
          open_id: openid,
          session_key: session_key,
          user_id: v4(),
        });
      }
      const token = jwt.sign({ openid, session_key }, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24,
        algorithm: "RS256",
      });
      ctx.body = {
        message: "success",
        code: 200,
        data: token,
      };
    }
  }
}

module.exports = new LoginController();
