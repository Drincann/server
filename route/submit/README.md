# 提交截图

## Bata 版本

仅实现了简单的提交截图的功能，且没有对接口的请求做任何限制和验证，接口安全性存在很大问题。



### 后端接口

#### 上传图片

| url            | method |
| -------------- | ------ |
| /submit/upload | POST   |

| fields     | default  | 参数说明             |
| ---------- | -------- | -------------------- |
| name       | required | 姓名，用于生成文件名 |
| screenshot | required | 图片数据             |





## 开发计划

### 用户

用户系统，用来管理和限制请求。

模型：

| fields   | type   | desc               |
| -------- | ------ | ------------------ |
| username | string | 用户名（真实姓名） |
| password | string | 密码               |
| admin    | bool   | 是否是管理员       |



管理员可以发布 task，前端允许用户选择不同的 task 上传截图。

模型：

| fields    | type                     | desc                   |
| --------- | ------------------------ | ---------------------- |
| taskName  | string                   | 任务名称               |
| submitted | string [] or ObjectId [] | 已提交用户的索引或标识 |
| author    | string or ObjectId       | 创建者                 |



### 接口

- 用户接口

  登录接口、获取 task 接口、上传图片接口

- 管理员接口

  用户的增删改查接口、任务的增删改查接口、下载任务结果压缩包的接口