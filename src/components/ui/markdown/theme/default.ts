import type { MarkdownTheme } from './types'

export const defaultMarkdownTheme: MarkdownTheme = {
  // 链接样式：统一外链与文本强调颜色、交互
  anchor: {
    a: 'underline-offset-2 hover:underline',
  },
  // 引用块：左侧强调条与浅色背景，提升区块可读性
  blockquote: {
    blockquote:
      'my-4 rounded-lg border-l-4 border-[var(--primary-color)] bg-black/5 p-4 text-black/80 italic dark:bg-white/5 dark:text-white/80',
  },
  // 代码块：容器、复制按钮与 `<pre>` 的样式
  code: {
    container: 'group relative my-4',
    copyButton:
      'absolute top-2 right-2 rounded-md border border-black/10 bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:border-white/10 dark:bg-white/20 dark:text-black cursor-pointer',
    pre: 'overflow-x-auto rounded-lg bg-black/5 p-3 text-sm dark:bg-white/5',
  },
  // 全局容器：控制排版与选区样式
  container: 'prose max-w-none selection:bg-[rgba(var(--primary-color-rgb),0.4)] selection:text-white',
  // 标题：分级字号与 hover 显示可复制锚点
  heading: {
    anchor: 'ml-2 opacity-0 group-hover:opacity-100',
    h1: 'mt-6 mb-3 text-3xl font-bold tracking-tight',
    h2: 'mt-5 mb-2 text-2xl font-semibold tracking-tight',
    h3: 'mt-4 mb-2 text-xl font-semibold',
    h4: 'mt-3 mb-1 text-lg font-semibold',
    h5: 'mt-3 mb-1 text-base font-semibold',
    h6: 'mt-3 mb-1 text-sm font-semibold uppercase tracking-wide',
  },
  // 分隔线：页面语义分隔
  hr: {
    hr: 'my-6 border-t border-black/10 dark:border-white/10',
  },
  // 图片：默认响应式与圆角
  image: {
    img: 'my-4 h-auto max-w-full rounded-lg',
  },
  // 行内文本样式：代码、删除线、斜体、加粗
  inline: {
    code: 'rounded bg-black/5 px-1.5 py-0.5 font-mono text-sm dark:bg-white/10',
    del: 'text-black/70 line-through decoration-rose-500 dark:text-white/70',
    em: 'italic text-black/90 dark:text-white/90',
    strong: 'font-semibold text-black dark:text-white',
  },
  // 列表：一致缩进与行高
  list: {
    li: 'leading-7',
    ol: 'my-3 list-decimal space-y-1 pl-6',
    ul: 'my-3 list-disc space-y-1 pl-6',
  },
  // 段落：基础行高
  paragraph: {
    p: 'leading-7',
  },
  // 表格：滚动容器与交替行背景
  table: {
    container: 'my-4 overflow-x-auto',
    table: 'w-full text-sm',
    tbody: '',
    td: 'border-b border-black/10 p-2 text-left align-top dark:border-white/10',
    th: 'border-b border-black/10 p-2 text-left font-medium dark:border-white/10',
    thead: 'bg-black/5 dark:bg-white/10',
    tr: 'odd:bg-transparent even:bg-black/5 dark:even:bg-white/5',
  },
}
