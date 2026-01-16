import { Button } from 'antd'
import { useEffect, useState } from 'react'

import { Loading } from '@/components/ui/Loading'

// 定义数据类型
interface DashboardStats {
  message: string
  stats: {
    orders: number
    revenue: number
    users: number
  }
  timestamp: string
}

// 模拟异步数据加载
async function loadDashboardData(): Promise<DashboardStats> {
  // 模拟 3 秒的数据加载
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return {
    message: 'Dashboard loaded successfully!',
    stats: {
      orders: 567,
      revenue: 89012,
      users: 1234,
    },
    timestamp: new Date().toISOString(),
  }
}

export function Dashboard() {
  const [data, setData] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((error) => {
        console.error('加载数据失败:', error)
        setLoading(false)
      })
  }, [])

  // 显示 Loading 状态
  if (loading) {
    return <Loading />
  }

  // 数据加载失败
  if (!data) {
    return (
      <div className="m-4 rounded-lg bg-white/90 p-4 backdrop-blur-sm transition-colors duration-200 dark:bg-gray-800/90">
        <h1 className="text-2xl font-bold text-red-600">加载失败</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-200">无法加载 Dashboard 数据</p>
      </div>
    )
  }

  // 显示数据
  return (
    <div className="m-4 rounded-lg bg-white/90 p-4 backdrop-blur-sm transition-colors duration-200 dark:bg-gray-800/90">
      <h1 className="text-2xl font-bold text-gray-900 transition-colors duration-200 dark:text-white">Dashboard</h1>
      <p className="mt-2 text-lg text-gray-700 transition-colors duration-200 dark:text-gray-200">{data.message}</p>
      <p className="mt-2 text-sm text-gray-500 transition-colors duration-200 dark:text-gray-400">
        加载时间: {new Date(data.timestamp).toLocaleString()}
      </p>

      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-900 transition-colors duration-200 dark:text-white">统计数据</h2>
        <div className="mt-2 flex gap-4">
          <div className="rounded-lg bg-blue-50 p-3 text-blue-700 transition-colors duration-200 dark:bg-blue-900/30 dark:text-blue-300">
            用户数: {data.stats.users}
          </div>
          <div className="rounded-lg bg-green-50 p-3 text-green-700 transition-colors duration-200 dark:bg-green-900/30 dark:text-green-300">
            订单数: {data.stats.orders}
          </div>
          <div className="rounded-lg bg-purple-50 p-3 text-purple-700 transition-colors duration-200 dark:bg-purple-900/30 dark:text-purple-300">
            收入: ¥{data.stats.revenue}
          </div>
        </div>
      </div>

      <Button type="primary" className="mt-4">
        Primary Button
      </Button>
    </div>
  )
}
