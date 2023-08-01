import { useMemo } from "react"
import { MdCheck, MdOutlineRemove } from "react-icons/md"
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

  const icon = useMemo(() => {
    if (value === undefined || value === "off") return <MdOutlineRemove />

    return <MdCheck />
  }, [value])

  return (
    <div className={cls([className, styles.checkbox])}>
      <input type="checkbox" id={id} value={value} {...props} />
      <label htmlFor={id} onPointerDown={rippleEffectEvent}>
        <p>{label}</p>
        <span>{icon}</span>
      </label>
    </div>
  )
}
