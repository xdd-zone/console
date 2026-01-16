import { Drawer } from 'antd'
import { useTranslation } from 'react-i18next'

import { router } from '@/router'
import { useSettingStore } from '@/stores'
import { generateAntdMenuItems } from '@/utils/routeUtils'

import { NavigationMenu } from '../menu/NavigationMenu'

/**
 * 移动端左侧菜单抽屉
 * 在小屏幕显示侧边栏菜单
 */
export function MobileDrawer() {
  const { t } = useTranslation()
  const { isDark, isMobileMenuOpen, setMobileMenuOpen } = useSettingStore()

  const menuItems = generateAntdMenuItems(router.routes, t)

  const onClose = () => setMobileMenuOpen(false)

  return (
    <Drawer
      placement="left"
      open={isMobileMenuOpen}
      onClose={onClose}
      width={264}
      maskClosable
      classNames={{
        body: isDark ? 'bg-black-900' : '',
        header: isDark ? 'bg-black-800 border-black-600 text-white' : '',
        mask: isDark ? 'bg-black/50' : 'bg-black/25',
        wrapper: isDark ? 'text-white' : 'text-black-900',
      }}
      styles={{
        body: {
          padding: '0px',
        },
      }}
    >
      <NavigationMenu mode="inline" items={menuItems} />
    </Drawer>
  )
}
