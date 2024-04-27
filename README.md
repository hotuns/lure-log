# 路亚记

“路亚记”是一个路亚活动记录应用，旨在帮助路亚爱好者管理和优化他们的路亚体验。用户可以通过这个应用注册和登录，管理个人信息，创建并维护一个包含鱼竿和卷线器的个人背包。此外，用户还能根据背包内的装备创建钓鱼组合，记录详细的钓鱼活动，包括时间、地点、天气条件以及钓鱼成果。应用还提供了钓点管理功能，允许用户查看和添加新的钓点。同时还包括一个鱼类图鉴，用户可以通过添加记录来解锁不同的鱼类以及尺寸大小。

## 表结构

- 用户表 (Users)

  - 用户 ID (UserID) - 主键
  - 用户名 (Username)
  - 电话 (Phone)
  - 电子邮件 (Email)
  - 密码 (Password)

- 背包表 (Backpack)
  - 背包 ID (BackpackID) - 主键
  - 用户 ID (UserID) - 外键关联到用户表的用户 ID
  - 鱼竿 (FishingRodID) - 外键关联到鱼竿表的鱼竿 ID
  - 渔轮 (FishingReelID) - 外键关联到卷线器表的卷线器 ID
- 组合表 (Combos)
  - 组合 ID (ComboID) - 主键
  - 用户 ID (UserID) - 外键关联到用户表的用户 ID
  - 鱼竿 (FishingRodID) - 外键关联到鱼竿表的鱼竿 ID
  - 渔轮 (FishingReelID) - 外键关联到卷线器表的卷线器 ID
- 鱼竿表 (FishingRods)
  - 鱼竿 ID (FishingRodID) - 主键
  - 品牌 (Brand)
  - 型号 (Model)
  - 长度 (Length)
  - 节数 (Sections)
  - 硬度 (PowerValue) - 可以是枚举值或外键关联到硬度表
  - 调性 (Action)
- 卷线器表 (FishingReels)
  - 卷线器 ID (FishingReelID) - 主键
  - 类型 (Type)
  - 品牌 (Brand)
  - 型号 (Model)
  - 重量 (Weight)
  - 速比 (GearRatio)
  - 刹车类型 (Braking)
- 记录表 (Records)
  - 记录 ID (RecordID) - 主键
  - 用户 ID (UserID) - 外键关联到用户表的用户 ID
  - 时间 (Time)
  - 装备组合 ID (ComboID) - 外键关联到组合表的组合 ID
  - 天气 (Weather)
  - 下雨 (Rain)
  - 气压 (Pressure)
  - 风速 (WindSpeed)
  - 风向 (WindDirection)
  - 钓点 (FishingSpotID) - 外键关联到钓点表的钓点 ID
- 钓点表 (FishingSpots)
  - 钓点 ID (FishingSpotID) - 主键
  - 坐标 (Coordinates)
  - 位置标签 (LocationTag)
  - 描述信息 (Description)
- 渔获图鉴表 (FishRecords)
  - 记录 ID (RecordID) - 主键
  - 鱼种 (Species)
  - 长度 (Length)
  - 重量 (Weight)
- 鱼类图鉴表 (FishSpecies)
  - 鱼类 ID (FishID) - 主键
  - 鱼种名称 (SpeciesName)
  - 描述 (Description)
  - 图片 (ImageURL)

## API 设计

### 用户管理 (User Management)

#### 注册用户 (Register User)

- **POST** /users/register
- **输入：** 用户名、密码、电子邮件、电话
- **输出：** 注册状态、用户详情

#### 用户登录 (User Login)

- **POST** /users/login
- **输入：** 电子邮件、密码
- **输出：** 认证令牌（Token）

#### 获取用户信息 (Get User Info)

- **GET** /users/{userId}
- **需要认证**
- **输出：** 用户详情

#### 更新用户信息 (Update User Info)

- **PUT** /users/{userId}
- **需要认证**
- **输入：** 电话、密码（可选）
- **输出：** 更新状态

#### 删除用户 (Delete User)

- **DELETE** /users/{userId}
- **需要认证**
- **输出：** 删除状态

### 背包管理 (Backpack Management)

#### 查看背包内容 (View Backpack Contents)

- **GET** /backpacks/{userId}
- **需要认证**
- **输出：** 背包内的鱼竿和卷线器列表

#### 添加鱼竿到背包 (Add Fishing Rod to Backpack)

- **POST** /backpacks/{userId}/rods
- **需要认证**
- **输入：** 鱼竿 ID
- **输出：** 更新后的背包内容

#### 添加卷线器到背包 (Add Fishing Reel to Backpack)

- **POST** /backpacks/{userId}/reels
- **需要认证**
- **输入：** 卷线器 ID
- **输出：** 更新后的背包内容

#### 从背包中移除鱼竿 (Remove Fishing Rod from Backpack)

- **DELETE** /backpacks/{userId}/rods/{rodId}
- **需要认证**
- **输出：** 更新后的背包内容

#### 从背包中移除卷线器 (Remove Fishing Reel from Backpack)

- **DELETE** /backpacks/{userId}/reels/{reelId}
- **需要认证**
- **输出：** 更新后的背包内容

### 组合管理 (Combo Management)

#### 创建组合 (Create Combo)

- **POST** /combos/{userId}
- **需要认证**
- **输入：** 鱼竿 ID、卷线器 ID
- **输出：** 新创建的组合详情

#### 查看用户组合 (View User Combos)

- **GET** /combos/{userId}
- **需要认证**
- **输出：** 用户的所有组合

#### 删除组合 (Delete Combo)

- **DELETE** /combos/{comboId}
- **需要认证**
- **输出：** 删除状态

### 钓鱼记录 (Fishing Records)

#### 记录钓鱼活动 (Log Fishing Activity)

- **POST** /records
- **需要认证**
- **输入：** 用户 ID、组合 ID、时间、天气、钓点 ID、其他气象数据
- **输出：** 新记录的详情

#### 查看钓鱼记录 (View Fishing Records)

- **GET** /records/{userId}
- **需要认证**
- **输出：** 用户的所有钓鱼记录

#### 更新钓鱼记录 (Update Fishing Record)

- **PUT** /records/{recordId}
- **需要认证**
- **输入：** 记录相关的任何可更新字段
- **输出：** 更新后的记录详情

#### 删除钓鱼记录 (Delete Fishing Record)

- **DELETE** /records/{recordId}
- **需要认证**
- **输出：** 删除状态

### 钓点和鱼类图鉴管理 (Fishing Spots and Fish Species Management)

#### 添加钓点 (Add Fishing Spot)

- **POST** /spots
- **输入：** 坐标、位置标签、描述
- **输出：** 新创建的钓点详情

#### 查看所有钓点 (View All Fishing Spots)

- **GET** /spots
- **输出：** 所有钓点列表

#### 添加鱼类信息 (Add Fish Species Info)

- **POST** /fishes
- **输入：** 鱼种名称、描述、图片 URL
- **输出：** 新添加的鱼类详情

#### 查看所有鱼类信息 (View All Fish Species Info)

- **GET** /fishes
- **输出：** 所有鱼类信息列表
