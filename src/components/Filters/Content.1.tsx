import { useEffect, useRef } from "react"
import { cls } from "~/utils/helpers"
import { useFilterContext } from "./context"
import styles from "./styles.module.scss"

export const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [contextState] = useFilterContext()

  useEffect(() => {
    if (contentRef.current)
      contentRef.current.style.setProperty(
        "--offset-top",
        `${contentRef.current.getBoundingClientRect().top}px`
      )
  }, [])

  return (
    <div
      className={cls([className, styles.content])}
      {...props}
      aria-hidden={!contextState.isOpen}
      ref={contentRef}
    >
      <div className={styles.wrapper}>{children}</div>
    </div>
  )
}
