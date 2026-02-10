/**
 * 另一个落地页主题
 */
const CONFIG = {
  PROXIO_WELCOME_COVER_ENABLE: false, //是否显示页面进入的欢迎文字
  PROXIO_WELCOME_TEXT: '', // 欢迎文字，留空则不启用

  // 英雄区块导航
  PROXIO_HERO_ENABLE: true, // 开启英雄区
  PROXIO_HERO_TITLE_1: '无心月空🌙的博客', // 英雄区文字
  PROXIO_HERO_TITLE_2: '优秀的吉他教师，战绩可查', // 英雄区文字
  // 英雄区两个按钮，如果TEXT留空则隐藏按钮
  PROXIO_HERO_BUTTON_1_TEXT: 'B站主页', // 英雄区按钮
  PROXIO_HERO_BUTTON_1_URL:
    'https://space.bilibili.com/156820044?spm_id_from=333.337.0.0', // 英雄区按钮
  PROXIO_HERO_BUTTON_1_ICON: '', // 英雄区按钮1的图标
  
  PROXIO_HERO_BUTTON_2_TEXT: '', // 英雄区按钮
  PROXIO_HERO_BUTTON_2_URL: '', // 英雄区按钮
  PROXIO_HERO_BUTTON_2_ICON: '', // 英雄区按钮2的图标

  // 英雄区配图
  PROXIO_HERO_BANNER_IMAGE: '', 
  PROXIO_HERO_BANNER_IFRAME_URL: '', 

  // 文章区块
  PROXIO_BLOG_ENABLE: true, // 首页博文区块开关
  PROXIO_BLOG_TITLE: '寄蜉蝣于天地，渺沧海之一粟。哀吾生之须臾，羡长江之无穷',
  PROXIO_BLOG_COUNT: 6, // 首页博文区块展示前6篇文章
  PROXIO_BLOG_TEXT_1: '',

  // 区块默认内容显示
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_1: '', 
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_2: '',
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_3: '',
  PROXIO_BLOG_PLACEHOLDER_IMG_URL_4: '',

  PROXIO_ANNOUNCEMENT_ENABLE: true, //公告文字区块

  // 特性区块
  PROXIO_FEATURE_ENABLE: true, // 特性区块开关
  PROXIO_FEATURE_TITLE: '为什么选我',
  PROXIO_FEATURE_TEXT_1: '针对每个人的情况制定学习课程',
  PROXIO_FEATURE_TEXT_2: '丰富的教学经验，扎实的基本功，专业的吉他技能，拥有十足的耐心',

  // 特性1
  PROXIO_FEATURE_1_ICON_CLASS: 'fa-solid fa-stopwatch', 
  PROXIO_FEATURE_1_ICON_IMG_URL: '', 
  PROXIO_FEATURE_1_TITLE_1: '时间成本',
  PROXIO_FEATURE_1_TEXT_1:
    '沟通高效、即时行动，不在无意义的事情上浪费时光，节约你的时间。',

  PROXIO_FEATURE_2_ICON_CLASS: 'fa-solid fa-comments',
  PROXIO_FEATURE_2_ICON_IMG_URL: '',
  PROXIO_FEATURE_2_TITLE_1: '专注专业',
  PROXIO_FEATURE_2_TEXT_1: '一对一教学，工作时间全身心在放学员身上，获得物有所值的服务。',

  PROXIO_FEATURE_3_ICON_CLASS: 'fa-solid fa-search',
  PROXIO_FEATURE_3_ICON_IMG_URL: '',
  PROXIO_FEATURE_3_TITLE_1: '课外延展',
  PROXIO_FEATURE_3_TEXT_1:
    '了解学生，在适当的时机给予一些安全、品德、生活经验等教育，不只是卖课赚钱',

  // 🍎 修改点：点击“了解更多”直接跳转到博文分类页
  PROXIO_FEATURE_BUTTON_TEXT: '查看更多博文', // 按钮文字
  PROXIO_FEATURE_BUTTON_URL: '/category/博文', // 修正跳转地址

  // 首页生涯区块
  PROXIO_CAREER_ENABLE: false, 
  PROXIO_CAREER_TITLE: '生涯',
  PROXIO_CAREER_TEXT: '以下是我的职业生涯',

  PROXIO_CAREERS: [
    {
      title: 'Freelance Architect',
      bio: '2016-2020',
      text: 'As a freelance architect...'
    }
  ],

  // 首页用户测评区块
  PROXIO_TESTIMONIALS_ENABLE: false, 
  PROXIO_TESTIMONIALS_TITLE: '用户反馈',
  PROXIO_TESTIMONIALS_TEXT_1: '我们的用户怎么说',
  PROXIO_TESTIMONIALS_TEXT_2: '数千位站长选择用NotionNext搭建他们的网站',

  PROXIO_TESTIMONIALS_BUTTON_URL: '/about',
  PROXIO_TESTIMONIALS_BUTTON_TEXT: '联系我',

  PROXIO_TESTIMONIALS_ITEMS: [
    {
      PROXIO_TESTIMONIALS_ITEM_TEXT: '感谢大佬的方法...',
      PROXIO_TESTIMONIALS_ITEM_AVATAR: 'https://www.notion.so/image/...",
      PROXIO_TESTIMONIALS_ITEM_NICKNAME: 'Ryan_G',
      PROXIO_TESTIMONIALS_ITEM_DESCRIPTION: 'Ryan`Log 站长',
      PROXIO_TESTIMONIALS_ITEM_URL: 'https://blog.gaoran.xyz/'
    }
  ],

  // FAQ 常见问题模块
  PROXIO_FAQ_ENABLE: false, 
  PROXIO_FAQ_TITLE: '常见问题解答',
  PROXIO_FAQS: [
    {
      q: 'NotionNext有帮助文档吗？',
      a: 'NotionNext提供了帮助文档...'
    }
  ],

  // 关于作者区块
  PROXIO_ABOUT_ENABLE: true, 
  PROXIO_ABOUT_TITLE: '关于作者',
  PROXIO_ABOUT_TEXT_1: '我是深耕好多人看不上，懒得干，来钱慢的教学领域',
  PROXIO_ABOUT_TEXT_2:
    '太多人对社会上的琴行、培训机构不信任，是因为教吉他门槛低，不认真做、没水平的人太多。而我就是你需要的人。',
  PROXIO_ABOUT_PHOTO_URL: '/avatar.png',
  PROXIO_ABOUT_KEY_1: '小学公办教师经历',
  PROXIO_ABOUT_VAL_1: '15年',
  PROXIO_ABOUT_KEY_2: '一对一教学经验',
  PROXIO_ABOUT_VAL_2: '300+人次',
  PROXIO_ABOUT_KEY_3: '撰写教材',
  PROXIO_ABOUT_VAL_3: '7本',
  PROXIO_ABOUT_KEY_4: '教学视频播放',
  PROXIO_ABOUT_VAL_4: '50万次+',

  PROXIO_ABOUT_BUTTON_URL: '/about',
  PROXIO_ABOUT_BUTTON_TEXT: '关于我',

  // 横向滚动文字
  PROXIO_BRANDS_ENABLE: false, 
  PROXIO_BRANDS: [
    'Beyond曲集',
    '精通指板',
    'CAGED系统',
    '平凡吉他',
    '指板上的乐理',
    '吉他手工具资料',
    '电子谱集',
  ],

  PROXIO_FOOTER_SLOGAN: '吉他教学不仅是技艺的传授，更是音乐灵魂的共鸣。',

  // 404页面
  PROXIO_404_TITLE: '我们似乎找不到您要找的页面。',
  PROXIO_404_TEXT: '抱歉！您要查找的页面不存在。',
  PROXIO_404_BACK: '回到主页',

  // 行动呼吁模块
  PROXIO_CTA_ENABLE: false,
  PROXIO_CTA_TITLE: '与我建立联系',
  PROXIO_CTA_TITLE_2: '微信：18989133114 坐标：成都',
  PROXIO_CTA_DESCRIPTION: '提供一对一线下教学，或者一对一线上教学。',

  PROXIO_POST_REDIRECT_ENABLE: false, 
  PROXIO_POST_REDIRECT_URL: 'https://www.mskyer.com', 
  PROXIO_NEWSLETTER: process.env.NEXT_PUBLIC_THEME_PROXIO_NEWSLETTER || false 
}
export default CONFIG
