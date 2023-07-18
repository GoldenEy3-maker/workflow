import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type HeaderProps = {
  isCenter?: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

export const Header: React.FC<HeaderProps> = ({
  className,
  children,
  isCenter,
  ...props
}) => {
  return (
    <header
      className={cls([className, styles.header], {
        [styles._center ?? ""]: !!isCenter,
      })}
      {...props}
    >
      {children}
    </header>
  )
}
