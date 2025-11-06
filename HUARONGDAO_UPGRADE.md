# 华容道游戏升级

## 📋 升级内容

### 游戏配置优化
- ✅ 保留1个华容道游戏，删除重复游戏
- ✅ 升级为更有挑战性的布局配置
- ✅ 确保通关逻辑正常工作

### 三种难度系统
- ✅ **简单难度**：20步内完成
- ✅ **中等难度**：15步内完成  
- ✅ **困难难度**：12步内完成（最优解）

## 🎮 游戏布局

### 初始状态
```
魏延 | 马超 | 张飞
曹操 | [空] | 赵云  
卒   | 黄忠 | 关羽
```

### 目标状态
```
张飞 | 赵云 | 马超
黄忠 | 曹操 | 魏延
卒   | 关羽 | [空]
```

### 挑战性分析
- **移动复杂度**：需要12步最优解
- **策略规划**：需要为曹操清理移动路径
- **空间推理**：多个武将需要重新排列

## 🎯 通关逻辑

### 胜利条件检测
```typescript
// 检查是否达成目标
if (arraysEqual(nextBoard, targetBoard)) {
  const isOptimal = newMoves <= (puzzle.solution?.optimalSteps || 12)
  setFeedback(`🎉 恭喜通关！用了${newMoves}步完成${difficulty}难度挑战！`)
  onComplete({
    solved: true,
    moves: newMoves,
    snapshot: { board: nextBoard, difficulty, isOptimal }
  })
}
```

### 步数限制系统
```typescript
const maxSteps = {
  easy: 20,    // 简单：充足步数
  medium: 15,  // 中等：需要规划
  hard: 12     // 困难：最优解挑战
}[difficulty]
```

## 🎨 用户界面改进

### 难度选择
- 三个难度按钮，清晰标注步数限制
- 选中状态高亮显示
- 切换难度自动重置游戏

### 目标状态预览
```tsx
<div className="grid grid-cols-3 gap-1 max-w-32 mx-auto">
  {targetBoard.map((row, rowIndex) =>
    row.map((value, colIndex) => (
      <div className={`h-8 text-xs rounded flex items-center justify-center ${
        value === 'hole' 
          ? 'border border-dashed border-[#e8e6dc] bg-white' 
          : 'bg-[#6a9bcc]/20 text-[#6a9bcc]'
      }`}>
        {value === 'hole' ? '' : value}
      </div>
    ))
  )}
</div>
```

### 进度显示系统
- **步数计数器**：显示当前步数/最大步数
- **进度条**：视觉化显示进度
- **颜色编码**：接近限制时变红色警告
- **智能提示**：80%步数时显示警告

## 🔧 技术实现

### 移动验证
```typescript
function handleMove(row: number, col: number) {
  // 1. 检查是否与空格相邻
  const isAdjacent = (row === holeRow && Math.abs(col - holeCol) === 1) ||
                     (col === holeCol && Math.abs(row - holeRow) === 1)
  
  // 2. 检查步数限制
  if (newMoves > currentMaxSteps) {
    setFeedback(`超过${difficulty}难度的最大步数限制！`)
    return
  }
  
  // 3. 执行移动
  // 4. 检查胜利条件
}
```

### 状态管理
```typescript
const [board, setBoard] = useState(initialBoard)
const [moves, setMoves] = useState(0)
const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
const [feedback, setFeedback] = useState<string | null>(null)
```

## 📊 游戏数据

### 题目配置
```json
{
  "id": "pz-slide-01",
  "title": "华容道智力挑战",
  "type": "SLIDE_PUZZLE",
  "solution": {
    "optimalSteps": 12,
    "strategy": "先移动周围武将为曹操让路，再将曹操移到中心位置",
    "difficulties": {
      "easy": { "maxSteps": 20, "hint": "有充足的步数，慢慢规划" },
      "medium": { "maxSteps": 15, "hint": "需要更高效的路径规划" },
      "hard": { "maxSteps": 12, "hint": "挑战最优解！每一步都要精确" }
    }
  }
}
```

## 🎯 用户体验流程

1. **进入游戏**：看到初始布局和目标预览
2. **选择难度**：根据能力选择合适的挑战
3. **开始移动**：点击武将进行移动
4. **观察进度**：实时查看步数和进度条
5. **获得反馈**：接近限制时收到警告
6. **达成目标**：自动检测并显示通关信息
7. **查看成绩**：了解是否达到最优解

## 🚀 性能优化

### 状态比较优化
- 使用 `JSON.stringify` 进行深度比较
- 每次移动后立即检查胜利条件
- 避免不必要的重复计算

### 用户体验优化
- 移动动画流畅自然
- 即时反馈和提示
- 清晰的视觉指引

## 🧪 测试验证

运行测试脚本：
```bash
npx tsx scripts/test-huarongdao.ts
```

重新生成数据：
```bash
npx tsx scripts/seed-interactive.ts
```

---

*升级时间：2025年11月5日*
*升级内容：华容道游戏全面优化，三种难度，完善通关逻辑*