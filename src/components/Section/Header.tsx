import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type HeaderProps = {
  centered?: boolean
} & React.HTMLAttributes<HTMLElement>

export const Header: React.FC<HeaderProps> = ({
  className,
  children,
  centered,
  ...props
}) => {
  return (
    <header
      className={cls([className, styles.header], {
        [styles._center ?? ""]: !!centered,
      })}
      {...props}
    >
      {children}
    </header>
  )
}
