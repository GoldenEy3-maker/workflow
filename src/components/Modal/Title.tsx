import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3 className={cls([className, styles.title])} {...props}>
      {children}
    </h3>
  )
}
