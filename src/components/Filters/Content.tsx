import { cls } from "~/utils/helpers"
import { useFilterContext } from "./context"
import styles from "./styles.module.scss"

export const Content: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  const [contextState] = useFilterContext()

  return (
    <div
      className={cls([className, styles.content])}
      {...props}
      aria-hidden={!contextState.isOpen}
    >
      {children}
    </div>
  )
}
