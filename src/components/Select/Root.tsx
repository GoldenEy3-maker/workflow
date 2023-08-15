import { useRef, useState } from "react"
import {
  SelectContext,
  type SelectContextState,
} from "~/components/Select/context"
import { useClickOutside } from "~/hooks/clickOutside.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type RootProps = {
  label?: string
} & React.HTMLAttributes<HTMLDivElement>

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

  const closeHandler = () =>
    setContextState((state) => ({ ...state, isOpen: false }))

  const closeOnBlurHandler: React.FocusEventHandler = (event) => {
    if (!rootRef.current?.contains(event.relatedTarget)) closeHandler()
  }

  useClickOutside(rootRef, closeHandler, contextState.isOpen === true)

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
