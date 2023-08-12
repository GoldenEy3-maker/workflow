import { cls } from "~/utils/helpers"
import { useTabsContext } from "./context"
import styles from "./styles.module.scss"

export const List: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const [context] = useTabsContext()

  return (
    <div className={cls([className, styles.list])} {...props}>
      <div className={styles.listContainer}>{children}</div>
      <div
        className={styles.line}
        style={
          {
            "--offset": `${context.activeOffset}px`,
            "--width": `${context.activeWidth}px`,
          } as React.CSSProperties
        }
      >
        <div className={styles.lineWrapper} />
      </div>
    </div>
  )
}
