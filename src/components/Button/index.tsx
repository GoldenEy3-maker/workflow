import { forwardRef } from "react"
import { MdSync } from "react-icons/md"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export type ButtonProps = {
  variant?: "elevated" | "filled"
  clrType?: "danger" | "success" | "warning"
  isIcon?: boolean
  isLoading?: boolean
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading,
      onPointerDown,
      variant,
      clrType,
      isIcon,
      ...props
    },
    ref
  ) => {
    const rippleEffectEvent = useRippleEffect()

    const isSubmitDisabled = props.type === "submit" && props.disabled

    return (
      <button
        ref={ref}
        className={cls([className, styles.button], {
          [styles._filled ?? ""]: variant === "filled",
          [styles._elevated ?? ""]: variant === "elevated",
          [styles._danger ?? ""]: clrType === "danger",
          [styles._success ?? ""]: clrType === "success",
          [styles._warning ?? ""]: clrType === "warning",
          [styles._icon ?? ""]: !!isIcon,
        })}
        onPointerDown={(event) => {
          rippleEffectEvent(event)

          if (onPointerDown) onPointerDown(event)
        }}
        {...props}
      >
        {isLoading || isSubmitDisabled ? (
          <span className={styles.loader}>
            <MdSync fontSize="1.5em" />
          </span>
        ) : null}
        {(isLoading && isIcon) || (isSubmitDisabled && isIcon)
          ? null
          : children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
