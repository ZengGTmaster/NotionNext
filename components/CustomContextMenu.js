import React from 'react'

/**
 * 极简替换方案：彻底禁用自定义右键菜单
 */
export default function CustomContextMenu() {
  // 返回 null 表示不渲染任何 UI 元素
  // 这样浏览器就会恢复默认的原生右键菜单
  return null
}
