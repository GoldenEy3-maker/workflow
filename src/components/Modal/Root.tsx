import { forwardRef } from "react"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type RootProps = {
  closeHandler?: () => void
} & React.HTMLAttributes<HTMLDivElement>

export const Root = forwardRef<HTMLDivElement, RootProps>(
  ({ closeHandler, children, ...props }, ref) => {
    return (
      <div
        {...props}
        className={cls([props.className, styles.root])}
        ref={ref}
        onPointerDown={(event) => {
          if (
            !(event.target as HTMLElement).closest("[data-modal-prevent]") &&
            closeHandler
          )
            closeHandler()

          if (props.onPointerDown) props.onPointerDown(event)
        }}
      >
        {children}
      </div>
    )
  }
)

Root.displayName = "ModalRoot"
