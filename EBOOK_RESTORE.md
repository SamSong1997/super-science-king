# 电子书数据恢复说明

## 问题描述

电子书页面不显示内容，因为数据库中的电子书数据丢失了。

## 原因分析

之前上传的PDF文件仍然存在于服务器上，但数据库中的记录被清空了。

## 解决方案

### 1. 恢复《趣味物理学》

运行脚本恢复之前添加的《趣味物理学》电子书：

```bash
npx tsx scripts/add-physics-book.ts
```

这本书包含：
- 完整的PDF文件：`/sample/趣味物理学.pdf`
- 5个知识点
- 5个章节
- 封面图片

### 2. 添加上传的PDF文件

运行脚本添加用户上传的PDF文件：

```bash
npx tsx scripts/add-uploaded-ebooks.ts
```

添加的电子书：
1. **天堂女人蚂蚱** - `/uploads/ebooks/天堂女人蚂蚱20230329.pdf` (2.0M)
2. **科学探索** - `/uploads/ebooks/1762347687223-d5b2ed5da081f.pdf` (5.9M)
3. **知识百科** - `/uploads/ebooks/1762347791522-7d83570d26d158.pdf` (22M)

## 当前状态

数据库中现在有4本电子书：
- 趣味物理学（带知识点和章节）
- 天堂女人蚂蚱
- 科学探索
- 知识百科

所有电子书都可以在电子书页面正常显示和访问。

## 文件位置

### PDF文件
- `/public/sample/趣味物理学.pdf`
- `/public/uploads/ebooks/天堂女人蚂蚱20230329.pdf`
- `/public/uploads/ebooks/1762347687223-d5b2ed5da081f.pdf`
- `/public/uploads/ebooks/1762347791522-7d83570d26d158.pdf`

### 封面图片
- `/public/images/趣味物理学封面.jpg`
- `/public/images/ebook-cover.png` (默认封面)

### 相关脚本
- `scripts/add-physics-book.ts` - 添加《趣味物理学》
- `scripts/add-uploaded-ebooks.ts` - 添加上传的PDF文件

## 验证

访问 http://localhost:3000/ebooks 应该能看到4本电子书的卡片。

点击任意电子书可以进入阅读页面查看PDF内容。
