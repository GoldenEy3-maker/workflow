import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type RatingSpanProps = {
  value: number
} & React.HTMLAttributes<HTMLSpanElement>

const RatingSpan: React.FC<RatingSpanProps> = ({
  value,
  className,
  ...props
}) => {
  return (
    <span
      className={cls([className, styles.rating], {
        [styles._danger ?? ""]: value > 0 && value <= 1,
        [styles._warning ?? ""]: value > 1 && value < 4,
        [styles._success ?? ""]: value >= 4,
      })}
      {...props}
    >
      {value.toFixed(1)}
    </span>
  )
}
export default RatingSpan
