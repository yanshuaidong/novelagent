---
name: apple-hig-designer
description: 遵循人机界面指南（Human Interface Guidelines）设计 Apple 风格的 iOS/macOS 界面。创建符合 HIG 的组件，集成 SF Symbols、San Francisco 字体，并满足无障碍规范。支持可选的现代视觉效果。适用于设计 Apple 风格 UI、iOS/macOS 界面、HIG 合规组件，或实现设计系统规范。
---

# Apple HIG 设计师

专业级前端设计技能，使 Claude Code 能够创建符合 Apple 人机界面指南（HIG）的界面，达到 Apple 设计团队的质量标准。

## 何时使用本技能

当用户提出以下需求时，激活本技能：
- Apple 风格或 iOS/macOS 风格界面
- 符合 HIG 的 UI 组件
- SF Symbols 集成
- San Francisco 字体实现
- 现代玻璃效果（可选，需用户明确要求）

**触发短语：**
- "Design an Apple-style..."（设计 Apple 风格……）
- "Create a HIG-compliant..."（创建符合 HIG 的……）
- "iOS/macOS style component"（iOS/macOS 风格组件）
- "苹果风格的界面"
- "符合 HIG 的设计"

---

## 核心设计原则

### Apple 设计的四大支柱

1. **清晰（Clarity）**
   - 每个元素都有明确用途
   - 消除不必要的复杂性
   - 用户无需说明即可立即理解
   - 使用清晰的视觉层级

2. **尊重内容（Deference）**
   - UI 元素辅助内容，而非与之竞争
   - 最小化装饰性元素和视觉噪音
   - 让内容成为主角
   - 使用柔和的背景和边框

3. **层次（Depth）**
   - 通过图层建立清晰的视觉层级
   - 有目的地使用阴影、模糊和半透明效果
   - 动效强化空间关系
   - Z 轴传达重要性

4. **一致性（Consistency）**
   - 跨平台使用熟悉的模式
   - 可预测的交互行为
   - 统一的视觉语言
   - 尊重平台惯例

---

## 设计系统规范

### 字体系统

**字体族：** San Francisco（SF Pro）

```css
/* 网页端系统字体栈 */
:root {
  --font-system: -apple-system, BlinkMacSystemFont, 'SF Pro Display',
                 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'SF Mono', SFMono-Regular, Menlo, Monaco, monospace;
}

/* 字号比例尺（iOS） */
--text-caption2: 11px;    /* Caption 2 */
--text-caption1: 12px;    /* Caption 1 */
--text-footnote: 13px;    /* Footnote */
--text-subhead: 15px;     /* Subheadline */
--text-body: 17px;        /* Body - 默认 */
--text-headline: 17px;    /* Headline（半粗体） */
--text-title3: 20px;      /* Title 3 */
--text-title2: 22px;      /* Title 2 */
--text-title1: 28px;      /* Title 1 */
--text-large-title: 34px; /* Large Title */
```

**字体规则：**
- 字号 ≥ 20pt 时使用 SF Pro Display
- 字号 < 20pt 时使用 SF Pro Text
- 保持一致的行高（1.2–1.5）
- 用字重建立层级，而非仅靠字号

### 颜色系统

```css
/* Apple 系统颜色 - 浅色模式 */
:root {
  /* 主色 */
  --system-blue: #007AFF;
  --system-green: #34C759;
  --system-indigo: #5856D6;
  --system-orange: #FF9500;
  --system-pink: #FF2D55;
  --system-purple: #AF52DE;
  --system-red: #FF3B30;
  --system-teal: #5AC8FA;
  --system-yellow: #FFCC00;

  /* 灰度色阶 */
  --system-gray: #8E8E93;
  --system-gray2: #AEAEB2;
  --system-gray3: #C7C7CC;
  --system-gray4: #D1D1D6;
  --system-gray5: #E5E5EA;
  --system-gray6: #F2F2F7;

  /* 语义色 */
  --label-primary: #000000;
  --label-secondary: rgba(60, 60, 67, 0.6);
  --label-tertiary: rgba(60, 60, 67, 0.3);
  --label-quaternary: rgba(60, 60, 67, 0.18);

  /* 背景 */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F2F2F7;
  --bg-tertiary: #FFFFFF;

  /* 分隔线 */
  --separator: rgba(60, 60, 67, 0.29);
  --separator-opaque: #C6C6C8;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  :root {
    --system-blue: #0A84FF;
    --system-green: #30D158;
    --system-indigo: #5E5CE6;
    --system-orange: #FF9F0A;
    --system-pink: #FF375F;
    --system-purple: #BF5AF2;
    --system-red: #FF453A;
    --system-teal: #64D2FF;
    --system-yellow: #FFD60A;

    --system-gray: #8E8E93;
    --system-gray2: #636366;
    --system-gray3: #48484A;
    --system-gray4: #3A3A3C;
    --system-gray5: #2C2C2E;
    --system-gray6: #1C1C1E;

    --label-primary: #FFFFFF;
    --label-secondary: rgba(235, 235, 245, 0.6);
    --label-tertiary: rgba(235, 235, 245, 0.3);
    --label-quaternary: rgba(235, 235, 245, 0.18);

    --bg-primary: #000000;
    --bg-secondary: #1C1C1E;
    --bg-tertiary: #2C2C2E;

    --separator: rgba(84, 84, 88, 0.6);
    --separator-opaque: #38383A;
  }
}
```

### 间距系统

**8pt 网格系统：**
```css
:root {
  --space-1: 4px;   /* 超小 */
  --space-2: 8px;   /* 小 */
  --space-3: 12px;  /* 中小 */
  --space-4: 16px;  /* 中 */
  --space-5: 20px;  /* 中大 */
  --space-6: 24px;  /* 大 */
  --space-8: 32px;  /* 超大 */
  --space-10: 40px; /* 2 倍大 */
  --space-12: 48px; /* 3 倍大 */
}
```

**触控目标要求：**
- **iOS：** 最小 44×44 点
- **visionOS：** 最小 60 点点击区域
- 视觉元素较小时，始终添加足够的内边距

### 圆角（同心圆设计）

```css
:root {
  /* 基础圆角值 */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-full: 9999px; /* 胶囊形 */
}

/* 同心圆规则：内圆角 + 内边距 = 外圆角 */
/* 示例：8px 内圆角 + 8px 内边距 = 16px 外圆角 */
```

---

## 组件模式

### 按钮

```css
/* 主按钮 - 胶囊样式 */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 12px 24px;
  font-family: var(--font-system);
  font-size: 17px;
  font-weight: 600;
  color: #FFFFFF;
  background: var(--system-blue);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: transform 0.1s ease, opacity 0.1s ease;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-primary:active {
  transform: scale(0.98);
}

/* 次要按钮 */
.btn-secondary {
  min-height: 44px;
  padding: 12px 24px;
  font-family: var(--font-system);
  font-size: 17px;
  font-weight: 600;
  color: var(--system-blue);
  background: rgba(0, 122, 255, 0.1);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
}
```

### 玻璃效果（可选 - 仅在用户要求时使用）

> **注意：** 玻璃/磨砂效果仅在用户明确要求时使用。默认设计应使用实色背景，以获得更好的可读性和性能。

```css
/* 玻璃背景 - 仅在明确要求时使用 */
.glass-panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-xl);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.02),
    0 12px 24px rgba(0, 0, 0, 0.04);
}

@media (prefers-color-scheme: dark) {
  .glass-panel {
    background: rgba(28, 28, 30, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
```

### 卡片（默认 - 实色背景）

```css
.card {
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.04),
    0 4px 12px rgba(0, 0, 0, 0.04);
}

/* 分组样式卡片 */
.card-grouped {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.card-grouped-item {
  background: var(--bg-tertiary);
  padding: var(--space-4);
  border-bottom: 1px solid var(--separator);
}

.card-grouped-item:last-child {
  border-bottom: none;
}
```

### 输入框

```css
.input-field {
  width: 100%;
  min-height: 44px;
  padding: 12px 16px;
  font-family: var(--font-system);
  font-size: 17px;
  color: var(--label-primary);
  background: var(--bg-secondary);
  border: none;
  border-radius: var(--radius-md);
  outline: none;
  transition: box-shadow 0.2s ease;
}

.input-field:focus {
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.3);
}

.input-field::placeholder {
  color: var(--label-tertiary);
}
```

### 标签栏

标签栏用于在应用各版块之间进行顶层导航。使用填充样式的 SF Symbols，并始终显示文字标签。

**设计规则：**
- 位于屏幕底部（iOS 风格）
- 每个标签最小 44×44pt 触控目标
- 始终显示文字标签（禁止仅图标）
- 选中状态使用填充样式的 SF Symbols
- 支持通知角标（红色椭圆，白色文字）
- 不得隐藏或禁用标签按钮

```css
/* 标签栏容器 */
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49px;
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--bg-primary);
  border-top: 0.5px solid var(--separator);
}

/* 标签项 */
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 4px 12px;
  color: var(--system-gray);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-default);
}

.tab-item--active {
  color: var(--system-blue);
}

.tab-item__icon {
  font-size: 24px;
  margin-bottom: 2px;
}

.tab-item__label {
  font-family: var(--font-system);
  font-size: 10px;
  font-weight: 500;
}

/* 角标 */
.tab-item__badge {
  position: absolute;
  top: 2px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 12px;
  font-weight: 600;
  color: #FFFFFF;
  background: var(--system-red);
  border-radius: 9px;
  text-align: center;
  line-height: 18px;
}
```

### 工具栏

工具栏提供上下文相关的操作。将项目组织为三个区域：前导、居中、尾随。

**设计规则：**
- 三个区域：前导（返回/标题）、居中（工具）、尾随（操作）
- 最多 3 组项目
- 使用无边框的 SF Symbols
- 主要操作在尾随侧使用 `.prominent` 样式
- 返回按钮：圆形，仅显示符号（无文字）
- 标题：简洁，不超过 15 个字符

```css
/* 工具栏容器 */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 var(--space-4);
  background: var(--bg-primary);
  border-bottom: 0.5px solid var(--separator);
}

/* 工具栏区域 */
.toolbar__leading,
.toolbar__center,
.toolbar__trailing {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.toolbar__leading {
  min-width: 70px;
  justify-content: flex-start;
}

.toolbar__center {
  flex: 1;
  justify-content: center;
}

.toolbar__trailing {
  min-width: 70px;
  justify-content: flex-end;
}

/* 工具栏标题 */
.toolbar__title {
  font-family: var(--font-system);
  font-size: 17px;
  font-weight: 600;
  color: var(--label-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 工具栏按钮 */
.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-2);
  color: var(--system-blue);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.toolbar-btn:active {
  background: rgba(0, 122, 255, 0.1);
}

/* 返回按钮 - 圆形，仅符号 */
.toolbar-btn--back {
  width: 32px;
  height: 32px;
  min-width: 32px;
  padding: 0;
  border-radius: 50%;
}

/* 主要操作 - 突出样式 */
.toolbar-btn--prominent {
  font-weight: 600;
  background: var(--system-blue);
  color: #FFFFFF;
  border-radius: var(--radius-full);
  padding: 8px 16px;
}

.toolbar-btn--prominent:active {
  opacity: 0.9;
}
```

### 表单页（Sheet）

表单页在模态浮层中呈现限定范围的任务。支持多种高度档位和下滑关闭。

**设计规则：**
- 档位：`large`（100%）、`medium`（50%）
- 可调整大小的表单页需包含抓取指示器（36×5px）
- 完成按钮：右上角
- 取消按钮：左上角
- 半透明背景遮罩（rgba(0,0,0,0.4)）
- 同一时间仅显示一个表单页

```css
/* 表单页背景遮罩 */
.sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  opacity: 0;
  transition: opacity var(--duration-normal) var(--ease-default);
}

.sheet-backdrop--visible {
  opacity: 1;
}

/* 表单页容器 */
.sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  z-index: 101;
  transform: translateY(100%);
  transition: transform var(--duration-normal) var(--ease-default);
  max-height: calc(100vh - 44px);
  overflow: hidden;
}

.sheet--visible {
  transform: translateY(0);
}

/* 表单页档位 */
.sheet--medium {
  height: 50vh;
}

.sheet--large {
  height: calc(100vh - 44px);
}

/* 抓取指示器 */
.sheet__grabber {
  width: 36px;
  height: 5px;
  background: rgba(60, 60, 67, 0.3);
  border-radius: 2.5px;
  margin: 8px auto;
}

@media (prefers-color-scheme: dark) {
  .sheet__grabber {
    background: rgba(235, 235, 245, 0.3);
  }
}

/* 表单页头部 */
.sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);
  border-bottom: 0.5px solid var(--separator);
}

.sheet__cancel {
  color: var(--system-blue);
  font-size: 17px;
  background: none;
  border: none;
  cursor: pointer;
}

.sheet__done {
  color: var(--system-blue);
  font-size: 17px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
}

.sheet__title {
  font-family: var(--font-system);
  font-size: 17px;
  font-weight: 600;
  color: var(--label-primary);
}

/* 表单页内容 */
.sheet__content {
  padding: var(--space-4);
  overflow-y: auto;
}
```

### 警告框（Alert）

警告框用于传达需要立即关注的重要信息。应谨慎使用，并提供明确的操作选项。

**设计规则：**
- 仅用于重要信息（谨慎使用）
- 最多 3 个按钮
- 按钮标题：使用具体动词，避免使用「确定」
- 取消按钮：位于前导侧（堆叠布局时位于底部）
- 破坏性样式：仅用于非预期的破坏性操作
- 不得在应用启动时显示警告框

```css
/* 警告框背景遮罩 */
.alert-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

/* 警告框容器 */
.alert {
  width: 270px;
  background: var(--bg-primary);
  border-radius: 14px;
  overflow: hidden;
  text-align: center;
}

@media (prefers-color-scheme: dark) {
  .alert {
    background: var(--bg-tertiary);
  }
}

/* 警告框内容 */
.alert__content {
  padding: 20px 16px;
}

.alert__title {
  font-family: var(--font-system);
  font-size: 17px;
  font-weight: 600;
  color: var(--label-primary);
  margin-bottom: 4px;
}

.alert__message {
  font-family: var(--font-system);
  font-size: 13px;
  color: var(--label-primary);
  line-height: 1.4;
}

/* 警告框按钮 - 横向（2 个按钮） */
.alert__buttons {
  display: flex;
  border-top: 0.5px solid var(--separator);
}

.alert__btn {
  flex: 1;
  padding: 12px;
  font-family: var(--font-system);
  font-size: 17px;
  color: var(--system-blue);
  background: transparent;
  border: none;
  cursor: pointer;
}

.alert__btn:not(:last-child) {
  border-right: 0.5px solid var(--separator);
}

.alert__btn:active {
  background: var(--bg-secondary);
}

/* 按钮变体 */
.alert__btn--cancel {
  font-weight: 400;
}

.alert__btn--default {
  font-weight: 600;
}

.alert__btn--destructive {
  color: var(--system-red);
}

/* 警告框按钮 - 堆叠（3 个及以上按钮） */
.alert__buttons--stacked {
  flex-direction: column;
}

.alert__buttons--stacked .alert__btn {
  border-right: none;
  border-bottom: 0.5px solid var(--separator);
}

.alert__buttons--stacked .alert__btn:last-child {
  border-bottom: none;
}
```

### 列表和表格

列表以一致的结构展示数据行。区分导航类附件（展开指示器）和信息类附件（信息按钮）。

**设计规则：**
- 最小行高：44px
- 信息按钮（ⓘ）：展示详情，不触发导航
- 展开指示器（>）：导航至子视图
- 分组样式：10px 圆角，8px/16px 边距
- 导航：持续高亮；选项：短暂高亮 + 勾选标记
- 内嵌分隔线从前导内容之后开始（60px）

```css
/* 列表容器 - 分组样式 */
.list {
  background: var(--bg-secondary);
}

.list-section {
  background: var(--bg-primary);
  border-radius: 10px;
  margin: var(--space-2) var(--space-4);
  overflow: hidden;
}

/* 分组标题 */
.list-section__header {
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-system);
  font-size: 13px;
  font-weight: 400;
  color: var(--label-secondary);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

/* 列表项 */
.list-item {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 12px var(--space-4);
  background: var(--bg-primary);
  position: relative;
}

/* 分隔线 - 全宽 */
.list-item:not(:last-child) {
  border-bottom: 0.5px solid var(--separator);
}

/* 分隔线 - 内嵌（前导图片之后） */
.list-item--inset:not(:last-child) {
  border-bottom: none;
}

.list-item--inset:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 60px;
  right: 0;
  bottom: 0;
  border-bottom: 0.5px solid var(--separator);
}

/* 列表项内容 */
.list-item__leading {
  width: 40px;
  height: 40px;
  margin-right: var(--space-3);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.list-item__content {
  flex: 1;
  min-width: 0;
}

.list-item__title {
  font-family: var(--font-system);
  font-size: 17px;
  color: var(--label-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-item__subtitle {
  font-family: var(--font-system);
  font-size: 15px;
  color: var(--label-secondary);
}

.list-item__value {
  font-family: var(--font-system);
  font-size: 17px;
  color: var(--label-secondary);
  margin-left: auto;
}

/* 附件 */
.list-item__accessory {
  margin-left: var(--space-2);
  color: var(--label-tertiary);
}

/* 展开指示器 - 导航 */
.list-item__disclosure {
  font-size: 14px;
  color: var(--label-quaternary);
}

/* 信息按钮 - 详情 */
.list-item__info-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--system-blue);
  color: var(--system-blue);
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
}

/* 勾选标记 - 选中 */
.list-item__checkmark {
  color: var(--system-blue);
  font-size: 18px;
  font-weight: 600;
}

/* 选中状态 */
.list-item--selected {
  background: var(--system-blue);
}

.list-item--selected .list-item__title,
.list-item--selected .list-item__subtitle {
  color: #FFFFFF;
}

/* 交互状态 */
.list-item:active {
  background: var(--bg-secondary);
}
```

---

## 动画指南

### 缓动函数

```css
:root {
  /* Apple 推荐的缓动曲线 */
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-in: cubic-bezier(0.42, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.58, 1);
  --ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);

  /* 类弹簧缓动 */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### 时长比例尺

```css
:root {
  --duration-instant: 100ms;  /* 微交互 */
  --duration-fast: 200ms;     /* 悬停、聚焦状态 */
  --duration-normal: 300ms;   /* 标准过渡 */
  --duration-slow: 500ms;     /* 复杂动画 */
}
```

### 交互反馈

```css
/* 按压反馈 */
.interactive {
  transition: transform var(--duration-instant) var(--ease-out);
}

.interactive:active {
  transform: scale(0.97);
}

/* 悬停光晕 */
.interactive:hover {
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.15);
}
```

---

## SF Symbols 集成

### 渲染模式

1. **单色（Monochrome）：** 所有图层使用单一颜色
2. **层级（Hierarchical）：** 通过透明度变化营造深度
3. **调色板（Palette）：** 每层自定义颜色
4. **多色（Multicolor）：** Apple 内置符号颜色

### 使用指南

- **工具栏/导航：** 使用轮廓变体
- **标签栏：** 使用填充变体
- **匹配文字大小：** 符号自动与 SF 字体对齐
- **提供文字替代：** 始终包含 aria-label

### 网页实现（图标字体替代方案）

```html
<!-- 通过系统字体使用 SF Symbols -->
<span class="sf-symbol" aria-label="Settings">􀣋</span>

<!-- 或使用等效的系统图标 -->
<svg class="icon" aria-hidden="true">
  <use href="#icon-gear"></use>
</svg>
```

---

## 无障碍要求

### 颜色对比度
- **普通文字：** 最低 4.5:1（WCAG AA）
- **大号文字：** 最低 3:1
- **交互元素：** 状态清晰可辨

### 动效
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 语义化 HTML
```html
<!-- 始终使用语义化元素 -->
<button type="button">Action</button>
<nav aria-label="Main navigation">...</nav>
<main role="main">...</main>
```

---

## 输出格式

生成 Apple 风格 UI 代码时，始终包含：

1. **完整、可运行的代码**（CSS/React/Vue）
2. **浅色/深色模式支持**（通过 CSS 自定义属性）
3. **设计说明**（解释 HIG 合规性）
4. **响应式断点**（适配不同设备）
5. **无障碍属性**（aria-*、role 等）

### 默认行为

- **默认使用实色背景**，以获得更好的可读性
- **仅在用户明确要求时使用玻璃/模糊效果**
- **始终提供非玻璃效果的降级方案**，以兼容不支持 backdrop-filter 的浏览器

### 示例输出结构

```jsx
/**
 * 符合 Apple HIG 的组件
 *
 * 设计决策：
 * - 使用 SF Pro 系统字体栈，营造原生感
 * - 44pt 最小触控目标，满足无障碍要求
 * - 主要操作使用胶囊形状（HIG 推荐）
 * - 实色背景，确保最佳可读性
 * - 支持 prefers-color-scheme 自动主题切换
 */

const AppleButton = ({ children, variant = 'primary', ...props }) => {
  return (
    <button
      className={`btn btn-${variant}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

---

## 最佳实践检查清单

在最终确定任何设计输出前，请验证：

- [ ] **字体：** 使用 SF Pro，并遵循正确的字号阈值
- [ ] **颜色：** 系统颜色，含浅色/深色变体
- [ ] **间距：** 遵循 8pt 网格
- [ ] **触控目标：** 最小 44×44pt
- [ ] **圆角：** 保持同心圆关系
- [ ] **动画：** 使用 Apple 标准缓动曲线
- [ ] **无障碍：** 符合 WCAG AA，支持减少动效
- [ ] **一致性：** 符合平台惯例
- [ ] **背景：** 默认实色，仅在要求时使用玻璃效果

---

## 参考资源

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines)
- [Apple Design Resources](https://developer.apple.com/design/resources/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [Apple Fonts](https://developer.apple.com/fonts/)

---

*本技能确保 Claude Code 产出符合 Apple 严苛设计标准的界面，打造统一、无障碍且美观的用户体验。*
