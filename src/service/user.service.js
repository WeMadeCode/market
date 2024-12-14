const connection = require("../app/database");

class UserService {
  // 通过OpenId获取用户
  async queryUserByOpenId(openId) {
    const statement = `SELECT * FROM user WHERE open_id = ?;`;
    const result = await connection.execute(statement, [openId]);
    return result[0];
  }

  // 创建用户
  async create(user) {
    const { user_id, open_id, session_key } = user;
    const statement = `INSERT INTO user (user_id, open_id, session_key) VALUES (?, ?, ?);`;
    try {
      const result = await connection.execute(statement, [
        user_id,
        open_id,
        session_key,
      ]);
      console.log(result[0]);
      return result[0];
    } catch (e) {
      console.error(e);
    }
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}

module.exports = new UserService();
