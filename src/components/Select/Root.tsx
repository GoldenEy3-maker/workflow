import { useCallback, useEffect, useRef, useState } from "react"
import {
  SelectContext,
  type SelectContextState,
} from "~/components/Select/context"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type RootProps = {
  label?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Root: React.FC<RootProps> = ({
  label,
  className,
  children,
  ...props
}) => {
  const rootRef = useRef<HTMLDivElement>(null)

  const [contextState, setContextState] = useState<SelectContextState>({
    isOpen: false,
    triggerRef: { current: null },
  })

  const closeOnDocClickHandler = useCallback((event: MouseEvent) => {
    if (contextState.isOpen === true && !rootRef.current?.contains(event.target as HTMLElement)) {
      setContextState((state) => ({ ...state, isOpen: false }))
    }
  }, [contextState.isOpen])


  const closeOnBlurHandler: React.FocusEventHandler = (event) => {
    if (!rootRef.current?.contains(event.relatedTarget as HTMLElement)) {
      setContextState((state) => ({ ...state, isOpen: false }))
    }
  }

  useEffect(() => {
    document.addEventListener("click", closeOnDocClickHandler)

    return () => document.removeEventListener("click", closeOnDocClickHandler)
  }, [closeOnDocClickHandler])

  return (
    <SelectContext.Provider value={[contextState, setContextState]}>
      <div
        className={cls([className, styles.root], {
          [styles._active ?? ""]: contextState.isOpen,
        })}
        {...props}
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
