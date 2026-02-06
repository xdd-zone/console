import type { FC, JSX } from 'react'

import { clsx } from 'clsx'

import { useMarkdownTheme } from '../theme/useTheme'
import { extractText, slugify } from '../utils/slugify'

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6): FC<JSX.IntrinsicElements[`h${typeof level}`]> => {
  return ({ children, className, ...rest }) => {
    const theme = useMarkdownTheme()
    const text = extractText(children)
    const id = slugify(text)

    const headingProps = {
      ...rest,
      className: clsx('group', theme.heading[`h${level}`], className),
      id,
    }

    const anchor = id ? (
      <a
        href={`#${id}`}
        className={clsx(theme.heading.anchor)}
        aria-label="Anchor"
        style={{ color: 'var(--primary-color)' }}
      >
        #
      </a>
    ) : null

    return (
      <div style={{ display: 'contents' }}>
        {level === 1 && (
          <h1 {...headingProps}>
            {children}
            {anchor}
          </h1>
        )}
        {level === 2 && (
          <h2 {...headingProps}>
            {children}
            {anchor}
          </h2>
        )}
        {level === 3 && (
          <h3 {...headingProps}>
            {children}
            {anchor}
          </h3>
        )}
        {level === 4 && (
          <h4 {...headingProps}>
            {children}
            {anchor}
          </h4>
        )}
        {level === 5 && (
          <h5 {...headingProps}>
            {children}
            {anchor}
          </h5>
        )}
        {level === 6 && (
          <h6 {...headingProps}>
            {children}
            {anchor}
          </h6>
        )}
      </div>
    )
  }
}

export const H1 = createHeading(1)
export const H2 = createHeading(2)
export const H3 = createHeading(3)
export const H4 = createHeading(4)
export const H5 = createHeading(5)
export const H6 = createHeading(6)
