import { useMemo } from "react"
import { MdCheck, MdOutlineRemove } from "react-icons/md"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export type FilterValue = "on" | "off" | undefined

export type FilterState = Record<string, FilterValue>

export type FilterHandler = (args: { id: string; value: FilterValue }) => void

type CheckboxProps = {
  label: string
  value: FilterValue
  id: string
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

    handler({ id, value })
  }

  return (
    <div className={cls([className, styles.checkbox])}>
      <input
        type="checkbox"
        id={id}
        onChange={changeHandler}
        checked={props.value === "off" || props.value === "on"}
        {...props}
      />
      <label htmlFor={id} onPointerDown={rippleEffectEvent}>
        <p>{label}</p>
        <span>{icon}</span>
      </label>
    </div>
  )
}
