import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Actions: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={cls([className, styles.actions])} {...props}>
      {children}
    </div>
  )
}
