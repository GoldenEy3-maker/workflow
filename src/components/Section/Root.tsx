import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Root: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <section className={cls([className, styles.root])} {...props}>
      {children}
    </section>
  )
}
