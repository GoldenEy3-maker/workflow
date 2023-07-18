import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type HeaderProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

export const Header: React.FC<HeaderProps> = ({
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
