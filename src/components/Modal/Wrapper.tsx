import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      data-modal-prevent
      className={cls([className, styles.wrapper])}
      {...props}
    >
      {children}
    </div>
  )
}
