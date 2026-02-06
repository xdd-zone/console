import type { HighlighterCore, LanguageInput } from 'shiki'
import type { BundledLanguage } from 'shiki/langs'
import type { BundledTheme } from 'shiki/themes'
import type { CodeToHastOptions } from 'shiki/types.mjs'

import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import { createHighlighterCoreSync, createJavaScriptRegexEngine } from 'shiki'
import catppuccinLatte from 'shiki/themes/catppuccin-latte.mjs'
import catppuccinMocha from 'shiki/themes/catppuccin-mocha.mjs'

export * from './helpers'

/**
 * 在浏览器端创建 Shiki 高亮器核心：
 * - SSR 环境（无 window）返回 null
 * - 使用 JavaScript 正则引擎
 * - 预加载 Catppuccin 深浅主题
 */
let singleton: HighlighterCore | null = null

export const createClientHighlighter = (): HighlighterCore | null => {
  if (typeof window === 'undefined') return null
  const key = '__shiki_highlighter_singleton__'
  const store = globalThis as unknown as Record<string, unknown>
  const cached = store[key] as unknown as HighlighterCore | undefined
  if (cached) return cached
  if (singleton) return singleton
  const engine = createJavaScriptRegexEngine()
  singleton = createHighlighterCoreSync({ engine, langs: [], themes: [catppuccinMocha, catppuccinLatte] })
  store[key] = singleton
  return singleton
}

let langLoaderCache: Record<string, LanguageInput> | null = null

/**
 * 获取语言加载器（带缓存）：
 * - 首次调用时缓存整个 bundledLanguages 模块
 * - 后续调用直接从缓存读取，避免重复导入
 */
const getLangLoader = async (lang: string) => {
  if (!langLoaderCache) {
    const { bundledLanguages } = await import('shiki/langs')
    langLoaderCache = bundledLanguages as Record<string, LanguageInput>
  }
  return langLoaderCache[lang]
}

/**
 * 确保指定语言已加载到高亮器：
 * - 从缓存的 bundledLanguages 获取语言加载器
 * - 若语言已加载或不存在对应 loader，则跳过
 */
export const ensureLanguageLoaded = async (highlighter: HighlighterCore, lang: string) => {
  const loader = await getLangLoader(lang)
  if (!loader) return
  const loaded = highlighter.getLoadedLanguages().includes(lang)
  if (!loaded) {
    const mod = typeof loader === 'function' ? await loader() : loader
    await highlighter.loadLanguage(mod as LanguageInput)
  }
}

/**
 * 将代码转换为带有主题与标注的 HTML 字符串：
 * - 支持暗/亮主题切换（catppuccin-mocha / catppuccin-latte）
 * - 支持 diff、高亮、单词高亮、行高亮等标注
 */
export const codeToHtml = (
  highlighter: HighlighterCore,
  { attrs, code, lang, mode }: { attrs?: string; code: string; lang: string; mode?: 'dark' | 'light' },
) => {
  const common = {
    lang,
    meta: { __raw: attrs ?? '' },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerMetaHighlight(),
    ],
  } satisfies Pick<CodeToHastOptions<BundledLanguage, BundledTheme>, 'lang' | 'meta' | 'transformers'>

  const options: CodeToHastOptions<BundledLanguage, BundledTheme> = mode
    ? {
        ...common,
        theme: mode === 'dark' ? 'catppuccin-mocha' : 'catppuccin-latte',
      }
    : {
        ...common,
        themes: { dark: 'catppuccin-mocha', light: 'catppuccin-latte' },
      }

  return highlighter.codeToHtml(code, options)
}
