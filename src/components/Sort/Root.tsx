import { useRef, useState } from "react"
import { useClickOutside } from "~/hooks/clickOutside.hook"
import { cls } from "~/utils/helpers"
import { SortContext } from "./context"
import styles from "./styles.module.scss"

export const Root: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const toggle = () => setIsOpen((state) => !state)
  const close = () => setIsOpen(false)

  const blurHandler: React.FocusEventHandler<HTMLDivElement> = (event) => {
    if (event.relatedTarget && !rootRef.current?.contains(event.relatedTarget))
      close()

    if (props.onBlur) props.onBlur(event)
  }

  useClickOutside(rootRef, close, isOpen === true)

  return (
    <SortContext.Provider value={{ isOpen, toggle }}>
      <div
        {...props}
        className={cls([props.className, styles.root])}
        aria-hidden={!isOpen}
        onBlur={blurHandler}
        ref={rootRef}
      >
        {props.children}
      </div>
    </SortContext.Provider>
  )
}
