import { Outlet, useNavigation } from 'react-router'

import { Loading } from '@/components'

/**
 * 应用内容区域组件
 * 渲染路由页面内容
 */
export function AppContent() {
  const navigation = useNavigation()
  const isNavigating = Boolean(navigation.location)
  return (
    <main className="flex-1 overflow-auto p-2">
      <div className="min-h-full rounded-lg shadow-sm dark:text-white">{isNavigating ? <Loading /> : <Outlet />}</div>
    </main>
  )
}
