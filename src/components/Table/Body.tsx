import { cls } from "~/utils/helpers"
import styles from "./table.module.scss"

export const Body: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cls([className, styles.body])} {...props}>
      {children}
    </div>
  )
}
