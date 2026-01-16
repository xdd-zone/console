import type { ColorPickerProps } from 'antd'

import { ColorPicker, Drawer, Space, Typography } from 'antd'
import { Layout, Lightbulb, Monitor, Moon, Palette, PanelLeft, PanelTop, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { ResponsiveTooltip } from '@/components/ui'
import { useSettingStore } from '@/stores/modules/setting'

const { Text, Title } = Typography

interface SettingDrawerProps {
  onClose: () => void
  open: boolean
}

/**
 * 设置抽屉组件
 * 包含布局切换等系统设置功能
 */
export function SettingDrawer({ onClose, open }: SettingDrawerProps) {
  const { t } = useTranslation()
  const { isDark, layoutMode, primaryColor, setLayoutMode, setPrimaryColor, setThemeMode, themeMode } =
    useSettingStore()

  const handleLayoutChange = (mode: 'leftRight' | 'topBottom') => {
    setLayoutMode(mode)
  }

  const handleColorChange: ColorPickerProps['onChange'] = (color) => {
    setPrimaryColor(color.toHexString())
  }

  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode)
  }

  return (
    <Drawer
      title={t('setting.systemSettings')}
      placement="right"
      onClose={onClose}
      open={open}
      width={320}
      classNames={{
        body: isDark ? 'bg-black-900' : '',
        footer: isDark ? 'bg-black-800 border-black-600' : '',
        header: isDark ? 'bg-black-800 border-black-600 text-white' : '',
        mask: isDark ? 'bg-black/50' : 'bg-black/25',
        wrapper: isDark ? 'text-white' : 'text-black-900',
      }}
      styles={{
        body: {
          color: isDark ? '#ffffff' : '#000000',
        },
        header: {
          borderBottom: `1px solid ${isDark ? '#4b5563' : '#e5e7eb'}`,
          color: isDark ? '#ffffff' : '#000000',
        },
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 主题模式设置 */}
        <div>
          <Title level={5}>
            <div className="dark:text-white">
              <Lightbulb className="mr-2" />
              {t('setting.themeMode')}
            </div>
          </Title>
          <Text className="dark:text-white" type="secondary">
            {t('setting.themeModeDescription')}
          </Text>
          <div style={{ marginTop: 12 }}>
            <Space direction="horizontal" style={{ width: '100%' }}>
              <ResponsiveTooltip title={t('theme.lightMode')}>
                <div
                  className={`hover:text-primary cursor-pointer text-2xl transition-colors ${themeMode === 'light' ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}
                  onClick={() => handleThemeChange('light')}
                >
                  <Sun />
                </div>
              </ResponsiveTooltip>
              <ResponsiveTooltip title={t('theme.darkMode')}>
                <div
                  className={`hover:text-primary cursor-pointer text-2xl transition-colors ${themeMode === 'dark' ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <Moon />
                </div>
              </ResponsiveTooltip>
              <ResponsiveTooltip title={t('theme.followSystem')}>
                <div
                  className={`hover:text-primary cursor-pointer text-2xl transition-colors ${themeMode === 'system' ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}
                  onClick={() => handleThemeChange('system')}
                >
                  <Monitor />
                </div>
              </ResponsiveTooltip>
            </Space>
          </div>
        </div>

        {/* 主题色设置 */}
        <div>
          <Title level={5}>
            <div className="dark:text-white">
              <Palette className="mr-2" />
              {t('setting.primaryColor')}
            </div>
          </Title>
          <Text className="dark:text-white" type="secondary">
            {t('setting.primaryColorDescription')}
          </Text>
          <div style={{ marginTop: 12 }}>
            <ColorPicker
              value={primaryColor}
              onChange={handleColorChange}
              showText
              size="large"
              format="hex"
              presets={[
                {
                  colors: ['#8200db', '#1677ff', '#00b96b', '#ff4d4f', '#fa8c16', '#722ed1', '#eb2f96', '#52c41a'],
                  label: t('setting.recommendedColors'),
                },
              ]}
            />
          </div>
        </div>

        {/* 布局设置 */}
        <div>
          <Title level={5}>
            <div className="dark:text-white">
              <Layout className="mr-2" />
              {t('setting.layoutMode')}
            </div>
          </Title>
          <Text className="dark:text-white" type="secondary">
            {t('setting.layoutModeDescription')}
          </Text>
          <div style={{ marginTop: 12 }}>
            <Space direction="horizontal" style={{ width: '100%' }}>
              {/* 左右布局图标 */}
              <ResponsiveTooltip title={t('setting.leftRightLayout')}>
                <div
                  className={`hover:text-primary cursor-pointer text-center text-2xl transition-colors ${layoutMode === 'leftRight' ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}
                  onClick={() => handleLayoutChange('leftRight')}
                >
                  <PanelLeft />
                </div>
              </ResponsiveTooltip>
              {/* 上下布局图标 */}
              <ResponsiveTooltip title={t('setting.topBottomLayout')}>
                <div
                  className={`hover:text-primary cursor-pointer text-center text-2xl transition-colors ${layoutMode === 'topBottom' ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}`}
                  onClick={() => handleLayoutChange('topBottom')}
                >
                  <PanelTop />
                </div>
              </ResponsiveTooltip>
            </Space>
          </div>
        </div>
      </Space>
    </Drawer>
  )
}
