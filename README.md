# GPT Image Wiki

一个围绕 GPT Image 2 的本地 Wiki 网站与教学工具站。  
A local wiki site and teaching toolkit built around GPT Image 2.

---

## 中文说明

### 这是什么

这个项目把 `awesome-gpt-image-2` 里的案例、模板和图片素材整理成本地可用的网站，方便你做三类事情：

1. 查案例：快速浏览不同出图类型的真实案例
2. 找模板：按类型查看结构化 prompt 模板
3. 上课演示：用课程模式和 Builder 现场讲解怎么写 prompt

它不是单纯的图片画廊，而是一个面向实际使用的 GPT Image Wiki。

### 当前包含的内容

- 本地案例库
- 模板库
- Prompt Builder
- 课程模式
- 本地图片资源库
- 数据入库脚本

当前站点已整理并入库：

- 335 个案例
- 13 个模板
- 339 张图片

### 核心功能

#### 1. 总览页

- 展示站点统计
- 快速进入案例、模板、Builder、课程
- 作为教学入口和内容地图

#### 2. 案例库

- 浏览 GPT Image 2 案例
- 查看案例标题、分类、来源和 prompt
- 适合上课时拿真实图来讲

#### 3. 模板库

- 按类型查看模板
- 同时展示自然语言模板和 JSON 模板
- 附带避坑说明

#### 4. Prompt Builder

- 选择类型后填写变量
- 自动生成自然语言 Prompt
- 自动生成 JSON Prompt
- 适合课堂现场演示“怎么把模板改成自己的业务场景”

#### 5. 课程模式

- 按“指南 -> 模板 -> 案例 -> Builder”组织讲课路径
- 适合内部分享、工作坊、产品培训
- 支持导出课程 Markdown

### 项目结构

```text
gpt-image2/
├─ README.md
├─ package.json
├─ server.mjs                  # 本地静态站服务
├─ scripts/
│  └─ ingest-repo.mjs          # 从 source-repo 入库生成 catalog.json
├─ site/
│  ├─ index.html               # 站点入口
│  ├─ app.js                   # 前端交互逻辑
│  ├─ styles.css               # 站点样式
│  └─ library/
│     ├─ catalog.json          # 入库后的结构化数据
│     └─ images/               # 本地图片资源
└─ source-repo/                # 原始抓取仓库（默认不提交）
```

### 如何启动

在项目根目录运行：

```powershell
node server.mjs
```

如果 `5173` 端口被占用，服务会自动尝试下一个端口，比如 `5174`、`5190`。

启动后打开浏览器访问：

```text
http://127.0.0.1:5173
```

或终端打印出来的实际端口地址。

### 如何重新入库

如果你更新了 `source-repo` 内容，重新生成网站数据：

```powershell
node scripts/ingest-repo.mjs
```

这个脚本会：

- 解析案例 markdown
- 解析模板 markdown
- 复制图片到 `site/library/images/`
- 生成 `site/library/catalog.json`

### 适合怎么使用

#### 自己查资料

- 用案例页看图
- 用模板页找 prompt 结构
- 用 Builder 快速改成自己的场景

#### 拿来上课

推荐讲法：

1. 从课程页进入
2. 先讲指南页的方法论
3. 再讲模板页里的结构化 prompt
4. 然后看案例
5. 最后在 Builder 里现场改 prompt

### 数据来源说明

本项目的原始案例与图片来源于抓取下来的 `awesome-gpt-image-2` 仓库内容。  
当前仓库主要同步的是：

- 已生成的网站
- 结构化数据
- 本地图片资源
- 站点与入库脚本

默认不提交原始 `source-repo/` 仓库，以避免嵌套 git 仓库和无意义的重复同步。

---

## English

### What this project is

This project turns the `awesome-gpt-image-2` materials into a local wiki site and teaching-oriented tool for GPT Image 2.

It is designed for three practical use cases:

1. Browse real image-generation cases
2. Reuse structured prompt templates
3. Teach prompt-writing workflows with a live Builder

This is not just a gallery. It is a GPT Image knowledge base and demo site.

### What is included

- Local case library
- Template library
- Prompt Builder
- Teaching mode
- Local image library
- Data ingestion script

Current indexed content:

- 335 cases
- 13 templates
- 339 images

### Main features

#### 1. Dashboard

- Site overview and statistics
- Entry points to cases, templates, builder, and teaching mode

#### 2. Case Library

- Browse real GPT Image 2 examples
- Inspect titles, categories, sources, and prompts
- Useful for teaching with real examples

#### 3. Template Library

- Browse templates by category
- Includes both natural-language prompts and JSON-style prompts
- Includes prompt pitfalls and guidance

#### 4. Prompt Builder

- Choose a content type
- Fill in structured variables
- Generate a natural-language prompt
- Generate a JSON prompt

#### 5. Teaching Mode

- Organized as: Guide -> Template -> Case -> Builder
- Useful for workshops, internal sharing, and training
- Supports Markdown export for lessons

### Project structure

```text
gpt-image2/
├─ README.md
├─ package.json
├─ server.mjs
├─ scripts/
│  └─ ingest-repo.mjs
├─ site/
│  ├─ index.html
│  ├─ app.js
│  ├─ styles.css
│  └─ library/
│     ├─ catalog.json
│     └─ images/
└─ source-repo/
```

### Run locally

From the project root:

```powershell
node server.mjs
```

If port `5173` is already in use, the server automatically falls back to the next available port.

Then open:

```text
http://127.0.0.1:5173
```

Or use the actual port printed in the terminal.

### Rebuild the data library

If you update the source content, regenerate the local catalog with:

```powershell
node scripts/ingest-repo.mjs
```

This script:

- parses case markdown
- parses template markdown
- copies images into `site/library/images/`
- generates `site/library/catalog.json`

### Recommended workflow

For self-use:

- browse cases
- inspect prompt templates
- adapt them with Builder

For teaching:

1. open Teaching Mode
2. start from the guide
3. explain the structured templates
4. inspect real cases
5. finish with a live Builder demo

### Source note

The original cases and images are derived from the locally cloned `awesome-gpt-image-2` source repository.

This repository mainly tracks:

- the generated website
- the structured catalog
- local image assets
- the website code
- the ingestion script

The raw `source-repo/` directory is ignored by default to avoid nested git repositories and unnecessary duplication.
