import { cls } from "~/utils/helpers"
import styles from "./form.module.scss"

export const Group: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={cls([className, styles.group])} {...props}>
      {children}
    </div>
  )
}
