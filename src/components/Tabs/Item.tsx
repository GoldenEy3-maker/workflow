import { forwardRef, useEffect, useRef } from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import { useTabsContext } from "./context"
import styles from "./styles.module.scss"

type ItemProps = {
  label: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">

export const Item = forwardRef<HTMLInputElement, ItemProps>(
  ({ className, label, ...props }, ref) => {
    const ctx = useTabsContext()
    const rippleEffectEvent = useRippleEffect()
    const itemRef = useRef<HTMLLabelElement>(null)

    useEffect(() => {
      if (props.checked && itemRef.current) {
        ctx.setActiveTab({
          width: itemRef.current.offsetWidth,
          offset: itemRef.current.offsetLeft,
        })
      }
    }, [props.checked])

    return (
      <div
        className={cls([className, styles.item], {
          [styles._active]: !!props.checked,
        })}
      >
        <label
          htmlFor={props.id}
          onPointerDown={rippleEffectEvent}
          ref={itemRef}
        >
          {label}
        </label>
        <input {...props} type="radio" ref={ref} />
      </div>
    )
  }
)

Item.displayName = "TabsItem"
