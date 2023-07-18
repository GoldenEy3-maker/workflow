import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type ProgressBarProps = {
  value: number
  isDanger?: boolean
  isSuccess?: boolean
  width?: number
  height?: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  width,
  height,
  isDanger,
  isSuccess,
}) => {
  const w = width ?? 100
  const h = height ?? 100
  const radius = Math.max(w, h) / 2 - 5
  const dashArray = 2 * Math.PI * radius
  const dashOffset = ((100 - value) / 100) * (Math.PI * (radius * 2))

  return (
    <div
      className={cls([styles.progressCircle], {
        [styles.danger]: !!isDanger,
        [styles.success]: !!isSuccess,
      })}
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
      <svg>
        <circle
          className={styles.bg}
          fill="none"
          cy={h / 2}
          cx={w / 2}
          r={radius}
        ></circle>
        <circle
          className={styles.progress}
          fill="none"
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
