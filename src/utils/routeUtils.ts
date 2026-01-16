import type { MenuProps } from 'antd'
import type { LucideProps } from 'lucide-react'
import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router'

import React from 'react'

import type { RouteHandle } from '@/router/types'
import type { Tab } from '@/stores'

import { router } from '@/router/router'
import { RouteType } from '@/router/types'

type MenuItem = Required<MenuProps>['items'][number]

interface MenuItemWithOrder {
  children?: MenuItemWithOrder[]
  icon?: React.ReactNode
  key: React.Key
  label: React.ReactNode
  order?: number
}

/**
 * 渲染图标组件
 * @param IconComponent 图标组件
 * @returns JSX 元素或 null
 */
function renderIcon(IconComponent?: ComponentType<LucideProps>): React.ReactNode {
  if (!IconComponent) return null
  return React.createElement(IconComponent, { size: 16 })
}

/**
 * 从路由配置中生成 Antd Menu 数据结构
 * @param routes 路由配置数组
 * @param t 翻译函数
 * @returns Antd Menu items 数组
 */
export function generateAntdMenuItems(routes: RouteObject[], t?: (key: string) => string): MenuItem[] {
  const menuItems: MenuItemWithOrder[] = []

  function processRoute(route: RouteObject & { handle?: RouteHandle }, parentPath = ''): MenuItemWithOrder | null {
    // 处理React Router处理后的路由对象
    const handle = route.handle as RouteHandle | undefined
    const routePath = route.path || ''

    // 构建完整路径
    let fullPath = routePath
    if (parentPath && routePath && !routePath.startsWith('/')) {
      fullPath = `${parentPath}/${routePath}`.replace(/\/+/g, '/')
    } else if (routePath.startsWith('/')) {
      fullPath = routePath
    } else if (parentPath) {
      fullPath = parentPath
    }

    // 只处理菜单类型的路由，默认为菜单类型
    const routeType = handle?.type || RouteType.MENU
    if (routeType !== RouteType.MENU) {
      return null
    }

    // 如果没有标题，跳过该路由
    if (!handle?.title) {
      return null
    }

    // 处理子路由（先处理子路由，再决定是否显示父级）
    let children: MenuItemWithOrder[] | undefined
    if (route.children && route.children.length > 0) {
      const childMenuItems: MenuItemWithOrder[] = []

      for (const childRoute of route.children) {
        const childMenuItem = processRoute(childRoute, fullPath)
        if (childMenuItem) {
          childMenuItems.push(childMenuItem)
        }
      }

      if (childMenuItems.length > 0) {
        // 按 order 排序
        children = childMenuItems.sort((a, b) => {
          const orderA = a.order || 999
          const orderB = b.order || 999
          return orderA - orderB
        })
      } else {
        // 如果有子路由定义但没有一个子路由有权限，则不显示该父级菜单
        return null
      }
    }

    // 创建菜单项
    const menuItem: MenuItemWithOrder = {
      children,
      icon: renderIcon(handle?.icon),
      key: fullPath,
      label: t ? t(handle.title) : handle.title,
      order: handle.order || 999,
    }

    return menuItem
  }

  // 处理所有路由
  for (const route of routes) {
    // 如果是根路由，处理其子路由
    if (route.path === '/' && route.children) {
      for (const childRoute of route.children) {
        const menuItem = processRoute(childRoute)
        if (menuItem) {
          menuItems.push(menuItem)
        }
      }
    } else {
      const menuItem = processRoute(route)
      if (menuItem) {
        menuItems.push(menuItem)
      }
    }
  }

  // 按 order 排序并返回
  const sortedItems = menuItems.sort((a, b) => {
    const orderA = a.order || 999
    const orderB = b.order || 999
    return orderA - orderB
  })

  // 转换为 MenuItem 类型
  return sortedItems.map((item) => ({
    children: item.children?.map((child) => ({
      children: child.children?.map((grandChild) => ({
        children: grandChild.children,
        icon: grandChild.icon,
        key: grandChild.key,
        label: grandChild.label,
      })),
      icon: child.icon,
      key: child.key,
      label: child.label,
    })),
    icon: item.icon,
    key: item.key,
    label: item.label,
  }))
}

/**
 * 生成标签页ID
 * 基于路径生成唯一标识符
 */
function generateTabId(path: string): string {
  return path.replace(/\//g, '-').replace(/^-/, '') || 'home'
}

/**
 * 从路由配置中查找路由信息
 * @param routes 路由配置数组
 * @param targetPath 目标路径
 * @param parentPath 父路径
 * @returns 匹配的路由对象或null
 */
function findRouteByPath(
  routes: RouteObject[],
  targetPath: string,
  parentPath = '',
): (RouteObject & { handle?: RouteHandle }) | null {
  for (const route of routes) {
    const routePath = route.path || ''

    // 构建完整路径
    let fullPath = routePath
    if (parentPath && routePath && !routePath.startsWith('/')) {
      fullPath = `${parentPath}/${routePath}`.replace(/\/+/g, '/')
    } else if (routePath.startsWith('/')) {
      fullPath = routePath
    } else if (parentPath) {
      fullPath = parentPath
    }

    // 检查是否匹配目标路径
    if (fullPath === targetPath) {
      return route as RouteObject & { handle?: RouteHandle }
    }

    // 递归查找子路由
    if (route.children && route.children.length > 0) {
      const childResult = findRouteByPath(route.children, targetPath, fullPath)
      if (childResult) {
        return childResult
      }
    }
  }

  return null
}

/**
 * 检查路由是否有实际的组件（不仅仅是重定向）
 * @param route 路由对象
 * @returns 是否有实际组件
 */
function hasActualComponent(route: RouteObject): boolean {
  // 如果有 Component 或 lazy 属性，说明有实际组件
  if (route.Component || route.lazy) {
    return true
  }

  // 如果有 element 且不是 Navigate 重定向，说明有实际组件
  if (route.element) {
    // 检查是否是 Navigate 组件（重定向）
    const elementType = (route.element as React.ReactElement)?.type
    if (typeof elementType === 'function' && elementType.name === 'Navigate') {
      return false
    }
    return true
  }

  // 如果只有 index: true，通常是重定向路由
  if (route.index === true) {
    return false
  }

  return false
}

/**
 * 从路由配置中获取标签页信息
 * @param path 路由路径
 * @returns Tab对象或null
 */
export function getTabFromRoute(path: string): Tab | null {
  // 获取所有路由配置
  const allRoutes = router.routes

  // 查找匹配的路由
  const matchedRoute = findRouteByPath(allRoutes, path)

  if (!matchedRoute?.handle) {
    // 如果没有找到路由配置，尝试生成默认标签页
    const segments = path.split('/').filter(Boolean)
    if (segments.length === 0) return null

    const label = segments[segments.length - 1]
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    return {
      closable: true,
      id: generateTabId(path),
      label,
      path,
    }
  }

  const handle = matchedRoute.handle

  // 处理菜单和隐藏类型的路由，因为它们都可能作为标签页显示
  const routeType = handle.type || RouteType.MENU
  if ((routeType !== RouteType.MENU && routeType !== RouteType.HIDDEN) || !handle.title) {
    return null
  }

  // 检查路由是否有实际的组件
  // 如果没有实际组件（只是重定向或容器路由），不创建标签
  if (!hasActualComponent(matchedRoute)) {
    return null
  }

  return {
    closable: path !== '/dashboard', // 仪表盘不可关闭
    icon: handle.icon?.name, // 获取图标名称
    id: generateTabId(path),
    label: handle.title,
    path,
  }
}
