import { useRef, useState } from "react"
import { useClickOutside } from "~/hooks/clickOutside.hook"
import { cls } from "~/utils/helpers"
import type { FilterContextState } from "./context"
import { FilterContext } from "./context"
import styles from "./styles.module.scss"

export const Root: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  onBlur,
  ...props
}) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const [contextState, setContextState] = useState<FilterContextState>({
    isOpen: false,
  })

  const closeHandler = () =>
    setContextState((state) => ({ ...state, isOpen: false }))

  const closeOnBlurHandler: React.FocusEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      event.relatedTarget !== null &&
      rootRef.current?.contains(event.target as HTMLElement) &&
      !rootRef.current?.contains(event.relatedTarget as HTMLElement)
    )
      closeHandler()

    if (onBlur) onBlur(event)
  }

  useClickOutside(rootRef, closeHandler, contextState.isOpen === true)

  return (
    <FilterContext.Provider value={[contextState, setContextState]}>
      <div
        className={cls([className, styles.root])}
        onBlur={closeOnBlurHandler}
        {...props}
        ref={rootRef}
      >
        {children}
      </div>
    </FilterContext.Provider>
  )
}
