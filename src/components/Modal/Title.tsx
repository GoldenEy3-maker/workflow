import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => {
  return (
    <h3 {...props} className={cls([props.className, styles.title])}>
      {children}
    </h3>
  )
}
