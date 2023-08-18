import { useRef, useState } from "react"
import { SelectContext } from "~/components/Select/context"
import { useClickOutside } from "~/hooks/clickOutside.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type RootProps = {
  label?: string
} & React.HTMLAttributes<HTMLDivElement>

export const Root: React.FC<RootProps> = ({ label, children, ...props }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((state) => !state)

  const closeOnBlurHandler: React.FocusEventHandler = (event) => {
    if (event.relatedTarget && !rootRef.current?.contains(event.relatedTarget))
      close()
  }

  useClickOutside(rootRef, close, isOpen === true)

  return (
    <SelectContext.Provider value={{ isOpen, close, toggle, triggerRef }}>
      <div
        {...props}
        className={cls([props.className, styles.root])}
        aria-hidden={!isOpen}
      >
        {label ? <span className={styles.label}>{label}</span> : null}
        <div
          className={styles.wrapper}
          ref={rootRef}
          onBlur={closeOnBlurHandler}
        >
          {children}
        </div>
      </div>
    </SelectContext.Provider>
  )
}
