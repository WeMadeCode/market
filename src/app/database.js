const mysql = require("mysql2");

const config = require("./config");

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
});

connections.getConnection((err, conn) => {
  if (err) {
    console.error(err);
  } else {
    conn.connect((err) => {
      if (err) {
        console.error("连接失败:", err);
      } else {
        console.log("数据库连接成功~");
      }
    });
  }
});

module.exports = connections.promise();
