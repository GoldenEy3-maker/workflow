import { forwardRef, useEffect, useRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import { useTabsContext } from "./context"
import styles from "./styles.module.scss"

type ItemProps = {
  label: string
} & Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type"
>

export const Item = forwardRef<HTMLInputElement, ItemProps>(
  ({ className, label, ...props }, ref) => {
    const itemRef = useRef<HTMLLabelElement>(null)

    const [, setContext] = useTabsContext()

    const rippleEffectEvent = useRippleEffect()

    useEffect(() => {
      if (props.checked && itemRef.current) {
        setContext({
          activeWidth: itemRef.current.offsetWidth,
          activeOffset: itemRef.current.offsetLeft
        })
      }
    }, [props.checked, setContext])

    return (
      <div
        className={cls([className, styles.item], {
          [styles._active]: !!props.checked
        })}
      >
        <label
          htmlFor={props.id}
          onPointerDown={rippleEffectEvent}
          ref={itemRef}
        >
          {label}
        </label>
        <input type="radio" ref={ref} {...props} />
      </div>
    )
  }
)

Item.displayName = "TabsItem"