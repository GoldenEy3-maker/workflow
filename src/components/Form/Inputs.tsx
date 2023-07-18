import { cls } from "~/utils/helpers"
import styles from "./form.module.scss"

export const Inputs: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div className={cls([className, styles.inputs])} {...props}>
      {children}
    </div>
  )
}