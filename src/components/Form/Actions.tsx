import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type ActionsProps = {
  flexEnd?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const Actions: React.FC<ActionsProps> = ({
  className,
  children,
  flexEnd,
  ...props
}) => {
  return (
    <div
      className={cls([className, styles.actions], {
        [styles._flexEnd ?? ""]: !!flexEnd,
      })}
      {...props}
    >
      {children}
    </div>
  )
}
