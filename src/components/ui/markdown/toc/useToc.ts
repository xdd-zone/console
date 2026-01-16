import { useEffect, useState } from 'react'

import type { TocItem, UseTocOptions } from './types'

const getHeadingLevel = (tagName: string): number => {
  const n = Number(tagName.replace(/^H/i, ''))
  return Number.isFinite(n) ? n : 6
}

const getScrollParent = (el: HTMLElement): Window | HTMLElement => {
  let node: HTMLElement | null = el.parentElement
  while (node) {
    const style = window.getComputedStyle(node)
    const overflowY = style.overflowY
    const isScrollableY =
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      node.scrollHeight > node.clientHeight
    if (isScrollableY) return node
    node = node.parentElement
  }
  return window
}

export const useToc = ({
  containerRef,
  maxLevel = 6,
  minLevel = 1,
}: UseTocOptions): {
  activeId: string
  items: TocItem[]
  progress: number
  scrollToTop: () => void
} => {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const nodes = Array.from(container.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'))
    const collected = nodes
      .map((el) => {
        const level = getHeadingLevel(el.tagName)
        const getHeadingText = (node: HTMLElement): string => {
          const textFromTextNodes = Array.from(node.childNodes)
            .map((n) => (n.nodeType === Node.TEXT_NODE ? (n.textContent ?? '') : ''))
            .join('')
          const raw = textFromTextNodes.length > 0 ? textFromTextNodes : (node.textContent ?? '')
          return raw.replace(/\s*#\s*$/, '').trim()
        }
        const text = getHeadingText(el as HTMLElement)
        const id = (el as HTMLElement).id
        return { id, level, text }
      })
      .filter((h) => h.level >= minLevel && h.level <= maxLevel && h.id.length > 0 && h.text.trim().length > 0)

    setItems(collected)
  }, [containerRef, minLevel, maxLevel])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scrollParent = getScrollParent(container)

    const computeProgress = (): void => {
      const headings = items
        .map((item) => ({ el: document.getElementById(item.id), item }))
        .filter((x): x is { el: HTMLElement; item: TocItem } => Boolean(x.el))

      let currentId = headings[0]?.item.id ?? ''
      for (const { el, item } of headings) {
        const top = el.getBoundingClientRect().top
        if (top <= 120) currentId = item.id
        else break
      }
      setActiveId(currentId)

      const rect = container.getBoundingClientRect()

      if (scrollParent === window) {
        const containerTop = rect.top + window.scrollY
        const containerHeight = Math.max(container.scrollHeight, rect.height)
        const viewportH = window.innerHeight
        const start = containerTop
        const end = Math.max(containerTop + containerHeight - viewportH, containerTop)
        const totalScrollable = Math.max(end - start, 1)
        const current = Math.min(Math.max(window.scrollY - start, 0), totalScrollable)
        const percent = Math.round((current / totalScrollable) * 100)
        setProgress(percent)
      } else {
        const sp = scrollParent as HTMLElement
        const spRect = sp.getBoundingClientRect()
        const start = rect.top - spRect.top + sp.scrollTop
        const containerHeight = Math.max(container.scrollHeight, rect.height)
        const end = Math.max(start + containerHeight - sp.clientHeight, start)
        const totalScrollable = Math.max(end - start, 1)
        const current = Math.min(Math.max(sp.scrollTop - start, 0), totalScrollable)
        const percent = Math.round((current / totalScrollable) * 100)
        setProgress(percent)
      }
    }

    computeProgress()

    const onScroll = (): void => computeProgress()
    const onResize = (): void => computeProgress()

    if (scrollParent === window) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
    } else {
      ;(scrollParent as HTMLElement).addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
    }

    return () => {
      if (scrollParent === window) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
      } else {
        ;(scrollParent as HTMLElement).removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
      }
    }
  }, [items, containerRef])

  const scrollToTop = (): void => {
    const container = containerRef.current
    if (!container) return
    const scrollParent = getScrollParent(container)
    const rect = container.getBoundingClientRect()
    if (scrollParent === window) {
      const top = rect.top + window.scrollY
      window.scrollTo({ behavior: 'smooth', top })
    } else {
      const sp = scrollParent as HTMLElement
      const spRect = sp.getBoundingClientRect()
      const top = rect.top - spRect.top + sp.scrollTop
      sp.scrollTo({ behavior: 'smooth', top })
    }
  }

  return { activeId, items, progress, scrollToTop }
}
