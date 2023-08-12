import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Actions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cls([className, styles.actions])} {...props}>
      {children}
    </div>
  )
}
