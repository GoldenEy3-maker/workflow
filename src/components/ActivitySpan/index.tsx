import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type ActivitySpanProps = {
  value: number
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>

const ActivitySpan: React.FC<ActivitySpanProps> = (props) => {
  return (
    <span
      className={cls([props.className, styles.activitySpan], {
        [styles._danger ?? ""]: props.value >= 0 && props.value <= 20,
        [styles._warning ?? ""]: props.value > 20 && props.value < 70,
        [styles._success ?? ""]: props.value >= 70,
      })}
    >
      {props.value}%
    </span>
  )
}
export default ActivitySpan
