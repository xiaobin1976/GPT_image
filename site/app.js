const state = {
  catalog: null,
  activeView: "dashboard",
  query: "",
  category: "all",
  selectedCaseId: null,
  selectedTemplateId: "ui",
  selectedLessonId: "starter-workshop",
  selectedGuideId: "vision",
  builderCategory: "ui",
  builderValues: {}
};

const builderConfig = {
  ui: {
    fields: [
      { key: "product", label: "产品类型", placeholder: "AI 写作 App" },
      { key: "platform", label: "平台", placeholder: "iOS" },
      { key: "features", label: "核心功能", placeholder: "写作、润色、知识库问答" },
      { key: "style", label: "视觉风格", placeholder: "极简、深色、专业" },
      { key: "colors", label: "主辅色", placeholder: "墨绿 + 米白" },
      { key: "layout", label: "布局", placeholder: "卡片流 + 底部导航" },
      { key: "ratio", label: "比例", placeholder: "9:16" },
      { key: "textRule", label: "文字约束", placeholder: "所有中文准确可读" }
    ],
    compose(values) {
      return `为${values.product}生成一张${values.platform}界面图。
核心功能：${values.features}。
视觉风格：${values.style}，主辅色：${values.colors}。
布局：${values.layout}，信息层级清晰，留白充足。
输出：高保真 UI 截图，比例 ${values.ratio}，并且${values.textRule}。`;
    },
    toJson(values) {
      return {
        type: "UI Screenshot",
        platform: values.platform,
        product: values.product,
        layout: values.layout,
        style: {
          theme: values.style,
          primary_palette: values.colors
        },
        content: {
          features: values.features
        },
        constraints: `${values.textRule}; ${values.ratio} aspect ratio`
      };
    }
  },
  infographic: {
    fields: [
      { key: "topic", label: "主题", placeholder: "城市生命系统图谱" },
      { key: "audience", label: "目标读者", placeholder: "大众读者" },
      { key: "modules", label: "模块数量", placeholder: "6 个模块" },
      { key: "chartType", label: "图表类型", placeholder: "关系图 + 流程图" },
      { key: "style", label: "风格", placeholder: "工程白皮书 + 科学图谱" },
      { key: "colors", label: "色彩", placeholder: "低饱和分区色" },
      { key: "background", label: "背景", placeholder: "浅色纸张纹理" },
      { key: "textRule", label: "文字约束", placeholder: "中文清晰，标签不乱码" }
    ],
    compose(values) {
      return `生成${values.topic}信息图，目标读者为${values.audience}。
结构：标题区 + ${values.modules}。
图表类型：${values.chartType}。
风格：${values.style}，色彩：${values.colors}，背景：${values.background}。
输出：结构层级清晰、可读性高，并且${values.textRule}。`;
    },
    toJson(values) {
      return {
        type: "Infographic",
        topic: values.topic,
        audience: values.audience,
        structure: {
          modules: values.modules,
          chart_type: values.chartType
        },
        style: {
          aesthetic: values.style,
          colors: values.colors,
          background: values.background
        },
        constraints: values.textRule
      };
    }
  },
  poster: {
    fields: [
      { key: "subject", label: "主题", placeholder: "AI 工具周报" },
      { key: "headline", label: "主标题", placeholder: "FUTURE TOOLS" },
      { key: "subheading", label: "副标题", placeholder: "一周 AI 产品观察" },
      { key: "mainVisual", label: "主视觉", placeholder: "霓虹折射的机械花朵" },
      { key: "layout", label: "版式", placeholder: "居中构图" },
      { key: "style", label: "风格", placeholder: "未来感、克制、高对比" },
      { key: "palette", label: "色彩", placeholder: "黑、银、荧光绿" },
      { key: "mood", label: "氛围", placeholder: "冷静、锐利、科技展览感" }
    ],
    compose(values) {
      return `设计一张${values.subject}海报。
主视觉：${values.mainVisual}。
标题文案：${values.headline}；副标题：${values.subheading}。
版式：${values.layout}，风格：${values.style}。
色彩：${values.palette}，氛围：${values.mood}。
输出：高分辨率海报，标题文字准确显示。`;
    },
    toJson(values) {
      return {
        type: "Poster",
        subject: values.subject,
        typography: {
          headline: values.headline,
          subheading: values.subheading,
          layout: values.layout
        },
        visuals: {
          main_visual: values.mainVisual,
          style: values.style,
          color_palette: values.palette
        },
        vibe: values.mood
      };
    }
  },
  ecommerce: {
    fields: [
      { key: "product", label: "商品", placeholder: "无线降噪耳机" },
      { key: "sellingPoints", label: "卖点", placeholder: "降噪、长续航、轻量化" },
      { key: "scene", label: "场景", placeholder: "纯色棚拍" },
      { key: "camera", label: "镜头", placeholder: "3/4 侧前方特写" },
      { key: "materials", label: "材质", placeholder: "磨砂黑 + 金属边" },
      { key: "lighting", label: "灯光", placeholder: "柔光主灯 + 轮廓光" },
      { key: "badges", label: "文案元素", placeholder: "NEW / 299" },
      { key: "quality", label: "质感要求", placeholder: "商业摄影级别，纹理真实" }
    ],
    compose(values) {
      return `生成${values.product}电商主图，卖点为${values.sellingPoints}。
场景：${values.scene}；镜头：${values.camera}。
材质细节：${values.materials}；灯光：${values.lighting}。
附加元素：${values.badges}。
输出：${values.quality}。`;
    },
    toJson(values) {
      return {
        type: "E-commerce Hero Image",
        product: {
          name: values.product,
          selling_points: values.sellingPoints,
          material: values.materials
        },
        setting: {
          background: values.scene,
          camera: values.camera,
          lighting: values.lighting
        },
        copywriting: {
          badges: values.badges
        },
        constraints: values.quality
      };
    }
  },
  brand: {
    fields: [
      { key: "brand", label: "品牌名", placeholder: "Nova Dynamics" },
      { key: "industry", label: "行业", placeholder: "AI 工具" },
      { key: "keywords", label: "关键词", placeholder: "可信、极简、未来感" },
      { key: "direction", label: "Logo 方向", placeholder: "几何字标" },
      { key: "palette", label: "主辅色", placeholder: "电光蓝 + 纯白" },
      { key: "deliverables", label: "交付物", placeholder: "Logo、辅助图形、名片示意" },
      { key: "style", label: "风格", placeholder: "现代、企业级、平面矢量" }
    ],
    compose(values) {
      return `为${values.brand}设计品牌视觉方案。
行业：${values.industry}；品牌关键词：${values.keywords}。
Logo 方向：${values.direction}。
配色：${values.palette}。
包含：${values.deliverables}。
风格：${values.style}，纯白背景，便于后期扩展。`;
    },
    toJson(values) {
      return {
        type: "Brand Identity Design",
        brand: {
          name: values.brand,
          industry: values.industry,
          keywords: values.keywords.split("、")
        },
        deliverables: values.deliverables.split("、"),
        style: values.style,
        constraints: `Pure white background, palette ${values.palette}`
      };
    }
  },
  architecture: {
    fields: [
      { key: "space", label: "空间类型", placeholder: "现代木屋客厅" },
      { key: "function", label: "用途", placeholder: "会客 + 休闲" },
      { key: "materials", label: "材质", placeholder: "混凝土、木材、玻璃" },
      { key: "structure", label: "空间结构", placeholder: "开敞布局" },
      { key: "lighting", label: "光线", placeholder: "黄金时刻，自然光 + 暖灯" },
      { key: "camera", label: "视角", placeholder: "Eye-level perspective" },
      { key: "environment", label: "环境", placeholder: "雪松森林外景" }
    ],
    compose(values) {
      return `生成${values.space}设计效果图，功能定位为${values.function}。
材质：${values.materials}；空间结构：${values.structure}。
光线：${values.lighting}；视角：${values.camera}。
环境：${values.environment}。
输出：高写实建筑空间渲染图。`;
    },
    toJson(values) {
      return {
        type: "Architectural Visualization",
        space: {
          type: values.space,
          function: values.function,
          materials: values.materials,
          structure: values.structure
        },
        environment: values.environment,
        camera: {
          angle: values.camera,
          lighting: values.lighting
        }
      };
    }
  },
  photography: {
    fields: [
      { key: "subject", label: "拍摄主体", placeholder: "深夜便利店里的年轻女生" },
      { key: "setting", label: "场景", placeholder: "霓虹反射的便利店门口" },
      { key: "camera", label: "摄影参数", placeholder: "35mm, f/1.4, documentary" },
      { key: "lighting", label: "光线", placeholder: "冷色荧光 + 红蓝霓虹" },
      { key: "mood", label: "情绪", placeholder: "暧昧、克制、电影感" },
      { key: "detail", label: "细节要求", placeholder: "肤质真实、胶片颗粒、微瑕疵" }
    ],
    compose(values) {
      return `拍摄主题：${values.subject}，场景为${values.setting}。
摄影参数风格：${values.camera}。
光线：${values.lighting}；情绪：${values.mood}。
细节要求：${values.detail}。
输出：高写实摄影风格图像。`;
    },
    toJson(values) {
      return {
        type: "Hyper-realistic Photography",
        subject: values.subject,
        setting: values.setting,
        camera_specs: {
          style: values.camera,
          lighting: values.lighting
        },
        mood: values.mood,
        detail: values.detail
      };
    }
  },
  illustration: {
    fields: [
      { key: "theme", label: "题材", placeholder: "奇幻旅人" },
      { key: "subject", label: "主角", placeholder: "背着灯塔的飞鲸" },
      { key: "style", label: "画风", placeholder: "日系唯美奇幻" },
      { key: "linework", label: "线条", placeholder: "细腻柔和" },
      { key: "palette", label: "配色", placeholder: "天空蓝、草木绿、奶油白" },
      { key: "background", label: "背景", placeholder: "云海与远山" },
      { key: "composition", label: "构图", placeholder: "中景，大场景纵深" }
    ],
    compose(values) {
      return `创作${values.theme}插画，主角为${values.subject}。
画风：${values.style}；线条：${values.linework}。
配色：${values.palette}；背景：${values.background}。
构图：${values.composition}。
输出：可用于封面或社媒发布的高质量插画。`;
    },
    toJson(values) {
      return {
        type: "Artistic Illustration",
        theme: values.theme,
        subject: values.subject,
        art_style: values.style,
        linework: values.linework,
        palette: values.palette,
        background: values.background,
        composition: values.composition
      };
    }
  },
  character: {
    fields: [
      { key: "identity", label: "角色身份", placeholder: "未来世界赏金猎人" },
      { key: "appearance", label: "外观", placeholder: "银短发、红色机械眼、机能风长外套" },
      { key: "personality", label: "性格", placeholder: "冷静、锋利、带一点幽默" },
      { key: "pose", label: "姿态", placeholder: "动态转身，回望镜头" },
      { key: "expression", label: "表情", placeholder: "轻微挑眉、带笑意" },
      { key: "world", label: "世界观", placeholder: "赛博朋克港口城市" },
      { key: "signature", label: "标志元素", placeholder: "等离子步枪、荧光外套边线" }
    ],
    compose(values) {
      return `设计${values.identity}角色设定图。
外观：${values.appearance}；性格：${values.personality}。
姿态：${values.pose}；表情：${values.expression}。
世界观：${values.world}；标志性元素：${values.signature}。
输出：角色主视图 + 风格统一的人设图。`;
    },
    toJson(values) {
      return {
        type: "Character Concept Art",
        identity: values.identity,
        appearance: values.appearance,
        personality: values.personality,
        pose: values.pose,
        expression: values.expression,
        world: values.world,
        signature: values.signature
      };
    }
  },
  narrative: {
    fields: [
      { key: "scene", label: "场景主题", placeholder: "暴雨里的未来车站" },
      { key: "story", label: "叙事线", placeholder: "主角即将离开城市" },
      { key: "camera", label: "镜头语言", placeholder: "中远景，低机位，雨幕前景" },
      { key: "style", label: "风格", placeholder: "电影感、强对比、潮湿氛围" },
      { key: "palette", label: "色调", placeholder: "深蓝、钨丝灯黄、霓虹红" },
      { key: "details", label: "关键细节", placeholder: "湿地反光、疾驰列车、人物背影" }
    ],
    compose(values) {
      return `生成${values.scene}叙事场景图。
故事线：${values.story}。
镜头语言：${values.camera}。
风格：${values.style}；色调：${values.palette}。
关键细节：${values.details}。
输出：有明显情节张力的电影感画面。`;
    },
    toJson(values) {
      return {
        type: "Narrative Scene",
        scene: values.scene,
        story: values.story,
        camera: values.camera,
        style: values.style,
        palette: values.palette,
        details: values.details
      };
    }
  },
  history: {
    fields: [
      { key: "subject", label: "题材", placeholder: "宋代服饰图鉴" },
      { key: "focus", label: "展示重点", placeholder: "结构、纹样、工艺" },
      { key: "layout", label: "版式", placeholder: "中心主体 + 引线标注 + 底部流程图" },
      { key: "texture", label: "材质气质", placeholder: "绢纸白、米色纸张纹理" },
      { key: "textRule", label: "文字要求", placeholder: "全部简体中文，规整可读" }
    ],
    compose(values) {
      return `创作${values.subject}信息图。
重点展示：${values.focus}。
版式：${values.layout}。
整体气质：国家博物馆展板、文博专题信息图，背景为${values.texture}。
文字要求：${values.textRule}。`;
    },
    toJson(values) {
      return {
        type: "Historical Infographic",
        subject: values.subject,
        focus: values.focus,
        layout: values.layout,
        texture: values.texture,
        constraints: values.textRule
      };
    }
  },
  publishing: {
    fields: [
      { key: "publication", label: "出版物类型", placeholder: "专题小册子封面" },
      { key: "subject", label: "主题", placeholder: "未来工作方式" },
      { key: "layout", label: "版式", placeholder: "杂志式留白布局" },
      { key: "typography", label: "字体气质", placeholder: "高对比衬线 + 干净无衬线" },
      { key: "palette", label: "色彩", placeholder: "纸白、墨绿、灰黑" },
      { key: "details", label: "细节", placeholder: "封面图、目录栏、出版物信息区" }
    ],
    compose(values) {
      return `生成${values.publication}设计稿，主题为${values.subject}。
版式：${values.layout}。
字体气质：${values.typography}。
色彩：${values.palette}。
细节：${values.details}。
输出：具有出版物质感的高分辨率页面。`;
    },
    toJson(values) {
      return {
        type: "Publishing Layout",
        publication: values.publication,
        subject: values.subject,
        layout: values.layout,
        typography: values.typography,
        palette: values.palette,
        details: values.details
      };
    }
  },
  other: {
    fields: [
      { key: "task", label: "任务类型", placeholder: "朋友圈截图" },
      { key: "subject", label: "主体", placeholder: "AI 工具推荐内容" },
      { key: "constraints", label: "约束", placeholder: "中文可读，比例 3:4" },
      { key: "style", label: "风格", placeholder: "官方、干净、真实平台感" },
      { key: "details", label: "关键细节", placeholder: "点赞、评论、转发等数据位" }
    ],
    compose(values) {
      return `生成${values.task}，主体为${values.subject}。
风格：${values.style}。
关键细节：${values.details}。
约束：${values.constraints}。`;
    },
    toJson(values) {
      return {
        type: values.task,
        subject: values.subject,
        style: values.style,
        details: values.details,
        constraints: values.constraints
      };
    }
  }
};

const elements = {
  mainContent: document.getElementById("mainContent"),
  mainTopbar: document.getElementById("mainTopbar"),
  viewTitle: document.getElementById("viewTitle"),
  globalSearch: document.getElementById("globalSearch"),
  categoryList: document.getElementById("categoryList"),
  dashboardView: document.getElementById("dashboardView"),
  casesView: document.getElementById("casesView"),
  templatesView: document.getElementById("templatesView"),
  builderView: document.getElementById("builderView"),
  teachingView: document.getElementById("teachingView"),
  exportCurrent: document.getElementById("exportCurrent")
};

init();

async function init() {
  try {
    const response = await fetch("./library/catalog.json");
    if (!response.ok) {
      throw new Error(`Failed to load catalog: ${response.status}`);
    }
    state.catalog = await response.json();
    state.selectedCaseId = state.catalog.cases[0]?.id ?? null;
    renderShell();
    bindEvents();
  } catch (error) {
    console.error(error);
    document.body.innerHTML = `
      <main style="padding:32px;font-family:Inter,'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif;background:#eef1e8;color:#142018;min-height:100vh;">
        <div style="max-width:720px;padding:24px;border:1px solid #d7ddd0;border-radius:8px;background:#fbfcf7;">
          <p style="margin:0 0 8px;color:#5b685d;font-size:12px;text-transform:uppercase;">Startup Error</p>
          <h1 style="margin:0 0 12px;font-size:28px;line-height:1.1;">页面数据没有加载起来</h1>
          <p style="margin:0 0 12px;color:#5b685d;line-height:1.6;">通常是本地静态服务没有把 <code>/library/catalog.json</code> 或图片目录正确暴露出来。重启服务后再刷新就行。</p>
          <pre style="margin:0;padding:14px;border-radius:6px;background:#132019;color:#e8f1e5;white-space:pre-wrap;">${escapeHtml(String(error?.stack || error))}</pre>
        </div>
      </main>
    `;
  }
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      setView(item.dataset.view);
    });
  });

  elements.globalSearch.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderShell();
  });

  elements.exportCurrent.addEventListener("click", () => {
    const markdown = buildCurrentMarkdown();
    downloadFile(`${state.activeView}.md`, markdown);
  });
}

function setView(view) {
  state.activeView = view;
  renderShell();
  scrollToActiveView();
}

function renderShell() {
  renderSidebar();
  renderViews();
  updateViewState();
}

function scrollToActiveView() {
  if (window.innerWidth > 1180) return;
  const target = elements.mainTopbar || elements.mainContent;
  if (!target) return;
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderSidebar() {
  const categories = [{ id: "all", label: "全部", count: state.catalog.cases.length }, ...state.catalog.categories];
  elements.categoryList.innerHTML = categories
    .map(
      (category) => `
        <button class="category-item ${state.category === category.id ? "is-active" : ""}" data-category="${category.id}">
          <span>${category.label}</span>
          <strong>${category.count}</strong>
        </button>
      `
    )
    .join("");

  elements.categoryList.querySelectorAll(".category-item").forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category;
      renderShell();
    });
  });
}

function renderViews() {
  renderDashboard();
  renderCases();
  renderTemplates();
  renderBuilder();
  renderTeaching();
}

function updateViewState() {
  const titles = {
    dashboard: "总览",
    cases: "案例",
    templates: "模板",
    builder: "Builder",
    teaching: "课程"
  };

  elements.viewTitle.textContent = titles[state.activeView];
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === state.activeView);
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("is-active", section.id === `${state.activeView}View`);
  });
}

function filteredCases() {
  return state.catalog.cases.filter((item) => {
    const matchesCategory = state.category === "all" || item.categoryId === state.category;
    const haystack = [item.title, item.prompt, item.source, item.categoryId].join("\n").toLowerCase();
    const matchesQuery = !state.query || haystack.includes(state.query);
    return matchesCategory && matchesQuery;
  });
}

function filteredTemplates() {
  return state.catalog.templates.filter((item) => {
    const matchesCategory = state.category === "all" || item.categoryId === state.category;
    const haystack = [item.name, item.description, item.regularTemplate, item.jsonTemplateRaw].join("\n").toLowerCase();
    const matchesQuery = !state.query || haystack.includes(state.query);
    return matchesCategory && matchesQuery;
  });
}

function renderDashboard() {
  const { stats, categories, guides, teachingCollections } = state.catalog;
  const featuredCases = filteredCases().slice(0, 6);

  elements.dashboardView.innerHTML = `
    <article class="hero-card">
      <div class="hero-copy">
        <span class="eyebrow">Prompt as Knowledge Base</span>
        <h3>把案例库做成工具站，也做成你以后上课的底稿。</h3>
        <p>这个版本已经把原仓库的 markdown 和图片全量本地化，前台是一个可搜索的 GPT Image Wiki，后台是一份可继续导出成课程、Obsidian、讲义的内容资产。</p>
        <div class="hero-actions">
          <button class="secondary-btn" data-jump="builder">打开 Builder</button>
          <button class="secondary-btn" data-jump="teaching">看课程集合</button>
        </div>
      </div>
      <div class="hero-visual"></div>
    </article>

    <div class="stats-grid" id="statsGrid"></div>

    <div class="section-head">
      <div>
        <h3>分类地图</h3>
        <p>你可以先从高频类型切，再进入案例或模板。</p>
      </div>
    </div>
    <div class="category-grid">
      ${categories
        .filter((item) => item.count > 0)
        .map(
          (item) => `
            <article class="panel">
              <h4>${item.label}</h4>
              <p>${item.description}</p>
              <div class="template-meta">
                <small>${item.count} 个案例</small>
                <small>${item.templateCount} 个模板</small>
              </div>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="section-head">
      <div>
        <h3>教学集合</h3>
        <p>适合你拿去内部分享或对外讲解。</p>
      </div>
    </div>
    <div class="lesson-grid">
      ${teachingCollections
        .map(
          (lesson) => `
            <article class="lesson-card">
              <h4>${lesson.title}</h4>
              <p>${lesson.audience}</p>
              <div class="template-meta">
                <small>${lesson.duration}</small>
                <small>${lesson.templateIds.length} 个模板模块</small>
              </div>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="section-head">
      <div>
        <h3>精选案例</h3>
        <p>先看具体图，再回模板页做抽象。</p>
      </div>
    </div>
    <div class="case-grid">
      ${featuredCases.map(caseCardMarkup).join("")}
    </div>

    <div class="section-head">
      <div>
        <h3>讲课指南</h3>
        <p>这些卡片现在可以点开，会带你进入课程页并打开对应指南。</p>
      </div>
    </div>
    <div class="guide-grid">
      ${guides
        .map(
          (guide) => `
            <article class="panel clickable-card" data-guide-id="${guide.id}">
              <h4>${guide.title}</h4>
              <p>${guide.summary}</p>
              <div class="template-meta"><small>点击打开指南</small></div>
            </article>
          `
        )
        .join("")}
    </div>
  `;

  const statsGrid = document.getElementById("statsGrid");
  const statsData = [
    { label: "案例总数", value: stats.caseCount, note: "已写入本地 JSON 索引" },
    { label: "模板总数", value: stats.templateCount, note: "13 个工业级模板" },
    { label: "指南页", value: stats.guideCount, note: "可直接拿来讲课" },
    { label: "图片总数", value: stats.imageCount, note: "全部复制到本地库" }
  ];
  const template = document.getElementById("statCardTemplate");
  statsGrid.innerHTML = "";
  statsData.forEach((item) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".stat-label").textContent = item.label;
    fragment.querySelector(".stat-value").textContent = item.value;
    fragment.querySelector(".stat-note").textContent = item.note;
    statsGrid.appendChild(fragment);
  });

  elements.dashboardView.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.jump));
  });
  wireCaseCards(elements.dashboardView);
  wireGuideCards(elements.dashboardView, { jumpToTeaching: true });
}

function caseCardMarkup(item) {
  const category = state.catalog.categories.find((entry) => entry.id === item.categoryId);
  return `
    <article class="case-card" data-case-id="${item.id}">
      <img src="./library/images/${item.image}" alt="${item.title}" />
      <div class="case-meta">例 ${item.number} · ${category?.label || "其他"} · ${item.volume}</div>
      <h4>${item.title}</h4>
      <p>${item.summary || item.source}</p>
      <div class="template-meta">
        <small>${item.source}</small>
      </div>
    </article>
  `;
}

function renderCases() {
  const cases = filteredCases();
  const selectedCase = cases.find((item) => item.id === state.selectedCaseId) || cases[0];
  if (selectedCase) state.selectedCaseId = selectedCase.id;

  elements.casesView.innerHTML = `
    <div class="section-head">
      <div>
        <h3>案例库</h3>
        <p>${cases.length} 个案例匹配当前搜索和分类。</p>
      </div>
      <div class="filters">
        <button class="filter-chip" id="resetFilters">清空筛选</button>
      </div>
    </div>
    <div class="two-column">
      <div class="case-grid" id="caseGrid">
        ${cases.length ? cases.map(caseCardMarkup).join("") : '<div class="empty">没有匹配结果，试试更短的关键词。</div>'}
      </div>
      <aside class="detail-card" id="caseDetail">
        ${selectedCase ? renderCaseDetail(selectedCase) : '<div class="empty">先选一个案例。</div>'}
      </aside>
    </div>
  `;

  const resetFilters = document.getElementById("resetFilters");
  if (resetFilters) {
    resetFilters.addEventListener("click", () => {
      state.query = "";
      state.category = "all";
      elements.globalSearch.value = "";
      renderShell();
    });
  }

  wireCaseCards(elements.casesView);
  const copyPrompt = document.getElementById("copyPrompt");
  if (copyPrompt && selectedCase) {
    copyPrompt.addEventListener("click", () => copyText(selectedCase.prompt));
  }
}

function renderCaseDetail(item) {
  const category = state.catalog.categories.find((entry) => entry.id === item.categoryId);
  return `
    <img src="./library/images/${item.image}" alt="${item.title}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:6px;border:1px solid var(--line);" />
    <div class="detail-meta">例 ${item.number} · ${category?.label || "其他"} · ${item.volume}</div>
    <h4>${item.title}</h4>
    <p>${item.summary || "这个案例可以作为类型参考，继续去 Builder 里改成你的业务变量。"}</p>
    <div class="detail-tags">
      <span class="chip">${item.source}</span>
      <span class="chip">${item.sourcePath}</span>
    </div>
    <div class="section-head">
      <div><h3 style="font-size:16px;">Prompt</h3></div>
      <button class="ghost-btn" id="copyPrompt">复制</button>
    </div>
    <pre>${escapeHtml(item.prompt)}</pre>
  `;
}

function wireCaseCards(scope) {
  scope.querySelectorAll("[data-case-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedCaseId = card.dataset.caseId;
      if (state.activeView === "dashboard") {
        setView("cases");
      } else {
        renderCases();
      }
    });
  });
}

function renderTemplates() {
  const templates = filteredTemplates();
  const selected = templates.find((item) => item.id === state.selectedTemplateId) || templates[0];
  if (selected) state.selectedTemplateId = selected.id;

  elements.templatesView.innerHTML = `
    <div class="section-head">
      <div>
        <h3>模板库</h3>
        <p>${templates.length} 个模板匹配当前筛选。</p>
      </div>
    </div>
    <div class="two-column">
      <div class="template-grid">
        ${templates
          .map(
            (item) => `
              <article class="template-card" data-template-id="${item.id}">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <div class="template-meta">
                  ${item.pitfalls.map((pitfall) => `<small>${pitfall.title}</small>`).join("")}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
      <aside class="detail-card" id="templateDetail">
        ${selected ? renderTemplateDetail(selected) : '<div class="empty">先选一个模板。</div>'}
      </aside>
    </div>
  `;

  elements.templatesView.querySelectorAll("[data-template-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedTemplateId = card.dataset.templateId;
      renderTemplates();
    });
  });

  const useTemplate = document.getElementById("useTemplate");
  if (useTemplate && selected) {
    useTemplate.addEventListener("click", () => {
      state.builderCategory = selected.id;
      setView("builder");
    });
  }
}

function renderTemplateDetail(item) {
  const pitfalls = item.pitfalls.length
    ? `<ul>${item.pitfalls.map((pitfall) => `<li><strong>${pitfall.title}</strong>：${pitfall.detail}</li>`).join("")}</ul>`
    : "<p>暂无避坑条目。</p>";

  return `
    <div class="detail-meta">${item.name}</div>
    <h4>${item.name}</h4>
    <p>${item.description}</p>
    <div class="course-actions">
      <button class="secondary-btn" id="useTemplate">带入 Builder</button>
    </div>
    <div class="section-head">
      <div><h3 style="font-size:16px;">常规模板</h3></div>
    </div>
    <pre>${escapeHtml(item.regularTemplate)}</pre>
    <div class="section-head">
      <div><h3 style="font-size:16px;">JSON 模板</h3></div>
    </div>
    <pre>${escapeHtml(item.jsonTemplateRaw)}</pre>
    <div class="section-head">
      <div><h3 style="font-size:16px;">避坑指南</h3></div>
    </div>
    <div class="markdown-block">${pitfalls}</div>
  `;
}

function renderBuilder() {
  const categoryId = state.builderCategory in builderConfig ? state.builderCategory : "ui";
  const config = builderConfig[categoryId];
  const catalogTemplate = state.catalog.templates.find((item) => item.id === categoryId);
  state.builderCategory = categoryId;
  if (!state.builderValues[categoryId]) {
    state.builderValues[categoryId] = Object.fromEntries(config.fields.map((field) => [field.key, field.placeholder]));
  }

  const values = state.builderValues[categoryId];

  elements.builderView.innerHTML = `
    <div class="section-head">
      <div>
        <h3>Prompt Builder</h3>
        <p>这里不是简单填空，而是把模板变成你自己的业务 prompt。</p>
      </div>
    </div>
    <div class="builder-grid">
      <article class="builder-panel">
        <form id="builderForm">
          <label>
            类型
            <select id="builderCategory">
              ${state.catalog.templates
                .map(
                  (item) =>
                    `<option value="${item.id}" ${item.id === categoryId ? "selected" : ""}>${item.name}</option>`
                )
                .join("")}
            </select>
          </label>
          ${config.fields
            .map(
              (field) => `
                <label>
                  ${field.label}
                  <input name="${field.key}" value="${escapeAttribute(values[field.key] || "")}" placeholder="${field.placeholder}" />
                </label>
              `
            )
            .join("")}
        </form>
      </article>
      <div id="builderOutput">
        ${renderBuilderOutput(categoryId, catalogTemplate)}
      </div>
    </div>
  `;

  document.getElementById("builderCategory").addEventListener("change", (event) => {
    state.builderCategory = event.target.value;
    renderBuilder();
  });

  document.getElementById("builderForm").addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
    state.builderValues[categoryId][target.name] = target.value;
    updateBuilderOutput();
  });

  wireBuilderOutputActions();
}

function renderBuilderOutput(categoryId, catalogTemplate) {
  const config = builderConfig[categoryId];
  const values = state.builderValues[categoryId];
  const promptText = config.compose(values);
  const jsonText = JSON.stringify(config.toJson(values), null, 2);

  return `
    <div class="output-card">
      <header>
        <h4>自然语言 Prompt</h4>
        <button class="ghost-btn" id="copyBuilderPrompt">复制</button>
      </header>
      <pre>${escapeHtml(promptText)}</pre>
      <header>
        <h4>JSON Prompt</h4>
        <button class="ghost-btn" id="copyBuilderJson">复制</button>
      </header>
      <pre>${escapeHtml(jsonText)}</pre>
      <div class="markdown-block">
        <p><strong>当前模板：</strong>${catalogTemplate?.name || ""}</p>
        <p>${catalogTemplate?.description || ""}</p>
      </div>
    </div>
  `;
}

function updateBuilderOutput() {
  const categoryId = state.builderCategory in builderConfig ? state.builderCategory : "ui";
  const catalogTemplate = state.catalog.templates.find((item) => item.id === categoryId);
  const builderOutput = document.getElementById("builderOutput");
  if (!builderOutput) return;
  builderOutput.innerHTML = renderBuilderOutput(categoryId, catalogTemplate);
  wireBuilderOutputActions();
}

function wireBuilderOutputActions() {
  const categoryId = state.builderCategory in builderConfig ? state.builderCategory : "ui";
  const config = builderConfig[categoryId];
  const values = state.builderValues[categoryId];
  const promptText = config.compose(values);
  const jsonText = JSON.stringify(config.toJson(values), null, 2);

  document.getElementById("copyBuilderPrompt")?.addEventListener("click", () => copyText(promptText));
  document.getElementById("copyBuilderJson")?.addEventListener("click", () => copyText(jsonText));
}

function renderTeaching() {
  const collection = state.catalog.teachingCollections.find((item) => item.id === state.selectedLessonId) || state.catalog.teachingCollections[0];
  if (collection) state.selectedLessonId = collection.id;
  const relatedTemplates = state.catalog.templates.filter((item) => collection.templateIds.includes(item.id));
  const relatedGuides = state.catalog.guides.filter((item) => collection.guideIds.includes(item.id));
  const sampleCases = state.catalog.cases.filter((item) => collection.templateIds.includes(item.categoryId)).slice(0, 6);
  const selectedGuide =
    relatedGuides.find((item) => item.id === state.selectedGuideId) ||
    relatedGuides[0] ||
    state.catalog.guides[0];
  if (selectedGuide) state.selectedGuideId = selectedGuide.id;

  elements.teachingView.innerHTML = `
    <div class="section-head">
      <div>
        <h3>课程模式</h3>
        <p>这里现在按“上课顺序”来组织：先读指南，再讲模板，再看案例，最后去 Builder 现场改 prompt。</p>
      </div>
    </div>
    <div class="lesson-grid">
      ${state.catalog.teachingCollections
        .map(
          (item) => `
            <article class="lesson-card clickable-card" data-lesson-id="${item.id}">
              <h4>${item.title}</h4>
              <p>${item.audience}</p>
              <div class="template-meta">
                <small>${item.duration}</small>
                <small>${item.goals.length} 个目标</small>
              </div>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="two-column" style="margin-top:18px;">
      <article class="detail-card">
        <div class="detail-meta">${collection.duration} · ${collection.audience}</div>
        <h4>${collection.title}</h4>
        <div class="markdown-block">
          <ul>${collection.goals.map((goal) => `<li>${goal}</li>`).join("")}</ul>
        </div>
        <div class="course-actions">
          <button class="secondary-btn" id="exportCourse">导出课程 Markdown</button>
          <button class="secondary-btn" id="openBuilderFromCourse">打开 Builder</button>
        </div>
        <div class="section-head"><div><h3 style="font-size:16px;">这门课怎么讲</h3></div></div>
        <div class="markdown-block">
          <p><strong>第 1 步：</strong>点右边“配套指南”里的第一张卡，先讲方法论。</p>
          <p><strong>第 2 步：</strong>点“课程模板模块”里的模板，讲这个类型的变量该怎么填。</p>
          <p><strong>第 3 步：</strong>点“示例案例”，让大家看真实图和 prompt 长什么样。</p>
          <p><strong>第 4 步：</strong>最后点上面的“打开 Builder”，现场把 prompt 改成你的业务场景。</p>
        </div>
        <div class="section-head"><div><h3 style="font-size:16px;">当前打开的指南</h3></div></div>
        <div class="panel guide-detail-panel">
          ${selectedGuide ? renderGuideDetail(selectedGuide) : '<div class="empty">先从右边选一篇指南。</div>'}
        </div>
      </article>

      <div>
        <div class="section-head"><div><h3 style="font-size:16px;">课程模板模块</h3></div></div>
        <div class="template-grid">
          ${relatedTemplates
            .map(
              (item) => `
                <article class="template-card clickable-card" data-course-template-id="${item.id}">
                  <h4>${item.name}</h4>
                  <p>${item.description}</p>
                  <div class="template-meta"><small>点击跳到模板页</small></div>
                </article>
              `
            )
            .join("")}
        </div>

        <div class="section-head"><div><h3 style="font-size:16px;">配套指南</h3></div></div>
        <div class="guide-grid">
          ${relatedGuides
            .map(
              (item) => `
                <article class="panel clickable-card ${selectedGuide?.id === item.id ? "is-selected" : ""}" data-guide-id="${item.id}">
                  <h4>${item.title}</h4>
                  <p>${item.summary}</p>
                  <div class="template-meta"><small>点击在左侧打开</small></div>
                </article>
              `
            )
            .join("")}
        </div>

        <div class="section-head"><div><h3 style="font-size:16px;">示例案例</h3></div></div>
        <div class="case-grid">
          ${sampleCases.map(caseCardMarkup).join("")}
        </div>
      </div>
    </div>
  `;

  elements.teachingView.querySelectorAll("[data-lesson-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedLessonId = card.dataset.lessonId;
      renderTeaching();
    });
  });

  const exportCourse = document.getElementById("exportCourse");
  if (exportCourse) {
    exportCourse.addEventListener("click", () => {
      downloadFile(`${collection.id}.md`, buildCollectionMarkdown(collection));
    });
  }

  document.getElementById("openBuilderFromCourse")?.addEventListener("click", () => {
    state.builderCategory = collection.templateIds[0] || "ui";
    setView("builder");
  });

  elements.teachingView.querySelectorAll("[data-course-template-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedTemplateId = card.dataset.courseTemplateId;
      setView("templates");
    });
  });

  wireCaseCards(elements.teachingView);
  wireGuideCards(elements.teachingView);
}

function renderGuideDetail(guide) {
  return `
    <div class="detail-meta">${guide.sourcePath}</div>
    <h4>${guide.title}</h4>
    <p>${guide.summary}</p>
    <div class="markdown-block">${markdownToHtml(guide.content)}</div>
  `;
}

function wireGuideCards(scope, options = {}) {
  scope.querySelectorAll("[data-guide-id]").forEach((card) => {
    card.addEventListener("click", () => {
      state.selectedGuideId = card.dataset.guideId;
      if (options.jumpToTeaching) {
        setView("teaching");
      } else {
        renderTeaching();
      }
    });
  });
}

function buildCollectionMarkdown(collection) {
  const templates = state.catalog.templates.filter((item) => collection.templateIds.includes(item.id));
  const guides = state.catalog.guides.filter((item) => collection.guideIds.includes(item.id));
  const cases = state.catalog.cases.filter((item) => collection.templateIds.includes(item.categoryId)).slice(0, 8);
  return [
    `# ${collection.title}`,
    "",
    `- 受众：${collection.audience}`,
    `- 时长：${collection.duration}`,
    "",
    "## 课程目标",
    ...collection.goals.map((goal) => `- ${goal}`),
    "",
    "## 配套指南",
    ...guides.map((guide) => `- ${guide.title}`),
    "",
    "## 课程模板",
    ...templates.map((item) => `### ${item.name}\n\n${item.regularTemplate}`),
    "",
    "## 示例案例",
    ...cases.map((item) => `### 例 ${item.number}：${item.title}\n\n来源：${item.source}\n\n${item.prompt}`)
  ].join("\n");
}

function buildCurrentMarkdown() {
  if (state.activeView === "teaching") {
    const collection = state.catalog.teachingCollections.find((item) => item.id === state.selectedLessonId);
    return buildCollectionMarkdown(collection);
  }

  if (state.activeView === "templates") {
    const template = state.catalog.templates.find((item) => item.id === state.selectedTemplateId);
    if (!template) return "# 模板\n";
    return [
      `# ${template.name}`,
      "",
      template.description,
      "",
      "## 常规模板",
      template.regularTemplate,
      "",
      "## JSON 模板",
      "```json",
      template.jsonTemplateRaw,
      "```"
    ].join("\n");
  }

  if (state.activeView === "cases") {
    const item = state.catalog.cases.find((entry) => entry.id === state.selectedCaseId);
    if (!item) return "# 案例\n";
    return [
      `# 例 ${item.number}：${item.title}`,
      "",
      `- 分类：${item.categoryId}`,
      `- 来源：${item.source}`,
      `- 文档：${item.sourcePath}`,
      "",
      "## Prompt",
      "```text",
      item.prompt,
      "```"
    ].join("\n");
  }

  if (state.activeView === "builder") {
    const config = builderConfig[state.builderCategory];
    const values = state.builderValues[state.builderCategory];
    return [
      `# Builder - ${state.builderCategory}`,
      "",
      "## Prompt",
      "```text",
      config.compose(values),
      "```",
      "",
      "## JSON",
      "```json",
      JSON.stringify(config.toJson(values), null, 2),
      "```"
    ].join("\n");
  }

  return [
    "# GPT Image Wiki",
    "",
    `- 案例：${state.catalog.stats.caseCount}`,
    `- 模板：${state.catalog.stats.templateCount}`,
    `- 图片：${state.catalog.stats.imageCount}`,
    "",
    "## 说明",
    "这是一个教学型 GPT Image Wiki，既可搜索，也可作为课程站使用。"
  ].join("\n");
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return value.replaceAll('"', "&quot;");
}

function markdownToHtml(markdown) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("- ")) {
        const items = block
          .split("\n")
          .filter((line) => line.trim().startsWith("- "))
          .map((line) => `<li>${inlineMarkdown(line.replace(/^- /, "").trim())}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }

      if (/^\d+\./.test(block)) {
        const items = block
          .split("\n")
          .filter((line) => /^\d+\./.test(line.trim()))
          .map((line) => `<li>${inlineMarkdown(line.replace(/^\d+\.\s*/, "").trim())}</li>`)
          .join("");
        return `<ol>${items}</ol>`;
      }

      return `<p>${inlineMarkdown(block)}</p>`;
    })
    .join("");
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}
