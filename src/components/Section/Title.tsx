import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type TitleProps = {
  primary?: boolean
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

export const Title: React.FC<TitleProps> = ({
  primary,
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cls([className, styles.title], {
        [styles._primary ?? ""]: !!primary,
      })}
      {...props}
    >
      {children}
    </h3>
  )
}
