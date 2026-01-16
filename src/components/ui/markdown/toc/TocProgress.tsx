import type { FC, ReactElement } from 'react'

export interface TocProgressProps {
  progress: number
}

export const TocProgress: FC<TocProgressProps> = ({ progress }): ReactElement => {
  const clamped = Math.min(Math.max(progress, 0), 100)
  const radius = 8
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - clamped / 100)
  return (
    <div className="flex items-center gap-2 text-black/70 dark:text-white/70">
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r={radius} fill="none" stroke="rgba(var(--primary-color-rgb), 0.25)" strokeWidth="3" />
        <circle
          cx="10"
          cy="10"
          r={radius}
          fill="none"
          stroke="var(--primary-color)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 10 10)"
        />
      </svg>
      <span className="text-sm font-medium text-black/80 dark:text-white/80">{clamped}%</span>
    </div>
  )
}
