import { App as AntdApp, ConfigProvider, theme } from 'antd'
import { RouterProvider } from 'react-router'

import './i18n' // 初始化 i18n
import { router } from './router'
import { useSettingStore } from './stores'

export function App() {
  const { isDark, primaryColor } = useSettingStore()

  const algorithm = isDark ? theme.darkAlgorithm : theme.defaultAlgorithm

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
}
