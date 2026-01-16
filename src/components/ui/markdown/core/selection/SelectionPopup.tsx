import type { CSSProperties } from 'react'

interface SelectionPopupProps {
  onCopy: () => void
  position: { left: number; top: number } | null
  visible: boolean
}

/**
 * SelectionPopup：文本选择操作弹窗
 * - 在容器内选中文本后，显示“复制”按钮，位置贴近选区末端
 * - 通过 `visible` 与 `position` 控制展示与定位
 */
export function SelectionPopup({ onCopy, position, visible }: SelectionPopupProps) {
  if (!visible || !position) return null
  const style: CSSProperties = { left: position.left, position: 'absolute', top: position.top, zIndex: 50 }
  return (
    <div style={style} className="select-none">
      <div className="rounded-md border border-black/10 bg-white px-2 py-1 text-sm shadow-md dark:border-white/10 dark:bg-neutral-800">
        <button
          type="button"
          onClick={onCopy}
          className="cursor-pointer rounded px-2 py-0.5 transition-all hover:bg-black/5 dark:hover:bg-white/10"
        >
          复制
        </button>
      </div>
    </div>
  )
}
