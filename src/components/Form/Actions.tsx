import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type ActionsProps = {
  flexEnd?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const Actions: React.FC<ActionsProps> = ({
  children,
  flexEnd,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cls([props.className, styles.actions], {
        [styles._flexEnd ?? ""]: !!flexEnd,
      })}
    >
      {children}
    </div>
  )
}
