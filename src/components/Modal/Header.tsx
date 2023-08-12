import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Header: React.FC<React.HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <header className={cls([className, styles.header])} {...props}>
      {children}
    </header>
  )
}
