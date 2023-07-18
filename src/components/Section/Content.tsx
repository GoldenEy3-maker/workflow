import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type ContentProps = {
  isCenter?: boolean
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Content: React.FC<ContentProps> = ({
  className,
  children,
  isCenter,
  ...props
}) => {
  return (
    <div
      className={cls([className, styles.content], {
        [styles._center ?? ""]: !!isCenter,
      })}
      {...props}
    >
      {children}
    </div>
  )
}
