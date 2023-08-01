import { type FieldError } from "react-hook-form"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import Button from "../Button"
import styles from "./styles.module.scss"

type OptionListProps = {
  label: string
  options: string[] | undefined
  value: string[]
  onChange: (value: string) => void
  reset: () => void
  validError?: string
}

const OptionList: React.FC<OptionListProps> = (props) => {
  const rippleEffectEvent = useRippleEffect()

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <p className={styles.label}>{props.label}</p>
        <Button onClick={props.reset} clrType="danger" type="button">
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
                onChange={() => props.onChange(opt)}
                id={opt}
                name={opt}
              />
              <label htmlFor={opt} onPointerDown={rippleEffectEvent}>
                {opt}
                <span>
                  {props.value.includes(opt) ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 -960 960 960"
                      width="1em"
                    >
                      <path d="M200-440v-80h560v80H200Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 -960 960 960"
                      width="1em"
                    >
                      <path d="M440-200v-240H200v-80h240v-240h80v240h240v80H520v240h-80Z" />
                    </svg>
                  )}
                </span>
              </label>
            </div>
          ))}
      </div>
    </div>
  )
}

export default OptionList
