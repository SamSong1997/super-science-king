# 超级科学王 (Super Science King)

一个基于 Next.js 的互动科学学习平台，包含电子书阅读、互动游戏、数字教师和评估测试等功能。

## 功能特性

- 📚 **电子书库** - 支持 PDF 阅读，带有高亮、旋转、全屏等功能
- 🎮 **互动游戏** - 包含华容道、扫雷、火柴棍游戏等益智游戏
- 👨‍🏫 **数字教师** - AI 辅助学习功能
- 📝 **评估测试** - 在线测试和评估系统

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4, Radix UI
- **数据库**: Prisma + SQLite
- **PDF 阅读**: react-pdf, @react-pdf-viewer
- **状态管理**: Zustand
- **表单**: React Hook Form
- **图表**: Recharts

## 开始使用

### 环境要求

- Node.js 20+
- npm/yarn/pnpm

### 安装依赖

```bash
npm install
```

### 配置数据库

```bash
# 推送数据库架构
npm run db:push

# 填充示例数据
npm run db:seed
npm run db:seed:interactive
```

### 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 其他命令

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 打开 Prisma Studio
npm run db:studio

# 代码检查
npm run lint
```

## 项目结构

```
super-science-king/
├── app/              # Next.js App Router 页面
├── components/       # React 组件
├── lib/             # 工具函数和配置
├── prisma/          # 数据库架构和迁移
├── public/          # 静态资源
├── scripts/         # 数据库种子脚本
└── types/           # TypeScript 类型定义
```

## 部署

推荐使用 [Vercel](https://vercel.com) 进行部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/super-science-king)

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
