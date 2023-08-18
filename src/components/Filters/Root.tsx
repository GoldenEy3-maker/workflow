import { useRef, useState } from "react"
import { useClickOutside } from "~/hooks/clickOutside.hook"
import { cls } from "~/utils/helpers"
import { FilterContext } from "./context"
import styles from "./styles.module.scss"

export const Root: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((state) => !state)

  const closeOnBlurHandler: React.FocusEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      event.relatedTarget &&
      !rootRef.current?.contains(event.relatedTarget as HTMLElement)
    )
      close()

    if (props.onBlur) props.onBlur(event)
  }

  useClickOutside(rootRef, close, isOpen)

  return (
    <FilterContext.Provider value={{ isOpen, toggle }}>
      <div
        {...props}
        className={cls([props.className, styles.root])}
        onBlur={closeOnBlurHandler}
        ref={rootRef}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </FilterContext.Provider>
  )
}
