import { cls } from "~/utils/helpers"
import styles from "./table.module.scss"

export const Cell: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cls([className, styles.cell])} {...props}>
      {children}
    </div>
  )
}
