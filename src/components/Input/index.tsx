import { forwardRef, useEffect, useState } from "react"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export type InputProps = {
  label?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  validError?: string | string[]
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      leadingIcon,
      trailingIcon,
      validError,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    useEffect(() => {
      if (!isFocus) {
        setIsActive(!!props.value)
      }
    }, [isFocus, props.value])

    return (
      <div
        className={cls([className, styles.customInput], {
          [styles._active ?? ""]: isActive,
          [styles._withLeading ?? ""]: !!leadingIcon,
          [styles._withTrailing ?? ""]: !!trailingIcon,
          [styles._disabled ?? ""]: !!props.disabled,
          [styles._notValid ?? ""]: !!validError,
        })}
      >
        <div className={styles.wrapper}>
          {leadingIcon ? (
            <div className={styles.leading}>{leadingIcon}</div>
          ) : null}
          {label ? <label htmlFor={props.id}>{label}</label> : null}

          <input
            onFocus={(event) => {
              setIsActive(true)
              setIsFocus(true)

              if (onFocus) onFocus(event)
            }}
            onBlur={(event) => {
              if (!props.value) setIsActive(false)

              setIsFocus(false)

              if (onBlur) onBlur(event)
            }}
            ref={ref}
            {...props}
          />
          {trailingIcon ? (
            <div className={styles.trailing}>{trailingIcon}</div>
          ) : null}
        </div>
        <div className={styles.errorMessage}>
          <p>{validError}</p>
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
