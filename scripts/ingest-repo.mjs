import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const sourceRoot = path.join(root, "source-repo");
const docsRoot = path.join(sourceRoot, "docs");
const sourceImages = path.join(sourceRoot, "data", "images");
const siteRoot = path.join(root, "site");
const libraryRoot = path.join(siteRoot, "library");
const imageOutputRoot = path.join(libraryRoot, "images");

const categoryMeta = [
  { id: "ui", label: "UI与界面", description: "界面截图、社媒页面、产品交互、直播界面。", keywords: ["界面", "截图", "dashboard", "直播", "app", "社媒", "交互"] },
  { id: "infographic", label: "图表与信息可视化", description: "信息图、百科图、流程图、结构图、图谱。", keywords: ["信息图", "可视化", "图表", "图谱", "百科", "流程", "atlas", "infographic", "diagram"] },
  { id: "poster", label: "海报与排版", description: "海报、标题版式、宣传页、封面。", keywords: ["海报", "版式", "poster", "封面", "宣传"] },
  { id: "ecommerce", label: "商品与电商", description: "商品图、电商主图、品牌卖点展示。", keywords: ["电商", "商品", "主图", "hero image", "卖点", "包装"] },
  { id: "brand", label: "品牌与标志", description: "Logo、品牌识别、视觉系统。", keywords: ["品牌", "logo", "标志", "徽标", "识别", "identity"] },
  { id: "architecture", label: "建筑与空间", description: "室内空间、建筑渲染、场景空间。", keywords: ["建筑", "空间", "室内", "cabin", "interior", "render", "spatial"] },
  { id: "photography", label: "摄影与写实", description: "写实摄影、人像、街拍、棚拍。", keywords: ["摄影", "写实", "人像", "portrait", "35mm", "film", "photo", "纪实"] },
  { id: "illustration", label: "插画与艺术", description: "插画、绘本、艺术创作、日漫风。", keywords: ["插画", "艺术", "anime", "illustration", "绘制", "水彩", "厚涂"] },
  { id: "character", label: "人物与角色", description: "人设卡、角色设定、卡牌角色。", keywords: ["角色", "人设", "设定图", "character", "卡牌", "角色资料"] },
  { id: "narrative", label: "场景与叙事", description: "分镜、电影感场景、叙事画面。", keywords: ["叙事", "分镜", "故事", "电影感", "场景图", "scene", "storyboard"] },
  { id: "history", label: "历史与古风题材", description: "古风、文博、历史图鉴。", keywords: ["古风", "历史", "文博", "博物馆", "诗词", "国风", "文物"] },
  { id: "publishing", label: "文档与出版物", description: "书刊、长页、出版版式。", keywords: ["文档", "出版", "杂志", "书籍", "出版物", "报纸"] },
  { id: "other", label: "其他应用场景", description: "综合类、难归类的混合场景。", keywords: [] }
];

const teachingCollections = [
  {
    id: "starter-workshop",
    title: "GPT Image 入门工作坊",
    audience: "第一次系统讲解 GPT Image 的团队分享",
    duration: "90 分钟",
    goals: ["理解结构化 prompt 思路", "会从案例倒推模板", "能现场写出可复用 prompt"],
    guideIds: ["vision", "use-workflow", "teaching-mode"],
    templateIds: ["ui", "infographic", "poster", "photography"]
  },
  {
    id: "ui-clinic",
    title: "界面与信息图专项课",
    audience: "产品、设计、内容团队",
    duration: "60 分钟",
    goals: ["学会 UI 截图 prompt", "学会信息图模块化描述", "减少文字乱码与版式跑偏"],
    guideIds: ["builder-notes", "use-workflow"],
    templateIds: ["ui", "infographic", "brand"]
  },
  {
    id: "visual-storytelling",
    title: "海报、摄影与叙事专项课",
    audience: "品牌、内容营销、社媒团队",
    duration: "75 分钟",
    goals: ["拆解主视觉", "控制氛围和镜头语言", "做出可复用的品牌视觉 prompt"],
    guideIds: ["vision", "teaching-mode"],
    templateIds: ["poster", "photography", "illustration", "narrative"]
  }
];

function ensureDir(target) {
  return fs.mkdir(target, { recursive: true });
}

function stripQuotes(value) {
  return value.replace(/^["'`]+|["'`]+$/g, "");
}

function cleanText(value) {
  return value.replace(/\r/g, "").trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function classifyCase(title, prompt) {
  const haystack = `${title}\n${prompt}`.toLowerCase();
  for (const category of categoryMeta) {
    if (category.id === "other") continue;
    if (category.keywords.some((keyword) => haystack.includes(keyword.toLowerCase()))) {
      return category.id;
    }
  }
  return "other";
}

function firstParagraph(markdown) {
  const blocks = markdown
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => !item.startsWith("```") && !item.startsWith("#") && !item.startsWith(">"));
  return blocks[0] || "";
}

function buildCaseSummary(title, source, categoryId, rawMarkdown) {
  const cleaned = rawMarkdown
    .replace(/^###.*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\*\*来源：\*\*.*$/gm, "")
    .replace(/\*\*提示词：\*\*[\s\S]*?```(?:text|json)?\n[\s\S]*?```/gm, "")
    .replace(/\*{3,}/g, "");
  const summary = firstParagraph(cleaned);
  if (summary) return summary;
  const category = categoryMeta.find((item) => item.id === categoryId);
  return `${title}。来源：${source}。适合作为${category?.label || "相关"}场景的参考案例。`;
}

function sectionBetween(markdown, startHeading, endHeading) {
  const start = markdown.indexOf(startHeading);
  if (start === -1) return "";
  const end = endHeading ? markdown.indexOf(endHeading, start) : -1;
  return cleanText(markdown.slice(start + startHeading.length, end === -1 ? undefined : end));
}

async function parseCases(fileName, volume) {
  const markdown = cleanText(await fs.readFile(path.join(docsRoot, fileName), "utf8"));
  const blocks = [...markdown.matchAll(/<a name="case-(\d+)"><\/a>\s*([\s\S]*?)(?=<a name="case-\d+"><\/a>|$)/g)];
  return blocks.map((match) => {
    const caseNumber = Number(match[1]);
    const body = match[2];
    const titleMatch = body.match(/^### 例\s*\d+：(.+)$/m);
    const imageMatch = body.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    const sourceMatch = body.match(/\*\*来源：\*\*\s*(.+)$/m);
    const promptMatch = body.match(/\*\*提示词：\*\*[\s\S]*?```(?:text|json)?\n([\s\S]*?)```/);
    const title = cleanText(titleMatch ? titleMatch[1] : `例 ${caseNumber}`);
    const prompt = cleanText(promptMatch ? promptMatch[1] : "");
    const categoryId = classifyCase(title, prompt);
    const image = imageMatch ? path.basename(imageMatch[2]) : "";
    const source = sourceMatch ? cleanText(sourceMatch[1]) : "未标注";
    const rawMarkdown = cleanText(body);

    return {
      id: `case-${caseNumber}`,
      number: caseNumber,
      slug: `case-${caseNumber}-${slugify(title)}`,
      title,
      summary: buildCaseSummary(title, source, categoryId, rawMarkdown),
      image,
      source,
      categoryId,
      prompt,
      volume,
      sourceDoc: fileName,
      sourcePath: `docs/${fileName}#case-${caseNumber}`,
      rawMarkdown
    };
  });
}

async function parseTemplates() {
  const markdown = cleanText(await fs.readFile(path.join(docsRoot, "templates.md"), "utf8"));
  const matches = [...markdown.matchAll(/^### (.+)$/gm)];
  const templates = [];

  for (let index = 0; index < matches.length; index += 1) {
    const current = matches[index];
    const next = matches[index + 1];
    const name = cleanText(current[1]);
    const start = current.index + current[0].length;
    const end = next ? next.index : markdown.length;
    const body = cleanText(markdown.slice(start, end));
    const regularMatch = body.match(/\*\*常规模板\*\*[\s\S]*?```text\n([\s\S]*?)```/);
    const jsonMatch = body.match(/\*\*JSON 进阶模板（推荐给 Agent 调用）\*\*[\s\S]*?```json\n([\s\S]*?)```/);
    const pitfallsSection = body.match(/\*\*避坑指南\*\*([\s\S]*)/);
    const pitfalls = pitfallsSection
      ? [...pitfallsSection[1].matchAll(/^- \*\*(.+?)\*\*：(.+)$/gm)].map((item) => ({
          title: cleanText(item[1]),
          detail: cleanText(item[2])
        }))
      : [];

    const category = categoryMeta.find((item) => item.label === name) || categoryMeta.find((item) => item.id === "other");
    let jsonTemplate = {};
    if (jsonMatch) {
      try {
        jsonTemplate = JSON.parse(jsonMatch[1]);
      } catch {
        jsonTemplate = { raw: cleanText(jsonMatch[1]) };
      }
    }

    templates.push({
      id: category.id,
      slug: slugify(name),
      name,
      categoryId: category.id,
      description: category.description,
      regularTemplate: cleanText(regularMatch ? regularMatch[1] : ""),
      jsonTemplate,
      jsonTemplateRaw: cleanText(jsonMatch ? jsonMatch[1] : ""),
      pitfalls,
      sourcePath: "docs/templates.md",
      rawMarkdown: body
    });
  }

  return templates;
}

async function parseGuides(templates) {
  const readme = cleanText(await fs.readFile(path.join(sourceRoot, "README.md"), "utf8"));
  const disclaimer = cleanText(await fs.readFile(path.join(docsRoot, "disclaimer.md"), "utf8"));
  const templatesDoc = cleanText(await fs.readFile(path.join(docsRoot, "templates.md"), "utf8"));

  const guides = [
    {
      id: "vision",
      title: "为什么要把 Prompt 当成结构化资产",
      summary: "适合做开场介绍，讲清楚为什么这个站点不是单纯的案例收藏夹。",
      content: sectionBetween(readme, "## ⚡️ 项目愿景", "## 📌 快速入口"),
      sourcePath: "README.md"
    },
    {
      id: "use-workflow",
      title: "如何从案例、模板到最终 prompt",
      summary: "适合讲 demo 流程，帮助听众理解先找案例、再套模板、再填业务变量的节奏。",
      content: sectionBetween(readme, "## 🧭 怎么用这个库", "## 📣 声明与补充"),
      sourcePath: "README.md"
    },
    {
      id: "builder-notes",
      title: "工业级模板与防坑指南",
      summary: "适合带练 Builder，用模板和避坑点讲什么叫好 prompt。",
      content: sectionBetween(templatesDoc, "## 🧩 工业级提示词模板与防坑指南", "### UI与界面"),
      sourcePath: "docs/templates.md"
    },
    {
      id: "rights",
      title: "来源、版权与使用说明",
      summary: "适合上课时交代素材来源边界，也方便后面导出课程讲义。",
      content: disclaimer,
      sourcePath: "docs/disclaimer.md"
    },
    {
      id: "teaching-mode",
      title: "如何把 Wiki 当成课程站来讲",
      summary: "这是本站附加的教学模式说明，方便你以后导出 Obsidian 笔记或讲义。",
      content: [
        "先按课程目标选 2-4 个模板作为主线。",
        "每个模板下面挂 2-3 个案例，讲结构、讲变量、讲避坑。",
        "导出时优先导出 Markdown，保留标题、案例、模板、练习题。",
        "现场演示时从 Builder 开始，再跳转案例页做拆解，最后回到模板页总结。"
      ].join("\n"),
      sourcePath: "local"
    }
  ];

  return guides.map((guide) => ({
    ...guide,
    relatedTemplateIds: templates.slice(0, 4).map((item) => item.id)
  }));
}

async function copyDirectory(source, target) {
  await ensureDir(target);
  const entries = await fs.readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(from, to);
    } else {
      await fs.copyFile(from, to);
    }
  }
}

async function imageCount(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let total = 0;
  for (const entry of entries) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += await imageCount(target);
    } else {
      total += 1;
    }
  }
  return total;
}

async function main() {
  await ensureDir(libraryRoot);
  await ensureDir(imageOutputRoot);

  const [part1, part2, templates] = await Promise.all([
    parseCases("gallery-part-1.md", "Part 1"),
    parseCases("gallery-part-2.md", "Part 2"),
    parseTemplates()
  ]);

  await copyDirectory(sourceImages, imageOutputRoot);
  const guides = await parseGuides(templates);
  const cases = [...part1, ...part2].sort((a, b) => a.number - b.number);

  const catalog = {
    generatedAt: new Date().toISOString(),
    sourceRepo: "https://github.com/freestylefly/awesome-gpt-image-2",
    stats: {
      caseCount: cases.length,
      templateCount: templates.length,
      guideCount: guides.length,
      imageCount: await imageCount(imageOutputRoot)
    },
    categories: categoryMeta.map((category) => ({
      ...category,
      count: cases.filter((item) => item.categoryId === category.id).length,
      templateCount: templates.filter((item) => item.categoryId === category.id).length
    })),
    cases,
    templates,
    guides,
    teachingCollections
  };

  await fs.writeFile(path.join(libraryRoot, "catalog.json"), JSON.stringify(catalog, null, 2), "utf8");
  await fs.copyFile(path.join(sourceImages, "banner.svg"), path.join(imageOutputRoot, "banner.svg"));
  console.log(`Ingested ${catalog.stats.caseCount} cases, ${catalog.stats.templateCount} templates and ${catalog.stats.imageCount} images.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
