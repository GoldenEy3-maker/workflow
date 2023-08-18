import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Wrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      data-modal-prevent
      className={cls([props.className, styles.wrapper])}
    >
      {children}
    </div>
  )
}
