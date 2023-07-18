import { useSelectContext } from "~/components/Select/context"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type OptionsProps = {
  values: string[]
  handler: (value: string) => void
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Options: React.FC<OptionsProps> = ({
  values,
  handler,
  className,
  ...props
}) => {
  const rippleEffectEvent = useRippleEffect()
  const [context, setContext] = useSelectContext()

  return (
    <div className={cls([className, styles.options])} {...props}>
      {values.map((value, index) => (
        <button
          type="button"
          key={index}
          onPointerDown={rippleEffectEvent}
          onClick={() => {
            handler(value)

            setContext((state) => ({ ...state, isOpen: false }))

            context.triggerRef.current?.focus()
          }}
        >
          {value}
        </button>
      ))}
    </div>
  )
}
