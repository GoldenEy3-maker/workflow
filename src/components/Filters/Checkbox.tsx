import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export type CheckboxValue = "on" | "off" | undefined

type CheckboxProps = {
  label: string
  value: CheckboxValue
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "value"
>

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  id,
  value,
  ...props
}) => {
  const rippleEffectEvent = useRippleEffect()

  const renderIcon = (value: CheckboxValue) => {
    if (value === undefined || value === "off")
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 -960 960 960"
          width="1em"
        >
          <path d="M200-440v-80h560v80H200Z" />
        </svg>
      )

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 -960 960 960"
        width="1em"
      >
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    )
  }

  return (
    <div className={cls([className, styles.checkbox])}>
      <input type="checkbox" id={id} value={value} {...props} />
      <label htmlFor={id} onPointerDown={rippleEffectEvent}>
        <p>{label}</p>
        <span>{renderIcon(value)}</span>
      </label>
    </div>
  )
}
