import type { ReactNode } from 'react'

import { ConfigProvider, theme } from 'antd'

import { Pattern } from '@/components/ui'
import { LanguageButton } from '@/layout/atoms/LanguageButton'
import { ThemeToggle } from '@/layout/atoms/ThemeToggle'
import { useSettingStore } from '@/stores'

interface AuthContainerProps {
  children: ReactNode
}

/**
 * 认证页面容器组件
 */
export function AuthContainer({ children }: AuthContainerProps) {
  const { isDark, primaryColor } = useSettingStore()

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <div className="relative flex h-screen items-center justify-center">
        {/* Pattern 背景 */}
        <Pattern animationDuration={6} />

        {/* 主题切换和语言切换按钮 */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 md:top-6 md:right-6">
          <LanguageButton className="rounded-lg p-2 text-xl text-gray-600 transition-all duration-200 hover:bg-white/20 hover:text-gray-800 md:text-2xl dark:text-gray-300 dark:hover:bg-black/20 dark:hover:text-white" />
          <ThemeToggle className="rounded-lg p-2 text-xl text-gray-600 transition-all duration-200 hover:bg-white/20 hover:text-gray-800 md:text-2xl dark:text-gray-300 dark:hover:bg-black/20 dark:hover:text-white" />
        </div>

        {/* 内容表单区域 */}
        <div className="relative z-10 h-full w-full md:mx-auto md:max-w-md md:px-6 md:py-8 lg:max-w-lg xl:max-w-xl">
          <div className="flex h-full flex-col justify-center bg-white/50 p-6 shadow-lg md:h-auto md:min-h-0 md:justify-start md:rounded-xl md:border md:p-8 lg:px-12 lg:py-10 dark:border-gray-700 dark:bg-black/50 dark:shadow-2xl">
            <div className="mx-auto w-full max-w-sm">{children}</div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}
