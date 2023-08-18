import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Header: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  children,
  ...props
}) => {
  return (
    <header {...props} className={cls([props.className, styles.header])}>
      {children}
    </header>
  )
}
