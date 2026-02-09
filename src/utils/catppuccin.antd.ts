import type { ThemeConfig } from 'antd'

import theme from 'antd/es/theme'

/**
 * 获取 Catppuccin 主题的 Ant Design 配置
 * @param themeId - 主题 ID (latte | frappe | macchiato | mocha)
 * @returns Ant Design ThemeConfig
 */
export const getAntdThemeConfig = (themeId: string): ThemeConfig => {
  const isDark = themeId === 'macchiato' || themeId === 'mocha'

  const baseConfig = {
    components: {
      Button: {
        algorithm: true,
      },
      Layout: {
        colorBgBody: isDark ? '#1e1e2e' : '#eff1f5',
        colorBgHeader: isDark ? '#181825' : '#e6e9ef',
      },
      Menu: {
        itemSelectedBg: isDark ? '#181825' : '#e6e9ef',
        subMenuItemBg: isDark ? '#1e1e2e' : '#eff1f5',
      },
    },
    token: {
      // 圆角
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusSM: 6,
      // 字体
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
  }

  // Latte（亮色主题）
  if (themeId === 'latte') {
    return {
      ...baseConfig,
      algorithm: theme.defaultAlgorithm,
      components: {
        ...baseConfig.components,
        Button: {
          algorithm: true,
          colorPrimary: '#1e66f5',
        },
      },
      token: {
        ...baseConfig.token,
        // 背景色
        colorBgContainer: '#eff1f5',
        colorBgElevated: '#e6e9ef',
        colorBgLayout: '#eff1f5',
        // 边框颜色
        colorBorder: '#ccd0da',
        colorBorderSecondary: '#e6e9ef',
        colorError: '#d20f39',
        colorErrorBg: '#eff1f5',
        colorInfo: '#04a5e5',
        colorInfoBg: '#eff1f5',
        // 主色
        colorPrimary: '#1e66f5',
        colorPrimaryActive: '#1e66f5',
        colorPrimaryBg: '#eff1f5',
        colorPrimaryBgHover: '#e6e9ef',
        colorPrimaryBorder: '#ccd0da',
        colorPrimaryBorderHover: '#1e66f5',
        colorPrimaryHover: '#1e66f5',
        colorPrimaryText: '#1e66f5',
        colorPrimaryTextHover: '#1e66f5',
        // 状态颜色
        colorSuccess: '#40a02b',
        colorSuccessBg: '#eff1f5',
        // 文字颜色
        colorText: '#4c4f69',
        colorTextQuaternary: '#acb0be',
        colorTextSecondary: '#5c5f77',
        colorTextTertiary: '#8c8fa1',
        colorWarning: '#df8e1d',
        colorWarningBg: '#eff1f5',
      },
    }
  }

  // Frappé（亮色主题）
  if (themeId === 'frappe') {
    return {
      ...baseConfig,
      algorithm: theme.defaultAlgorithm,
      components: {
        ...baseConfig.components,
        Button: {
          algorithm: true,
          colorPrimary: '#8caaee',
        },
      },
      token: {
        ...baseConfig.token,
        // 背景色
        colorBgContainer: '#eff1f5',
        colorBgElevated: '#e6e9ef',
        colorBgLayout: '#eff1f5',
        // 边框颜色
        colorBorder: '#626483',
        colorBorderSecondary: '#838cc7',
        colorError: '#e78284',
        colorErrorBg: '#eff1f5',
        colorInfo: '#99d1db',
        colorInfoBg: '#eff1f5',
        // 主色
        colorPrimary: '#8caaee',
        colorPrimaryActive: '#85c1dc',
        colorPrimaryBg: '#eff1f5',
        colorPrimaryBgHover: '#e6e9ef',
        colorPrimaryBorder: '#626483',
        colorPrimaryBorderHover: '#8caaee',
        colorPrimaryHover: '#8caaee',
        colorPrimaryText: '#8caaee',
        colorPrimaryTextHover: '#8caaee',
        // 状态颜色
        colorSuccess: '#a6d189',
        colorSuccessBg: '#eff1f5',
        // 文字颜色
        colorText: '#626483',
        colorTextQuaternary: '#838cc7',
        colorTextSecondary: '#6c7086',
        colorTextTertiary: '#6c7086',
        colorWarning: '#e5c890',
        colorWarningBg: '#eff1f5',
      },
    }
  }

  // Macchiato（暗色主题）
  if (themeId === 'macchiato') {
    return {
      ...baseConfig,
      algorithm: theme.darkAlgorithm,
      components: {
        ...baseConfig.components,
        Button: {
          algorithm: true,
          colorPrimary: '#8aadf4',
        },
      },
      token: {
        ...baseConfig.token,
        // 背景色
        colorBgContainer: '#1e1e2e',
        colorBgElevated: '#181825',
        colorBgLayout: '#1e1e2e',
        // 边框颜色
        colorBorder: '#494d64',
        colorBorderSecondary: '#45475a',
        colorError: '#ed8796',
        colorErrorBg: '#1e1e2e',
        colorInfo: '#91d7e3',
        colorInfoBg: '#1e1e2e',
        // 主色
        colorPrimary: '#8aadf4',
        colorPrimaryActive: '#7dc4e4',
        colorPrimaryBg: '#1e1e2e',
        colorPrimaryBgHover: '#181825',
        colorPrimaryBorder: '#494d64',
        colorPrimaryBorderHover: '#8aadf4',
        colorPrimaryHover: '#8aadf4',
        colorPrimaryText: '#8aadf4',
        colorPrimaryTextHover: '#8aadf4',
        // 状态颜色
        colorSuccess: '#a6da95',
        colorSuccessBg: '#1e1e2e',
        // 文字颜色
        colorText: '#585b70',
        colorTextQuaternary: '#739ccc',
        colorTextSecondary: '#6c7086',
        colorTextTertiary: '#6c7086',
        colorWarning: '#eed49f',
        colorWarningBg: '#1e1e2e',
      },
    }
  }

  // Mocha（暗色主题，默认）
  return {
    ...baseConfig,
    algorithm: theme.darkAlgorithm,
    components: {
      ...baseConfig.components,
      Button: {
        algorithm: true,
        colorPrimary: '#89b4fa',
      },
    },
    token: {
      ...baseConfig.token,
      // 背景色
      colorBgContainer: '#1e1e2e',
      colorBgElevated: '#181825',
      colorBgLayout: '#1e1e2e',
      // 边框颜色
      colorBorder: '#45475a',
      colorBorderSecondary: '#313244',
      colorError: '#f38ba8',
      colorErrorBg: '#1e1e2e',
      colorInfo: '#89dceb',
      colorInfoBg: '#1e1e2e',
      // 主色
      colorPrimary: '#89b4fa',
      colorPrimaryActive: '#74c7ec',
      colorPrimaryBg: '#1e1e2e',
      colorPrimaryBgHover: '#181825',
      colorPrimaryBorder: '#45475a',
      colorPrimaryBorderHover: '#89b4fa',
      colorPrimaryHover: '#89b4fa',
      colorPrimaryText: '#89b4fa',
      colorPrimaryTextHover: '#89b4fa',
      // 状态颜色
      colorSuccess: '#a6e3a1',
      colorSuccessBg: '#1e1e2e',
      // 文字颜色
      colorText: '#cdd6f4',
      colorTextQuaternary: '#45475a',
      colorTextSecondary: '#a6adc8',
      colorTextTertiary: '#6c7086',
      colorWarning: '#f9e2af',
      colorWarningBg: '#1e1e2e',
    },
  }
}
