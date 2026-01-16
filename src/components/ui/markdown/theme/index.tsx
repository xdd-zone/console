import type { MarkdownThemeProviderProps } from './types'

import { MarkdownThemeContext } from './context'
import { defaultMarkdownTheme } from './default'

/**
 * MarkdownThemeProvider：提供 Markdown 主题上下文
 * - 若未传入自定义 `theme`，则使用内置 `defaultMarkdownTheme`
 * - 供各渲染组件通过 `useMarkdownTheme` 读取样式类名
 */
export const MarkdownThemeProvider = ({ children, theme }: MarkdownThemeProviderProps) => {
  const value = theme ?? defaultMarkdownTheme
  return <MarkdownThemeContext.Provider value={value}>{children}</MarkdownThemeContext.Provider>
}
