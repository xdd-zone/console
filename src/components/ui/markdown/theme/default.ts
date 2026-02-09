import type { MarkdownTheme } from './types'

export const defaultMarkdownTheme: MarkdownTheme = {
  // 链接样式：统一外链与文本强调颜色、交互
  anchor: {
    a: 'underline-offset-2 hover:underline text-[var(--color-primary)]',
  },
  // 引用块：左侧强调条与浅色背景，提升区块可读性
  blockquote: {
    blockquote:
      'my-4 rounded-lg border-l-4 border-[var(--color-primary)] bg-[var(--color-bg-secondary)] p-4 italic text-[var(--color-text-primary)]',
  },
  // 代码块：容器、复制按钮与 `<pre>` 的样式
  code: {
    container: 'group relative my-4',
    copyButton:
      'absolute top-2 right-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-2 py-1 text-xs text-[var(--color-text-primary)] opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer',
    pre: 'overflow-x-auto rounded-lg bg-[var(--color-bg-secondary)] p-3 text-sm text-[var(--color-text-primary)]',
  },
  // 全局容器：控制排版与选区样式
  container:
    'prose max-w-none selection:bg-[rgba(var(--primary-color-rgb),0.4)] selection:text-white text-[var(--color-text-primary)]',
  // 标题：分级字号与 hover 显示可复制锚点
  heading: {
    anchor: 'ml-2 opacity-0 group-hover:opacity-100 text-[var(--color-primary)]',
    h1: 'mt-6 mb-3 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]',
    h2: 'mt-5 mb-2 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]',
    h3: 'mt-4 mb-2 text-xl font-semibold text-[var(--color-text-primary)]',
    h4: 'mt-3 mb-1 text-lg font-semibold text-[var(--color-text-primary)]',
    h5: 'mt-3 mb-1 text-base font-semibold text-[var(--color-text-primary)]',
    h6: 'mt-3 mb-1 text-sm font-semibold uppercase tracking-wide text-[var(--color-text-primary)]',
  },
  // 分隔线：页面语义分隔
  hr: {
    hr: 'my-6 border-t border-[var(--color-border)]',
  },
  // 图片：默认响应式与圆角
  image: {
    img: 'my-4 h-auto max-w-full rounded-lg',
  },
  // 行内文本样式：代码、删除线、斜体、加粗
  inline: {
    code: 'rounded bg-[var(--color-bg-secondary)] px-1.5 py-0.5 font-mono text-sm text-[var(--color-text-primary)]',
    del: 'text-[var(--color-text-secondary)] line-through decoration-[var(--color-rosewater)]',
    em: 'italic text-[var(--color-text-primary)]',
    strong: 'font-semibold text-[var(--color-text-primary)]',
  },
  // 列表：一致缩进与行高
  list: {
    li: 'leading-7 text-[var(--color-text-primary)]',
    ol: 'my-3 list-decimal space-y-1 pl-6 text-[var(--color-text-primary)]',
    ul: 'my-3 list-disc space-y-1 pl-6 text-[var(--color-text-primary)]',
  },
  // 段落：基础行高
  paragraph: {
    p: 'leading-7 text-[var(--color-text-primary)]',
  },
  // 表格：滚动容器与交替行背景
  table: {
    container: 'my-4 overflow-x-auto',
    table: 'w-full text-sm',
    tbody: '',
    td: 'border-b border-[var(--color-border)] p-2 text-left align-top text-[var(--color-text-primary)]',
    th: 'border-b border-[var(--color-border)] p-2 text-left font-medium text-[var(--color-text-primary)]',
    thead: 'bg-[var(--color-bg-secondary)]',
    tr: 'odd:bg-transparent even:bg-[var(--color-bg-tertiary)]',
  },
}
