# market

market 旨在创建一个单身男女青年分享生活动态的平台。

### 功能：

1.用户管理系统 2.内容管理系统 3.内容评论管理 4.内容标签管理 5.文件管理系统

### 架构：

1. API 接口 => router；
2. 处理函数的控制 => controller
3. 操作数据库 => service

# 接口文档

### 微信登录

path: login/wechat
method: post
body:

```json
{
  code: "临时登录凭证code";
}
```
response: 
```json
{
    code: 200
    data: "jwt token 用于访问后续数据"
    message: "success"
} 

```
