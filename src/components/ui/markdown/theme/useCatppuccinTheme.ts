import { useEffect, useState } from 'react'

import type { CatppuccinThemeId } from '@/stores/modules/setting'

import { useSettingStore } from '@/stores/modules/setting'

/**
 * useCatppuccinTheme：订阅项目 Catppuccin 主题变化的 Hook
 * - 自动监听 useSettingStore 中的 catppuccinTheme 状态
 * - 返回当前的主题 ID
 * - 支持 SSR 环境（返回默认值 latte）
 */
export const useCatppuccinTheme = (): CatppuccinThemeId => {
  const [themeId, setThemeId] = useState<CatppuccinThemeId>(() => useSettingStore.getState().catppuccinTheme)

  useEffect(() => {
    // 订阅变化
    const unsubscribe = useSettingStore.subscribe((state) => {
      setThemeId(state.catppuccinTheme)
    })

    return unsubscribe
  }, [])

  return themeId
}
