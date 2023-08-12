import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type GroupProps = {
  legend?: string
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>

export const Group: React.FC<GroupProps> = ({
  legend,
  className,
  children,
  ...props
}) => {
  return (
    <fieldset className={cls([className, styles.group])} {...props}>
      {legend ? <legend>{legend}</legend> : null}
      <div className={styles.groupContainer}>{children}</div>
    </fieldset>
  )
}
