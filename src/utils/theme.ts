/**
 * 获取系统是否偏好暗黑模式
 */
export const getSystemPrefersDark = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * 更新 HTML 元素的主题属性
 */
export const updateThemeAttribute = (isDark: boolean) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }
}

/**
 * 将十六进制颜色转换为 RGB 值
 */
export const hexToRgb = (hex: string): { b: number; g: number; r: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        b: Number.parseInt(result[3], 16),
        g: Number.parseInt(result[2], 16),
        r: Number.parseInt(result[1], 16),
      }
    : null
}

/**
 * 将十六进制颜色转换为 CSS RGB 值 并添加透明度
 */
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return 'rgba(0, 0, 0, 0)'

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

/**
 * 更新主题色的 CSS 自定义属性
 */
export const updatePrimaryColorAttribute = (color: string) => {
  if (typeof document !== 'undefined') {
    const rgb = hexToRgb(color)
    if (rgb) {
      const root = document.documentElement
      root.style.setProperty('--primary-color', color)
      root.style.setProperty('--primary-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`)
    }
  }
}

/**
 * 根据主题模式计算实际的暗黑模式状态
 */
export const calculateIsDark = (themeMode: 'light' | 'dark' | 'system'): boolean => {
  switch (themeMode) {
    case 'dark':
      return true
    case 'light':
      return false
    case 'system':
      return getSystemPrefersDark()
    default:
      return false
  }
}
