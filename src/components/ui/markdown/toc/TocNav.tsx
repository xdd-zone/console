import type { FC, ReactElement } from 'react'

import { clsx } from 'clsx'

import type { TocItem } from './types'

export interface TocNavProps {
  activeId: string
  items: TocItem[]
}

export const TocNav: FC<TocNavProps> = ({ activeId, items }): ReactElement | null => {
  if (items.length === 0) return null
  return (
    <nav className="scrollbar-hide h-64 space-y-1 overflow-y-auto pr-1">
      {items.map((it, idx) => (
        <a
          key={`${it.id}-${idx}`}
          href={`#${it.id}`}
          className={clsx(
            'block truncate rounded px-2 py-1 transition-colors',
            it.level === 1 ? 'font-medium text-black! dark:text-white!' : 'text-black/50! dark:text-white/60!',
            'hover:text-black! dark:hover:text-white!',
            activeId === it.id ? 'text-black! dark:text-white!' : '',
          )}
          style={{ paddingLeft: `${Math.max(0, it.level - 2) * 12}px` }}
        >
          {it.text}
        </a>
      ))}
    </nav>
  )
}
