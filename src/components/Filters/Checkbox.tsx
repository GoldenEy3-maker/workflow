import { useMemo } from "react"
import { MdCheck, MdOutlineRemove } from "react-icons/md"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"
import { type FiltersCheckboxHandler, type FiltersCheckboxValue } from "./types"

type CheckboxProps = {
  label: string
  value: FiltersCheckboxValue
  id: string
  handler: FiltersCheckboxHandler
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "id" | "checked"
>

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  className,
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
    let value = props.value

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

    handler({ id: props.id, value })
  }

  return (
    <div className={cls([className, styles.checkbox])}>
      <input
        type="checkbox"
        onChange={changeHandler}
        checked={props.value === "off" || props.value === "on"}
        {...props}
      />
      <label htmlFor={props.id} onPointerDown={rippleEffectEvent}>
        <span>{icon}</span>
        <p>{label}</p>
      </label>
    </div>
  )
}
