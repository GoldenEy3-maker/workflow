import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type TitleProps = {
  primary?: boolean
} & React.HTMLAttributes<HTMLHeadingElement>

export const Title: React.FC<TitleProps> = ({
  primary,
  children,
  ...props
}) => {
  return (
    <h3
      {...props}
      className={cls([props.className, styles.title], {
        [styles._primary ?? ""]: !!primary,
      })}
    >
      {children}
    </h3>
  )
}
