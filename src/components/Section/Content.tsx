import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type ContentProps = {
  isCenter?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const Content: React.FC<ContentProps> = ({
  children,
  isCenter,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cls([props.className, styles.content], {
        [styles._center ?? ""]: !!isCenter,
      })}
    >
      {children}
    </div>
  )
}
