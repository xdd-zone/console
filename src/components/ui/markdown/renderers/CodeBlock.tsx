import type { FC, JSX } from 'react'

import { clsx } from 'clsx'
import { Check, Copy, FileCode } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { SiGnubash, SiGo, SiJavascript, SiJson, SiPython, SiRust, SiTypescript } from 'react-icons/si'

import { useSettingStore } from '@/stores'

import {
  codeToHtml,
  createClientHighlighter,
  ensureLanguageLoaded,
  getLanguageFromClassName,
  normalizeCode,
} from '../core'
import { useMarkdownTheme } from '../theme/useTheme'

type PreProps = JSX.IntrinsicElements['pre']

// 仅在客户端创建一次 Shiki 高亮器实例
const useHighlighter = () => useMemo(() => createClientHighlighter(), [])

// 语言图标组件 - 提取到组件外部避免在渲染时创建组件
const LangIcon: FC<{ lang: string }> = ({ lang }) => {
  const l = lang.toLowerCase()
  if (['ts', 'tsx', 'typescript'].includes(l)) return <SiTypescript size={12} />
  if (['js', 'jsx', 'javascript'].includes(l)) return <SiJavascript size={12} />
  if (['py', 'python'].includes(l)) return <SiPython size={12} />
  if (['go', 'golang'].includes(l)) return <SiGo size={12} />
  if (['rs', 'rust'].includes(l)) return <SiRust size={12} />
  if (['bash', 'sh', 'shell'].includes(l)) return <SiGnubash size={12} />
  if (['json'].includes(l)) return <SiJson size={12} />
  return <FileCode size={12} />
}

/**
 * Markdown 代码块渲染组件：
 * - 客户端按需加载语言并生成高亮 HTML
 * - 高亮未就绪时回退为普通 <pre><code>
 * - 提供复制按钮便于一键复制代码
 */
export const CodeBlock: FC<PreProps> = ({ children, className }) => {
  const highlighter = useHighlighter()
  // 由 Shiki 生成的高亮 HTML 文本
  const [html, setHtml] = useState<string>('')
  const { isDark } = useSettingStore()
  const theme = useMarkdownTheme()
  const [copied, setCopied] = useState<boolean>(false)

  // 从子节点中提取原始代码与语言（例如 className: language-ts）
  const { code, language } = useMemo(() => {
    const child = children
    if (!child || typeof child !== 'object') return { code: '', language: 'text' }
    if ('props' in child) {
      const c = child.props as { children?: unknown; className?: string }
      const raw = typeof c.children === 'string' ? c.children : Array.isArray(c.children) ? c.children.join('') : ''
      return { code: normalizeCode(raw), language: getLanguageFromClassName(c.className ?? '') }
    }
    return { code: '', language: 'text' }
  }, [children])

  // 按需加载语言并生成高亮 HTML
  useEffect(() => {
    let disposed = false
    const run = async () => {
      if (!highlighter) return
      const lang = language || 'text'
      try {
        // 确保对应语言已加载（若语言不存在则忽略错误）
        await ensureLanguageLoaded(highlighter, lang)
      } catch {}
      // 使用 Shiki 将代码转换为 HTML，并根据当前主题模式选择高亮主题
      const htmlText = codeToHtml(highlighter, { code, lang, mode: isDark ? 'dark' : 'light' })
      if (!disposed) setHtml(htmlText)
    }
    run()
    return () => {
      // 避免卸载后仍然更新状态
      disposed = true
    }
  }, [code, highlighter, language, isDark])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(t)
  }, [copied])

  return (
    <div className={clsx(theme.code.container, 'markdown-code-with-lines', className)}>
      <style>
        {`
        .markdown-code-with-lines .shiki { counter-reset: md-code-line; }
        .markdown-code-with-lines .shiki { background-color: inherit !important; }
        .markdown-code-with-lines .shiki .line {
          position: relative;
          padding-left: 3rem;
        }
        .markdown-code-with-lines .shiki .line::before {
          counter-increment: md-code-line;
          content: counter(md-code-line);
          position: absolute;
          left: 0;
          width: 2.5rem;
          margin-right: 0.75rem;
          padding-right: 0.5rem;
          text-align: right;
          user-select: none;
          opacity: 0.6;
          border-right: 1px solid color-mix(in oklab, var(--shiki-foreground) 40%, transparent);
        }
        `}
      </style>
      {html ? (
        // 插入由 Shiki 生成的高亮 HTML 结构
        <div className="rounded-md p-4 backdrop-blur-sm" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        // 高亮未就绪时的降级显示
        <pre className={clsx(theme.code.pre)}>
          <code>{code}</code>
        </pre>
      )}
      <div
        className={clsx(
          'code-lang-badge absolute right-2 bottom-2 flex items-center gap-1 rounded-md px-2 py-1 text-xs',
          isDark ? 'text-white' : 'text-gray-900',
        )}
      >
        <LangIcon lang={language} />
      </div>
      <button
        type="button"
        aria-label={copied ? 'Copied' : 'Copy'}
        onClick={() => navigator.clipboard?.writeText(code).then(() => setCopied(true))}
        className={clsx(theme.code.copyButton)}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  )
}
