import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Actions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div {...props} className={cls([props.className, styles.actions])}>
      {children}
    </div>
  )
}
