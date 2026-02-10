// 注: process.env.XX是Vercel的环境变量，配置方式见：https://docs.tangly1024.com/article/how-to-config-notion-next#c4768010ae7d44609b744e79e2f9959a

const BLOG = {
  API_BASE_URL: process.env.API_BASE_URL || 'https://www.notion.so/api/v3', // API默认请求地址
  // Important page_id！！！
  NOTION_PAGE_ID:
    process.env.NOTION_PAGE_ID ||
    '99c46058ee534c2e826778428f4e6995',
  THEME: process.env.NEXT_PUBLIC_THEME || 'proxio', // 当前主题
  LANG: process.env.NEXT_PUBLIC_LANG || 'zh-CN', // 语言
  SINCE: process.env.NEXT_PUBLIC_SINCE || 2023, 

  PSEUDO_STATIC: process.env.NEXT_PUBLIC_PSEUDO_STATIC || true, // 伪静态路径
  NEXT_REVALIDATE_SECOND: process.env.NEXT_PUBLIC_REVALIDATE_SECOND || 60, // 缓存间隔
  APPEARANCE: process.env.NEXT_PUBLIC_APPEARANCE || 'dark', // 默认深色模式，符合苹果与动漫质感
  APPEARANCE_DARK_TIME: process.env.NEXT_PUBLIC_APPEARANCE_DARK_TIME || [18, 6], 

  AUTHOR: process.env.NEXT_PUBLIC_AUTHOR || '无心月空', 
  BIO: process.env.NEXT_PUBLIC_BIO || '专注吉他教学 | 80s复古动漫爱好者 | 音乐与生活记录', 
  LINK: process.env.NEXT_PUBLIC_LINK || 'https://www.mskyer.com', 
  KEYWORDS: process.env.NEXT_PUBLIC_KEYWORD || '无心月空, Moonsky, 吉他教学, Notion博客', 
  BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || ' ', 
  BEI_AN: process.env.NEXT_PUBLIC_BEI_AN || '', 
  BEI_AN_LINK: process.env.NEXT_PUBLIC_BEI_AN_LINK || 'https://beian.miit.gov.cn/', 
  BEI_AN_GONGAN: process.env.NEXT_PUBLIC_BEI_AN_GONGAN || '', 

  // RSS订阅
  ENABLE_RSS: process.env.NEXT_PUBLIC_ENABLE_RSS || true, 

  // 配置文件拆分引入
  ...require('./conf/comment.config'),
  ...require('./conf/contact.config'),
  ...require('./conf/post.config'),
  ...require('./conf/analytics.config'),
  ...require('./conf/image.config'),
  ...require('./conf/font.config'),
  ...require('./conf/right-click-menu'),
  ...require('./conf/code.config'),
  ...require('./conf/animation.config'),
  ...require('./conf/widget.config'),
  ...require('./conf/ad.config'),
  ...require('./conf/plugin.config'),
  ...require('./conf/performance.config'),

  // 高级用法
  ...require('./conf/layout-map.config'),
  ...require('./conf/notion.config'),
  ...require('./conf/dev.config'),

  // 自定义外部脚本
  CUSTOM_EXTERNAL_JS: [''], 
  
  // 🍎 苹果风格与画廊修复核心 CSS
  CUSTOM_EXTERNAL_CSS: [
    'body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; letter-spacing: -0.015em; }',
    '.notion-text, .notion-list { line-height: 1.8 !important; }',
    '#theme-proxio .grid-item { cursor: pointer !important; }', // 强化点击手势
    '#theme-proxio .grid-item a { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10; }' // 链接层覆盖全卡片
  ],

  // 自定义菜单
  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || true, 

  // 文章列表相关设置
  CAN_COPY: process.env.NEXT_PUBLIC_CAN_COPY || true, 

  // 侧栏布局
  LAYOUT_SIDEBAR_REVERSE: process.env.NEXT_PUBLIC_LAYOUT_SIDEBAR_REVERSE || false,

  // 欢迎语
  GREETING_WORDS:
    process.env.NEXT_PUBLIC_GREETING_WORDS ||
    'Hi，我是无心月空, 一个专注吉他教学的人, 欢迎来到我的音乐空间🎉',

  UUID_REDIRECT: process.env.UUID_REDIRECT || false
}

module.exports = BLOG
