# Admin 管理后台

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-blue.svg" alt="React Version" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue.svg" alt="TypeScript Version" />
  <img src="https://img.shields.io/badge/Vite-7.1-purple.svg" alt="Vite Version" />
  <img src="https://img.shields.io/badge/ESLint-9.36-green.svg" alt="ESLint Version" />
</p>

<p align="center">基于 React 19 + TypeScript + Vite 构建的现代化管理后台系统</p>

## 🚀 快速开始

### 环境要求

- **Node.js**: 22.x 或更高版本
- **pnpm**: 10.x 或更高版本（推荐包管理器）

### 安装依赖

```bash
# 在项目根目录安装所有依赖
pnpm install

# 或者在 admin 目录下安装
cd apps/admin
pnpm install
```

### 启动开发服务器

```bash
# 在项目根目录
pnpm -C apps/admin run dev

# 或者在 admin 目录下
cd apps/admin
pnpm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

## 🏗️ 项目结构

```
apps/admin/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── assets/            # 资源文件
│   ├── components/        # 可复用组件
│   ├── hooks/             # 自定义 Hooks
│   ├── stores/            # 状态管理
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   ├── App.tsx            # 根组件
│   └── main.tsx           # 应用入口
├── eslint.config.js       # ESLint 配置
├── prettier.config.js     # Prettier 配置
├── tsconfig.app.json      # TypeScript 应用配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.node.json     # TypeScript Node 配置
├── vite.config.ts         # Vite 配置
└── package.json           # 项目配置
```

## 🛠️ 技术栈

### 核心框架

- **React 19**: 最新的 React 版本，支持并发特性
- **TypeScript**: 类型安全的 JavaScript 超集
- **Vite**: 快速的前端构建工具

### 开发工具

- **ESLint**: 代码质量检查，继承根目录配置
- **Prettier**: 代码格式化，保持一致的代码风格
- **TypeScript**: 严格的类型检查配置

### 路径别名

项目配置了以下路径别名，方便模块导入：

```typescript
// tsconfig.app.json 中的路径映射
{
  "@/*": ["src/*"],
}
```

### 核心功能

本项目的核心是基于角色的访问控制（RBAC）系统，主要包括以下模块：

- **用户管理**：创建、编辑、删除用户，并为用户分配角色。
- **角色管理**：定义不同的角色，并为角色授予特定权限。
- **权限管理**：管理系统中的所有可用权限。

### 路由设计

项目采用 `react-router` 进行路由管理，路由配置集中在 `src/router` 目录下。

- **路由结构**：
  - `router.tsx`：定义了公共路由（如登录页）和私有路由（需要认证访问）。
  - `routes/`：按模块拆分路由配置，如 `system.tsx`、`dashboard.tsx` 等。
  - `auth.tsx`：提供了路由守卫（Guard），用于保护需要认证的路由。

### API 客户端

项目使用 `@xdd-space/api-client` 作为 API 请求层，封装了与后端的通信逻辑。

- **客户端实例**：`src/lib/api.ts` 中创建了 `apiClient` 实例，并配置了 `baseURL`。
- **请求拦截器**：自动在请求头中注入 `Authorization`，用于身份认证。
- **响应拦截器**：实现了 `token` 自动刷新机制。当 `access_token` 过期时，会尝试使用 `refresh_token` 获取新的 `token`，并重发原始请求，对用户无感。如果刷新失败，则会清除本地认证信息并重定向到登录页。

## 📝 开发指南

### 代码规范

项目继承了根目录的代码规范配置，包括：

- **ESLint**: 代码质量检查，包含 React 特定规则
- **Prettier**: 代码格式化，120 字符行宽
- **TypeScript**: 严格模式，禁用 `any` 类型

### 可用脚本

```bash
# 开发服务器
pnpm run dev

# 构建生产版本
pnpm run build

# 预览生产构建
pnpm run preview

# 代码检查
pnpm run lint
pnpm run lint:fix
pnpm run lint:check

# 代码格式化
pnpm run format
pnpm run format:check

# 类型检查
pnpm run type-check
```

## 🔧 配置说明

### ESLint 配置

- 继承根目录的 `baseConfig`
- 添加 React 特定规则（Hooks、Refresh）
- 支持 TypeScript 严格类型检查
- 自动排序导入语句和对象属性

### TypeScript 配置

- 继承根目录配置
- 启用严格模式和所有类型检查
- 支持 JSX 和现代 ES 特性
- 配置路径别名映射

### Vite 配置

- React 插件支持
- 支持 TypeScript 和 JSX

## 🚀 部署

### 构建生产版本

```bash
pnpm run build
```

构建产物将生成在 `dist/` 目录下。

### 预览构建结果

```bash
pnpm run preview
```
