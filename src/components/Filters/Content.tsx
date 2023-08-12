import { cls } from "~/utils/helpers"
import { useFilterContext } from "./context"
import styles from "./styles.module.scss"

export const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const [contextState] = useFilterContext()

  return (
    <div
      className={cls([className, styles.content])}
      {...props}
      aria-hidden={!contextState.isOpen}
    >
      <div className={styles.wrapper}>{children}</div>
    </div>
  )
}
