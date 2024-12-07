const fs = require("fs");
const axios = require("axios");
class LoginController {
  async wechatLogin(ctx, next) {
    const { code } = ctx.request.body;
    console.log("1----------", code);

    const wechatId = "wxa23a23fa2266cb6a";
    const wechatAppSecret = "414c4c6826912b5df74ac4ce0f7c565b";

    // https://api.weixin.qq.com/sns/jscode2session

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

    console.log("response = ", response.data);

    /*
    response =  {
      session_key: '3CcBLrSwqH5blUguxDfZMA==',
      openid: 'oPNyk6zTGqJxT2mmhz_Ynwx7RkZU'
    }
    */

    ctx.body = {
      message: "success",
      code: 200,
      data: null,
    };
  }
}

module.exports = new LoginController();
