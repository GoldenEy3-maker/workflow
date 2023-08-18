import { cls } from "~/utils/helpers"
import { useTabsContext } from "./context"
import styles from "./styles.module.scss"

export const List: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const ctx = useTabsContext()

  return (
    <div className={cls([className, styles.list])} {...props}>
      <div className={styles.listContainer}>{children}</div>
      <div
        className={styles.line}
        style={
          {
            "--offset": `${ctx.offset}px`,
            "--width": `${ctx.width}px`,
          } as React.CSSProperties
        }
      >
        <div className={styles.lineWrapper} />
      </div>
    </div>
  )
}
