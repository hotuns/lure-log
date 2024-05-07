# 路亚记

“路亚记”是一个路亚活动记录应用，旨在帮助路亚爱好者管理和优化他们的路亚体验。
用户可以通过这个应用注册和登录，管理个人信息，创建并维护一个包含鱼竿和卷线器的个人背包。
此外，用户还能根据背包内的装备创建钓鱼组合，记录详细的钓鱼活动，包括时间、地点、天气条件以及钓鱼成果。
应用还提供了钓点管理功能，允许用户查看和添加新的钓点。
同时还包括一个鱼类图鉴，用户可以通过添加记录来解锁不同的鱼类以及尺寸大小。

![demo](./demo.png)

## 表结构

![er](./db-er.png)

## docker

1. 运行需要数据库，为了灵活，我选择了 mongodb。（需要集群）

```bash
docker-compose up -d #启动
```

2. 进入 mongodb-primary 容器中，

```bash
docker exec -it mongodb-primary bash

```

3. 输入 mongosh，进入 MongoDB 提供的 shell 工具，执行如下命令

```js
mongosh;

rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb-primary:27017" },
    { _id: 1, host: "mongodb-secondary:27017" },
    { _id: 2, host: "mongodb-arbiter:27017", arbiterOnly: true },
  ],
});
```

4. 检查复制集的状态：初始化复制集后，可以运行以下命令来检查复制集的状态：

```js
rs.status();
```

编辑.env 文件
DATABASE_URL="mongodb://localhost:27017/lurelog?readPreference=primary&ssl=false&directConnection=true"
