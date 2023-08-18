import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type HeaderProps = {
  centered?: boolean
} & React.HTMLAttributes<HTMLElement>

export const Header: React.FC<HeaderProps> = ({
  children,
  centered,
  ...props
}) => {
  return (
    <header
      {...props}
      className={cls([props.className, styles.header], {
        [styles._center ?? ""]: !!centered,
      })}
    >
      {children}
    </header>
  )
}
