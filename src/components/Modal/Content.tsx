import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Content: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <div {...props} className={cls([className, styles.content])}>
      {children}
    </div>
  )
}
