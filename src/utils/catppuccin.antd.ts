import type { ThemeConfig } from 'antd'

import theme from 'antd/es/theme'

/**
 * 获取 Catppuccin 主题的 Ant Design 配置
 * @param themeId - 主题 ID (latte | frappe | macchiato | mocha)
 * @returns Ant Design ThemeConfig
 */
export const getAntdThemeConfig = (themeId: string): ThemeConfig => {
  const isDark = themeId === 'frappe' || themeId === 'macchiato' || themeId === 'mocha'

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
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusSM: 6,
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
        colorBorder: '#dce0e8',
        colorBorderSecondary: '#e6e9ef',
        colorError: '#d20f39',
        colorErrorBg: '#eff1f5',
        colorInfo: '#179299',
        colorInfoBg: '#eff1f5',
        // 主色
        colorPrimary: '#1e66f5',
        colorPrimaryActive: '#1e66f5',
        colorPrimaryBg: '#eff1f5',
        colorPrimaryBgHover: '#e6e9ef',
        colorPrimaryBorder: '#dce0e8',
        colorPrimaryBorderHover: '#1e66f5',
        colorPrimaryHover: '#1e66f5',
        colorPrimaryText: '#1e66f5',
        colorPrimaryTextHover: '#1e66f5',
        // 状态颜色
        colorSuccess: '#40a02b',
        colorSuccessBg: '#eff1f5',
        // 文字颜色 - 根据 Catppuccin 指南
        colorText: '#4c4f69',
        colorTextQuaternary: '#8c8fa1',
        colorTextSecondary: '#5c5f77',
        colorTextTertiary: '#6c6f85',
        colorWarning: '#df8e1d',
        colorWarningBg: '#eff1f5',
      },
    }
  }

  // Frappe（暗色主题）
  if (themeId === 'frappe') {
    return {
      ...baseConfig,
      algorithm: theme.darkAlgorithm,
      components: {
        ...baseConfig.components,
        Button: {
          algorithm: true,
          colorPrimary: '#8caaee',
        },
        Layout: {
          colorBgBody: '#303446',
          colorBgHeader: '#292c3c',
        },
        Menu: {
          itemSelectedBg: '#292c3c',
          subMenuItemBg: '#303446',
        },
      },
      token: {
        ...baseConfig.token,
        colorBgContainer: '#303446',
        colorBgElevated: '#292c3c',
        colorBgLayout: '#303446',
        colorBorder: '#232634',
        colorBorderSecondary: '#414559',
        colorError: '#e78284',
        colorErrorBg: '#303446',
        colorInfo: '#81c8be',
        colorInfoBg: '#303446',
        colorPrimary: '#8caaee',
        colorPrimaryActive: '#85c1dc',
        colorPrimaryBg: '#303446',
        colorPrimaryBgHover: '#292c3c',
        colorPrimaryBorder: '#232634',
        colorPrimaryBorderHover: '#8caaee',
        colorPrimaryHover: '#8caaee',
        colorPrimaryText: '#8caaee',
        colorPrimaryTextHover: '#8caaee',
        colorSuccess: '#a6d189',
        colorSuccessBg: '#303446',
        // 文字颜色
        colorText: '#c6d0f5',
        colorTextQuaternary: '#a5adce',
        colorTextSecondary: '#b5bfe2',
        colorTextTertiary: '#8389a7',
        colorWarning: '#e5c890',
        colorWarningBg: '#303446',
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
        Layout: {
          colorBgBody: '#24273a',
          colorBgHeader: '#1e2030',
        },
        Menu: {
          itemSelectedBg: '#1e2030',
          subMenuItemBg: '#24273a',
        },
      },
      token: {
        ...baseConfig.token,
        colorBgContainer: '#24273a',
        colorBgElevated: '#1e2030',
        colorBgLayout: '#24273a',
        colorBorder: '#181926',
        colorBorderSecondary: '#363a4f',
        colorError: '#ed8796',
        colorErrorBg: '#24273a',
        colorInfo: '#8bd5ca',
        colorInfoBg: '#24273a',
        colorPrimary: '#8aadf4',
        colorPrimaryActive: '#7dc4e4',
        colorPrimaryBg: '#24273a',
        colorPrimaryBgHover: '#1e2030',
        colorPrimaryBorder: '#181926',
        colorPrimaryBorderHover: '#8aadf4',
        colorPrimaryHover: '#8aadf4',
        colorPrimaryText: '#8aadf4',
        colorPrimaryTextHover: '#8aadf4',
        colorSuccess: '#a6da95',
        colorSuccessBg: '#24273a',
        // 文字颜色
        colorText: '#cad3f5',
        colorTextQuaternary: '#a5adcb',
        colorTextSecondary: '#b8c0e0',
        colorTextTertiary: '#8a91b4',
        colorWarning: '#eed49f',
        colorWarningBg: '#24273a',
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
      colorInfo: '#94e2d5',
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
      // 文字颜色 - 根据 Catppuccin 指南
      colorText: '#cdd6f4',
      colorTextQuaternary: '#a6adc8',
      colorTextSecondary: '#a6adc8',
      colorTextTertiary: '#9399b2',
      colorWarning: '#f9e2af',
      colorWarningBg: '#1e1e2e',
    },
  }
}
