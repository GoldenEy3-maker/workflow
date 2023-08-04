import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type ProgressBarProps = {
  value: number
  danger?: boolean
  success?: boolean
  width?: number
  height?: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  width,
  height,
  danger,
  success,
}) => {
  const w = width ?? 100
  const h = height ?? 100
  const radius = Math.max(w, h) / 2 - 5
  const dashArray = 2 * Math.PI * radius
  const dashOffset = ((100 - value) / 100) * (Math.PI * (radius * 2))

  return (
    <div
      className={cls(
        [
          "relative flex items-center justify-center rounded-full text-title-l text-primary",
        ],
        {
          "text-danger": !!danger,
          "text-success": !!success,
        }
      )}
      style={
        {
          width: `${w}px`,
          height: `${h}px`,
          "--_anim-from": dashArray,
          "--_anim-to": dashOffset,
        } as React.CSSProperties
      }
    >
      <span>{value}%</span>
      <svg className="absolute h-full w-full">
        <circle
          className="stroke-surface-container stroke-[8px]"
          fill="none"
          cy={h / 2}
          cx={w / 2}
          r={radius}
        ></circle>
        <circle
          className="origin-center -rotate-90 stroke-current stroke-[8px]"
          fill="none"
          strokeLinecap="round"
          cy={w / 2}
          cx={h / 2}
          r={radius}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        ></circle>
      </svg>
    </div>
  )
}

export default ProgressBar
