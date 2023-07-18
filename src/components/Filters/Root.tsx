import { useEffect, useRef, useState } from "react"
import { cls } from "~/utils/helpers"
import type { FilterContextState } from "./context"
import { FilterContext } from "./context"
import styles from "./styles.module.scss"

export const Root: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, onBlur, ...props }) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const [contextState, setContextState] = useState<FilterContextState>({
    isOpen: false,
  })

  const closeOnBlurHandler: React.FocusEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (
      event.relatedTarget !== null &&
      rootRef.current?.contains(event.target as HTMLElement) &&
      !rootRef.current?.contains(event.relatedTarget as HTMLElement)
    )
      setContextState((state) => ({ ...state, isOpen: false }))

    if (onBlur) onBlur(event)
  }

  const closeOnDocClickHandler = (event: MouseEvent) => {
    if (!rootRef.current?.contains(event.target as HTMLElement)) {
      setContextState((state) => ({ ...state, isOpen: false }))
    }
  }

  useEffect(() => {
    document.addEventListener("click", closeOnDocClickHandler)

    return () => document.removeEventListener("click", closeOnDocClickHandler)
  }, [])

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
