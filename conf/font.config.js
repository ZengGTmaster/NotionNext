/**
 * 网站字体相关配置 - 极致苹果风格优化版
 */
module.exports = {
  // START ************网站字体*****************
  
  // 1. 移除了 font-light。苹果风格的精髓在于适中的字重。
  // font-sans 配合默认字重在 Retinal 屏幕上表现最稳，不会因过细而模糊。
  FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-sans',

  // 2. 仅保留 Noto Sans SC 的中等和加粗档位，移除衬线字体加载，提升网页加载速度。
  FONT_URL: [
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap'
  ],

  // 字体优化配置
  FONT_DISPLAY: process.env.NEXT_PUBLIC_FONT_DISPLAY || 'swap',
  FONT_PRELOAD: process.env.NEXT_PUBLIC_FONT_PRELOAD || true,
  FONT_SUBSET: process.env.NEXT_PUBLIC_FONT_SUBSET || 'chinese-simplified',

  // 3. 极致苹果无衬线字体栈 (FONT_SANS)
  // 按照：苹方 -> 系统原生 -> 经典华文黑体 -> 备选 的顺序排列
  FONT_SANS: [
    '"PingFang SC"',        // 苹果标准中文
    '-apple-system',        // macOS/iOS 系统字体
    'BlinkMacSystemFont',   // Chrome 在 Mac 上的调用
    '"STHeiti"',            // 华文黑体，苹果经典的紧凑字体
    '"Hiragino Sans GB"',   // 冬青黑体
    'HarmonyOS_Sans_SC',    // 鸿蒙字体（非苹果设备下视觉效果最接近苹方的字体）
    '"Noto Sans SC"',       // 谷歌标准黑体
    '"Helvetica Neue"',     // 苹果标准英文
    'Helvetica',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"'
  ],

  // 4. 衬线字体 (虽然你喜欢苹果风，但在 fallback 时保持基本兼容)
  FONT_SERIF: [
    '"Noto Serif SC"',
    'SimSun',
    'serif'
  ],

  // FontAwesome 图标库地址
  FONT_AWESOME:
    process.env.NEXT_PUBLIC_FONT_AWESOME_PATH ||
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'

  // END ************网站字体*****************
}
