import { useSelectContext } from "~/components/Select/context"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type OptionsProps = {
  values: string[]
  handler: (value: string) => void
} & React.HTMLAttributes<HTMLDivElement>

export const Options: React.FC<OptionsProps> = ({
  values,
  handler,
  ...props
}) => {
  const rippleEffectEvent = useRippleEffect()
  const ctx = useSelectContext()

  return (
    <div {...props} className={cls([props.className, styles.options])}>
      {values.map((value, index) => (
        <button
          type="button"
          key={index}
          onPointerDown={rippleEffectEvent}
          onClick={() => {
            handler(value)
            ctx.close()
            ctx.triggerRef.current?.focus()
          }}
        >
          {value}
        </button>
      ))}
    </div>
  )
}
