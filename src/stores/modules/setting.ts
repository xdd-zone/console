import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { calculateIsDark, getSystemPrefersDark, updatePrimaryColorAttribute, updateThemeAttribute } from '@/utils/theme'

import type { BaseStore } from '../types'

/**
 * 设置相关的状态接口
 */
export interface SettingState extends BaseStore {
  initTheme: () => void
  isDark: boolean
  isMobileMenuOpen: boolean
  isSettingDrawerOpen: boolean
  isSidebarCollapsed: boolean
  language: string
  layoutMode: 'leftRight' | 'topBottom'
  primaryColor: string
  resetToSystemTheme: () => void
  setDarkMode: (isDark: boolean) => void
  setLanguage: (language: string) => void
  setLayoutMode: (mode: 'leftRight' | 'topBottom') => void
  setMobileMenuOpen: (open: boolean) => void
  setPrimaryColor: (color: string) => void
  setSettingDrawerOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void
  themeMode: 'light' | 'dark' | 'system'
  toggleDarkMode: () => void
  toggleLanguage: () => void
  toggleMobileMenu: () => void
  toggleSidebarCollapsed: () => void
}

/**
 * 获取初始主题状态
 * 在 store 初始化时同步计算，避免闪烁
 */
const getInitialThemeState = () => {
  // 尝试从 localStorage 获取持久化的 themeMode
  let themeMode: 'light' | 'dark' | 'system' = 'system'
  let primaryColor = '#8200db'
  let language = 'zh'

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('setting-store')
      if (stored) {
        const parsed = JSON.parse(stored)
        themeMode = parsed.state?.themeMode || 'system'
        primaryColor = parsed.state?.primaryColor || '#8200db'
        language = parsed.state?.language || 'zh'
      }
    } catch {
      // 忽略解析错误，使用默认值
    }
  }

  const isDark = calculateIsDark(themeMode)

  // 立即更新 DOM 属性，避免闪烁
  if (typeof document !== 'undefined') {
    updateThemeAttribute(isDark)
    updatePrimaryColorAttribute(primaryColor)
  }

  return { isDark, language, primaryColor, themeMode }
}

/**
 * 系统配置 Store
 *
 * 使用 Zustand 管理应用的设置状态，包括暗黑模式
 * 支持持久化到 localStorage
 */
export const useSettingStore = create<SettingState>()(
  persist(
    (set, get) => {
      const initialTheme = getInitialThemeState()

      return {
        initTheme: () => {
          const { themeMode } = get()
          const isDark = calculateIsDark(themeMode)
          set({ isDark })
          updateThemeAttribute(isDark)
        },

        isDark: initialTheme.isDark,

        isMobileMenuOpen: false,

        isSettingDrawerOpen: false,

        isSidebarCollapsed: false,

        language: initialTheme.language,

        layoutMode: 'leftRight' as const,

        primaryColor: initialTheme.primaryColor,

        reset: () => {
          set({
            isDark: false,
            isSidebarCollapsed: false,
            language: 'zh',
            layoutMode: 'leftRight' as const,
            primaryColor: '#8200db',
            themeMode: 'system' as const,
          })
        },

        resetToSystemTheme: () => {
          const isDark = getSystemPrefersDark()
          set({ isDark, themeMode: 'system' as const })
          updateThemeAttribute(isDark)
        },

        setDarkMode: (isDark: boolean) => {
          set({ isDark })
          updateThemeAttribute(isDark)
        },

        setLanguage: async (language: string) => {
          set({ language })
          // 动态导入 i18n 实例访问器，避免与 App.tsx 的静态导入冲突
          const { getI18nInstance } = await import('@/i18n/instance')
          getI18nInstance().changeLanguage(language)
        },

        setLayoutMode: (layoutMode: 'leftRight' | 'topBottom') => {
          set({ layoutMode })
        },

        setMobileMenuOpen: (open: boolean) => {
          set({ isMobileMenuOpen: open })
        },

        setPrimaryColor: (primaryColor: string) => {
          set({ primaryColor })
          updatePrimaryColorAttribute(primaryColor)
        },

        setSettingDrawerOpen: (open: boolean) => {
          set({ isSettingDrawerOpen: open })
        },

        setSidebarCollapsed: (isSidebarCollapsed: boolean) => {
          set({ isSidebarCollapsed })
        },

        setThemeMode: (themeMode: 'light' | 'dark' | 'system') => {
          const isDark = calculateIsDark(themeMode)
          set({ isDark, themeMode })
          updateThemeAttribute(isDark)
        },

        themeMode: initialTheme.themeMode,

        toggleDarkMode: () => {
          const { isDark } = get()
          const newIsDark = !isDark
          const newThemeMode = newIsDark ? 'dark' : 'light'
          set({ isDark: newIsDark, themeMode: newThemeMode })
          updateThemeAttribute(newIsDark)
        },

        toggleLanguage: async () => {
          const { language } = get()
          const newLanguage = language === 'zh' ? 'en' : 'zh'
          set({ language: newLanguage })
          // 动态导入 i18n 实例访问器，避免与 App.tsx 的静态导入冲突
          const { getI18nInstance } = await import('@/i18n/instance')
          getI18nInstance().changeLanguage(newLanguage)
        },

        toggleMobileMenu: () => {
          const { isMobileMenuOpen } = get()
          set({ isMobileMenuOpen: !isMobileMenuOpen })
        },

        toggleSidebarCollapsed: () => {
          const { isSidebarCollapsed } = get()
          set({ isSidebarCollapsed: !isSidebarCollapsed })
        },
      }
    },
    {
      name: 'setting-store',
      partialize: (state) => ({
        language: state.language,
        layoutMode: state.layoutMode,
        primaryColor: state.primaryColor,
        themeMode: state.themeMode,
      }),
    },
  ),
)

// 监听系统主题变化
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleSystemThemeChange = () => {
    const store = useSettingStore.getState()
    if (store.themeMode === 'system') {
      const isDark = getSystemPrefersDark()
      useSettingStore.setState({ isDark })
      updateThemeAttribute(isDark)
    }
  }

  mediaQuery.onchange = handleSystemThemeChange
}
