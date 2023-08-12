import { useMemo } from "react"
import { MdCheck, MdOutlineRemove } from "react-icons/md"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export type FilterValue = "on" | "off" | undefined

export type FilterState = Record<
  string,
  { checked: boolean; value: FilterValue }
>

export type FilterHandler = (args: {
  id: string
  checked: boolean
  value: FilterValue
}) => void

type CheckboxProps = {
  label: string
  value: FilterValue
  id: string
  checked: boolean
  handler: FilterHandler
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "id" | "checked"
>

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
  id,
  handler,
  ...props
}) => {
  const rippleEffectEvent = useRippleEffect()

  const icon = useMemo(() => {
    if (props.value === undefined || props.value === "off")
      return <MdOutlineRemove />

    return <MdCheck />
  }, [props.value])

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = () => {
    let checked = props.checked
    let value = props.value

    if (props.value === undefined || props.value === "on") checked = true

    if (props.value === "off") checked = false

    switch (props.value) {
      case "off":
        value = undefined
        break
      case "on":
        value = "off"
        break
      default:
        value = "on"
        break
    }

    handler({ id, checked, value })
  }

  return (
    <div className={cls([className, styles.checkbox])}>
      <input type="checkbox" id={id} onChange={changeHandler} {...props} />
      <label htmlFor={id} onPointerDown={rippleEffectEvent}>
        <p>{label}</p>
        <span>{icon}</span>
      </label>
    </div>
  )
}
