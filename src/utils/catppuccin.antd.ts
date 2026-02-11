import type { ThemeConfig } from 'antd'

import theme from 'antd/es/theme'

/**
 * Catppuccin 主题配置 for Ant Design
 * 参考 Catppuccin 官方色彩规范: https://github.com/catppuccin/catppuccin
 * Ant Design 主题定制: https://ant.design/docs/react/customize-theme-cn
 */

// ============ Latte (亮色主题) ============
const LATTE_TOKENS = {
  // Seed Token - 基础色基准
  colorTextBase: '#4c4f69',
  colorBgBase: '#eff1f5',

  // 主色 - Blue
  colorPrimary: '#1e66f5',
  colorPrimaryActive: '#1e66f5',
  colorPrimaryBg: '#eff1f5',
  colorPrimaryBgHover: '#e6e9ef',
  colorPrimaryBorder: '#dce0e8',
  colorPrimaryBorderHover: '#1e66f5',
  colorPrimaryHover: '#1e66f5',
  colorPrimaryText: '#1e66f5',
  colorPrimaryTextHover: '#1e66f5',

  // 成功 - Green
  colorSuccess: '#40a02b',
  colorSuccessBg: '#eff1f5',

  // 警告 - Yellow
  colorWarning: '#df8e1d',
  colorWarningBg: '#eff1f5',

  // 错误 - Red
  colorError: '#d20f39',
  colorErrorBg: '#eff1f5',

  // 信息 - Teal
  colorInfo: '#179299',
  colorInfoBg: '#eff1f5',

  // 背景色
  colorBgContainer: '#eff1f5',
  colorBgElevated: '#e6e9ef',
  colorBgLayout: '#eff1f5',

  // 边框颜色
  colorBorder: '#dce0e8',
  colorBorderSecondary: '#e6e9ef',

  // 文字颜色层级 (Catppuccin 规范)
  colorText: '#4c4f69', // Text
  colorTextSecondary: '#8c8fa1', // Text Muted
  colorTextTertiary: '#6c6f85', // Text Subtle
  colorTextQuaternary: '#9399b2', // 最浅文字
}

const LATTE_COMPONENTS = {
  Button: {
    colorPrimary: '#1e66f5',
  },
  Layout: {
    colorBgBody: '#eff1f5',
    colorBgHeader: '#e6e9ef',
  },
  Menu: {
    itemSelectedBg: '#e6e9ef',
    subMenuItemBg: '#eff1f5',
  },
  Input: {
    colorBgContainer: '#eff1f5',
    colorBorder: '#dce0e8',
    colorBorderHover: '#1e66f5',
    colorPrimaryHover: '#1e66f5',
  },
  Select: {
    colorBgContainer: '#eff1f5',
    colorBorder: '#dce0e8',
    colorPrimaryHover: '#1e66f5',
  },
  Table: {
    colorBorder: '#dce0e8',
    colorBorderSecondary: '#e6e9ef',
    headerBg: '#e6e9ef',
    rowHoverBg: '#e6e9ef',
  },
  Card: {
    colorBgContainer: '#eff1f5',
    colorBorder: '#dce0e8',
  },
  Modal: {
    colorBgContainer: '#eff1f5',
    colorBorder: '#dce0e8',
  },
  Dropdown: {
    colorBgContainer: '#e6e9ef',
  },
  Tabs: {
    colorPrimary: '#1e66f5',
    inkBarColor: '#1e66f5',
  },
}

// ============ Frappe (暗色主题) ============
const FRAPPE_TOKENS = {
  colorTextBase: '#c6d0f5',
  colorBgBase: '#303446',

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

  colorWarning: '#e5c890',
  colorWarningBg: '#303446',

  colorError: '#e78284',
  colorErrorBg: '#303446',

  colorInfo: '#81c8be',
  colorInfoBg: '#303446',

  colorBgContainer: '#303446',
  colorBgElevated: '#292c3c',
  colorBgLayout: '#303446',

  colorBorder: '#232634',
  colorBorderSecondary: '#414559',

  colorText: '#c6d0f5', // Text
  colorTextSecondary: '#a5adce', // Text Muted
  colorTextTertiary: '#8389a7', // Text Subtle
  colorTextQuaternary: '#6c7a9b', // 最浅文字
}

const FRAPPE_COMPONENTS = {
  Button: {
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
  Input: {
    colorBgContainer: '#303446',
    colorBorder: '#232634',
    colorBorderHover: '#8caaee',
    colorPrimaryHover: '#8caaee',
  },
  Select: {
    colorBgContainer: '#303446',
    colorBorder: '#232634',
    colorPrimaryHover: '#8caaee',
  },
  Table: {
    colorBorder: '#232634',
    colorBorderSecondary: '#414559',
    headerBg: '#292c3c',
    rowHoverBg: '#292c3c',
  },
  Card: {
    colorBgContainer: '#303446',
    colorBorder: '#232634',
  },
  Modal: {
    colorBgContainer: '#303446',
    colorBorder: '#232634',
  },
  Dropdown: {
    colorBgContainer: '#292c3c',
  },
  Tabs: {
    colorPrimary: '#8caaee',
    inkBarColor: '#8caaee',
  },
}

// ============ Macchiato (暗色主题) ============
const MACCHIATO_TOKENS = {
  colorTextBase: '#cad3f5',
  colorBgBase: '#24273a',

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

  colorWarning: '#eed49f',
  colorWarningBg: '#24273a',

  colorError: '#ed8796',
  colorErrorBg: '#24273a',

  colorInfo: '#8bd5ca',
  colorInfoBg: '#24273a',

  colorBgContainer: '#24273a',
  colorBgElevated: '#1e2030',
  colorBgLayout: '#24273a',

  colorBorder: '#181926',
  colorBorderSecondary: '#363a4f',

  colorText: '#cad3f5', // Text
  colorTextSecondary: '#a5adcb', // Text Muted
  colorTextTertiary: '#8a91b4', // Text Subtle
  colorTextQuaternary: '#7b8aab', // 最浅文字
}

const MACCHIATO_COMPONENTS = {
  Button: {
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
  Input: {
    colorBgContainer: '#24273a',
    colorBorder: '#181926',
    colorBorderHover: '#8aadf4',
    colorPrimaryHover: '#8aadf4',
  },
  Select: {
    colorBgContainer: '#24273a',
    colorBorder: '#181926',
    colorPrimaryHover: '#8aadf4',
  },
  Table: {
    colorBorder: '#181926',
    colorBorderSecondary: '#363a4f',
    headerBg: '#1e2030',
    rowHoverBg: '#1e2030',
  },
  Card: {
    colorBgContainer: '#24273a',
    colorBorder: '#181926',
  },
  Modal: {
    colorBgContainer: '#24273a',
    colorBorder: '#181926',
  },
  Dropdown: {
    colorBgContainer: '#1e2030',
  },
  Tabs: {
    colorPrimary: '#8aadf4',
    inkBarColor: '#8aadf4',
  },
}

// ============ Mocha (暗色主题 - 默认) ============
const MOCHA_TOKENS = {
  colorTextBase: '#cdd6f4',
  colorBgBase: '#1e1e2e',

  colorPrimary: '#89b4fa',
  colorPrimaryActive: '#74c7ec',
  colorPrimaryBg: '#1e1e2e',
  colorPrimaryBgHover: '#181825',
  colorPrimaryBorder: '#45475a',
  colorPrimaryBorderHover: '#89b4fa',
  colorPrimaryHover: '#89b4fa',
  colorPrimaryText: '#89b4fa',
  colorPrimaryTextHover: '#89b4fa',

  colorSuccess: '#a6e3a1',
  colorSuccessBg: '#1e1e2e',

  colorWarning: '#f9e2af',
  colorWarningBg: '#1e1e2e',

  colorError: '#f38ba8',
  colorErrorBg: '#1e1e2e',

  colorInfo: '#94e2d5',
  colorInfoBg: '#1e1e2e',

  colorBgContainer: '#1e1e2e',
  colorBgElevated: '#181825',
  colorBgLayout: '#1e1e2e',

  colorBorder: '#45475a',
  colorBorderSecondary: '#313244',

  colorText: '#cdd6f4', // Text
  colorTextSecondary: '#a6adc8', // Text Muted
  colorTextTertiary: '#9399b2', // Text Subtle
  colorTextQuaternary: '#7f849c', // 最浅文字
}

const MOCHA_COMPONENTS = {
  Button: {
    colorPrimary: '#89b4fa',
  },
  Layout: {
    colorBgBody: '#1e1e2e',
    colorBgHeader: '#181825',
  },
  Menu: {
    itemSelectedBg: '#181825',
    subMenuItemBg: '#1e1e2e',
  },
  Input: {
    colorBgContainer: '#1e1e2e',
    colorBorder: '#45475a',
    colorBorderHover: '#89b4fa',
    colorPrimaryHover: '#89b4fa',
  },
  Select: {
    colorBgContainer: '#1e1e2e',
    colorBorder: '#45475a',
    colorPrimaryHover: '#89b4fa',
  },
  Table: {
    colorBorder: '#45475a',
    colorBorderSecondary: '#313244',
    headerBg: '#181825',
    rowHoverBg: '#181825',
  },
  Card: {
    colorBgContainer: '#1e1e2e',
    colorBorder: '#45475a',
  },
  Modal: {
    colorBgContainer: '#1e1e2e',
    colorBorder: '#45475a',
  },
  Dropdown: {
    colorBgContainer: '#181825',
  },
  Tabs: {
    colorPrimary: '#89b4fa',
    inkBarColor: '#89b4fa',
  },
}

/**
 * 获取 Catppuccin 主题的 Ant Design 配置
 * @param themeId - 主题 ID (latte | frappe | macchiato | mocha)
 * @returns Ant Design ThemeConfig
 */
export const getAntdThemeConfig = (themeId: string): ThemeConfig => {
  const baseConfig = {
    token: {
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusSM: 6,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    components: {},
  }

  switch (themeId) {
    case 'latte':
      return {
        ...baseConfig,
        algorithm: theme.defaultAlgorithm,
        token: { ...baseConfig.token, ...LATTE_TOKENS },
        components: { ...LATTE_COMPONENTS },
      }

    case 'frappe':
      return {
        ...baseConfig,
        algorithm: theme.darkAlgorithm,
        token: { ...baseConfig.token, ...FRAPPE_TOKENS },
        components: { ...FRAPPE_COMPONENTS },
      }

    case 'macchiato':
      return {
        ...baseConfig,
        algorithm: theme.darkAlgorithm,
        token: { ...baseConfig.token, ...MACCHIATO_TOKENS },
        components: { ...MACCHIATO_COMPONENTS },
      }

    case 'mocha':
    default:
      return {
        ...baseConfig,
        algorithm: theme.darkAlgorithm,
        token: { ...baseConfig.token, ...MOCHA_TOKENS },
        components: { ...MOCHA_COMPONENTS },
      }
  }
}
