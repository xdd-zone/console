import type { FC, JSX } from 'react'

import { clsx } from 'clsx'

import { useMarkdownTheme } from '../theme/useTheme'
import { extractText, slugify } from '../utils/slugify'

/**
 * H1 标题：自动从子节点抽取文本生成 slug，并插入可复制锚点
 * - 通过 `extractText` 支持复杂子节点文本聚合
 * - 使用 `slugify` 生成稳定的 `id`，便于目录与定位
 */
export const H1: FC<JSX.IntrinsicElements['h1']> = ({ children, className, ...rest }) => {
  const theme = useMarkdownTheme()
  const text = extractText(children)
  const id = slugify(text)
  return (
    <h1 {...rest} id={id} className={clsx('group', theme.heading.h1, className)}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          className={clsx(theme.heading.anchor)}
          aria-label="Anchor"
          style={{ color: 'var(--primary-color)' }}
        >
          #
        </a>
      ) : null}
    </h1>
  )
}

/**
 * H2 标题：与 H1 同逻辑，生成锚点以支持目录跳转
 */
export const H2: FC<JSX.IntrinsicElements['h2']> = ({ children, className, ...rest }) => {
  const theme = useMarkdownTheme()
  const text = extractText(children)
  const id = slugify(text)
  return (
    <h2 {...rest} id={id} className={clsx('group', theme.heading.h2, className)}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          className={clsx(theme.heading.anchor)}
          aria-label="Anchor"
          style={{ color: 'var(--primary-color)' }}
        >
          #
        </a>
      ) : null}
    </h2>
  )
}

/**
 * H3 标题：同样支持自动锚点与 hover 显示的 `#`
 */
export const H3: FC<JSX.IntrinsicElements['h3']> = ({ children, className, ...rest }) => {
  const theme = useMarkdownTheme()
  const text = extractText(children)
  const id = slugify(text)
  return (
    <h3 {...rest} id={id} className={clsx('group', theme.heading.h3, className)}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          className={clsx(theme.heading.anchor)}
          aria-label="Anchor"
          style={{ color: 'var(--primary-color)' }}
        >
          #
        </a>
      ) : null}
    </h3>
  )
}

/**
 * H4 标题：最小改动的层级标题渲染，便于结构化内容展示
 */
export const H4: FC<JSX.IntrinsicElements['h4']> = ({ children, className, ...rest }) => {
  const theme = useMarkdownTheme()
  const text = extractText(children)
  const id = slugify(text)
  return (
    <h4 {...rest} id={id} className={clsx('group', theme.heading.h4, className)}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          className={clsx(theme.heading.anchor)}
          aria-label="Anchor"
          style={{ color: 'var(--primary-color)' }}
        >
          #
        </a>
      ) : null}
    </h4>
  )
}

/**
 * H5 标题：用于更细粒度的内容分组，仍保持可定位能力
 */
export const H5: FC<JSX.IntrinsicElements['h5']> = ({ children, className, ...rest }) => {
  const theme = useMarkdownTheme()
  const text = extractText(children)
  const id = slugify(text)
  return (
    <h5 {...rest} id={id} className={clsx('group', theme.heading.h5, className)}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          className={clsx(theme.heading.anchor)}
          aria-label="Anchor"
          style={{ color: 'var(--primary-color)' }}
        >
          #
        </a>
      ) : null}
    </h5>
  )
}

/**
 * H6 标题：最小字号层级标题，保留锚点及可复制特性
 */
export const H6: FC<JSX.IntrinsicElements['h6']> = ({ children, className, ...rest }) => {
  const theme = useMarkdownTheme()
  const text = extractText(children)
  const id = slugify(text)
  return (
    <h6 {...rest} id={id} className={clsx('group', theme.heading.h6, className)}>
      {children}
      {id ? (
        <a href={`#${id}`} className={clsx(theme.heading.anchor)} aria-label="Anchor">
          #
        </a>
      ) : null}
    </h6>
  )
}
