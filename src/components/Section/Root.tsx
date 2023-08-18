import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Root: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => {
  return (
    <section {...props} className={cls([props.className, styles.root])}>
      {children}
    </section>
  )
}
