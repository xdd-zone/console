import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { useMobile } from '@/hooks/useMobile'
import { useTabBarStore } from '@/stores'

/**
 * 标签栏组件
 * 显示当前打开的页面标签，支持切换和关闭
 * 支持滚轮滚动和移动端触摸拖拽
 */
export function TabBar() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { activeTabId, closeTab, setActiveTab, tabs } = useTabBarStore()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // 处理标签页点击
  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId)
    navigate(path)
  }

  // 处理标签页关闭
  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation() // 阻止事件冒泡，避免触发标签页点击

    // 获取当前要关闭的标签页
    const tabToClose = tabs.find((tab) => tab.id === tabId)
    if (!tabToClose || tabToClose.closable === false) {
      return
    }

    // 如果关闭的是当前激活的标签页，需要先跳转到其他标签页
    if (activeTabId === tabId) {
      // 找到关闭后应该激活的标签页
      const currentIndex = tabs.findIndex((tab) => tab.id === tabId)
      let targetTab = null

      // 优先激活右侧标签页
      if (currentIndex < tabs.length - 1) {
        targetTab = tabs[currentIndex + 1]
      }
      // 如果没有右侧标签页，激活左侧标签页
      else if (currentIndex > 0) {
        targetTab = tabs[currentIndex - 1]
      }
      // 如果只有一个标签页，跳转到首页
      else {
        targetTab = tabs.find((tab) => tab.path === '/dashboard')
      }

      // 先跳转路由，再关闭标签
      if (targetTab) {
        navigate(targetTab.path)
      }
    }

    // 关闭标签页
    closeTab(tabId)
  }

  // 处理滚轮事件
  const handleWheel = (e: WheelEvent) => {
    if (!scrollContainerRef.current) return

    e.preventDefault()
    const container = scrollContainerRef.current
    const scrollAmount = e.deltaY || e.deltaX
    container.scrollLeft += scrollAmount
  }

  // 移动端触摸拖拽相关状态
  const touchStartX = useRef(0)
  const touchStartScrollLeft = useRef(0)
  const isDragging = useRef(false)

  // 处理触摸开始
  const handleTouchStart = (e: TouchEvent) => {
    if (!scrollContainerRef.current) return

    const touch = e.touches[0]
    touchStartX.current = touch.clientX
    touchStartScrollLeft.current = scrollContainerRef.current.scrollLeft
    isDragging.current = true
  }

  // 处理触摸移动
  const handleTouchMove = (e: TouchEvent) => {
    if (!scrollContainerRef.current || !isDragging.current) return

    e.preventDefault()
    const touch = e.touches[0]
    const deltaX = touchStartX.current - touch.clientX
    scrollContainerRef.current.scrollLeft = touchStartScrollLeft.current + deltaX
  }

  // 处理触摸结束
  const handleTouchEnd = () => {
    isDragging.current = false
  }

  // 绑定事件监听器
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // 桌面端滚轮事件
    if (!isMobile) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    // 移动端触摸事件
    if (isMobile) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (!isMobile) {
        container.removeEventListener('wheel', handleWheel)
      }
      if (isMobile) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isMobile])

  return (
    <div className="guide-tab-bar border-b border-gray-500 p-1 md:p-2">
      <div className="flex items-center justify-between">
        {/* 标签区域 */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex flex-1 items-center space-x-1 overflow-x-hidden"
          style={{
            msOverflowStyle: 'none', // IE/Edge
            scrollbarWidth: 'none', // Firefox
          }}
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.path)}
              className={`flex cursor-pointer items-center space-x-2 rounded border px-3 py-1.5 text-sm whitespace-nowrap transition-colors select-none ${
                activeTabId === tab.id
                  ? 'border-primary bg-primary-50 dark:bg-primary-900/20 dark:text-white'
                  : 'hover:bg-primary/40 border-gray-500 bg-white/50 hover:text-white dark:bg-transparent dark:text-white'
              } `}
            >
              <span>{t(tab.label)}</span>
              {tab.closable !== false && (
                <div
                  onClick={(e) => handleTabClose(e, tab.id)}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  <X size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
