import { MdAdd, MdRemove } from "react-icons/md"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import Button from "../Button"
import styles from "./styles.module.scss"

type OptionListProps = {
  label: string
  options: string[] | undefined
  value: string[]
  onChange: (value: string[]) => void
  reset: () => void
  validError?: string
  disabled?: boolean
}

const OptionList: React.FC<OptionListProps> = (props) => {
  const rippleEffectEvent = useRippleEffect()

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.label}>{props.label}</p>
        <Button
          onClick={props.reset}
          clrType="danger"
          disabled={props.disabled}
          type="button"
        >
          Очистить
        </Button>
      </header>
      {props.validError ? (
        <p className={styles.validError}>{props.validError}</p>
      ) : null}
      <div className={styles.list}>
        {props.options &&
          props.options.length > 0 &&
          props.options.map((opt) => (
            <div key={opt} className={styles.item}>
              <input
                type="checkbox"
                checked={props.value.includes(opt)}
                disabled={props.disabled}
                onChange={() => {
                  if (props.value.includes(opt)) {
                    props.onChange(props.value.filter((item) => item !== opt))
                    return
                  }

                  props.onChange([...props.value, opt])
                }}
                id={opt}
                name={opt}
              />
              <label htmlFor={opt} onPointerDown={rippleEffectEvent}>
                {opt}
                <span>
                  {props.value.includes(opt) ? <MdRemove /> : <MdAdd />}
                </span>
              </label>
            </div>
          ))}
      </div>
    </div>
  )
}

export default OptionList
