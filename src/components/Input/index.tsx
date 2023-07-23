import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import Button from "../Button"
import styles from "./styles.module.scss"

export type InputProps = {
  label?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  validError?: string | string[]
  options?: string[]
  optionHandler?: (value: string) => void
  optionsReset?: () => void
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
      options,
      optionHandler,
      optionsReset,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false)
    const [isOptionsActive, setIsOptionsActive] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const rootRef = useRef<HTMLDivElement>(null)

    const rippleEffectEvent = useRippleEffect()

    const isOptionsEmpty = options?.length === 0

    const inputFocusHandler: React.FocusEventHandler<HTMLInputElement> = (
      event
    ) => {
      setIsActive(true)
      setIsFocus(true)
      setIsOptionsActive(true)

      if (onFocus) onFocus(event)
    }

    const inputBlurHandler: React.FocusEventHandler<HTMLInputElement> = (
      event
    ) => {
      setIsFocus(false)

      if (onBlur) onBlur(event)
    }

    const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      setIsOptionsActive(true)

      if (onChange) onChange(event)
    }

    const optionClickHandler = (option: string) => {
      inputRef.current?.focus()
      setIsOptionsActive(false)

      if (optionHandler) optionHandler(option)
    }

    const closeOptionsOnDocClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as HTMLElement)) {
        setIsOptionsActive(false)
      }
    }

    const closeOptionsOnRootBlur = (event: React.FocusEvent) => {
      if (!rootRef.current?.contains(event.relatedTarget as HTMLElement)) {
        setIsOptionsActive(false)
        if (!props.value) setIsActive(false)
      }
    }

    const filterOptions = useCallback(
      (options: string[]) => {
        const inputValue = props.value

        if (typeof inputValue !== "string") return options

        return options.filter((value) =>
          value.toLowerCase().includes(inputValue.toLowerCase())
        )
      },
      [props.value]
    )

    useImperativeHandle(ref, () => inputRef.current!, [])

    useEffect(() => {
      if (!isFocus) {
        setIsActive(!!props.value)
      }
    }, [props.value])

    useEffect(() => {
      document.addEventListener("click", closeOptionsOnDocClick)
      return () => document.removeEventListener("click", closeOptionsOnDocClick)
    }, [])

    return (
      <div
        className={cls([className, styles.customInput], {
          [styles._active ?? ""]: isActive,
          [styles._withLeading ?? ""]: !!leadingIcon,
          [styles._withTrailing ?? ""]:
            options && !trailingIcon ? true : !!trailingIcon,
          [styles._disabled ?? ""]: !!props.disabled,
          [styles._notValid ?? ""]: !!validError,
        })}
        ref={rootRef}
        onBlur={closeOptionsOnRootBlur}
      >
        <div className={styles.wrapper}>
          {leadingIcon ? (
            <div className={styles.leading}>{leadingIcon}</div>
          ) : null}
          {label ? <label htmlFor={props.id}>{label}</label> : null}

          <input
            onFocus={inputFocusHandler}
            onBlur={inputBlurHandler}
            onChange={inputChangeHandler}
            ref={inputRef}
            {...props}
          />
          {options && !trailingIcon ? (
            <div
              className={cls([styles.trailing], {
                [styles._rotated ?? ""]: isOptionsActive,
              })}
            >
              <Button
                type="button"
                isIcon
                clrType={isOptionsEmpty ? "danger" : undefined}
                onClick={() => {
                  if (isOptionsEmpty) {
                    optionsReset && optionsReset()
                    inputRef.current?.focus()

                    return
                  }

                  setIsOptionsActive((prev) => !prev)
                  // inputRef.current?.focus()
                }}
              >
                {options.length > 0 ? (
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 -960 960 960"
                      width="1em"
                    >
                      <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
                    </svg>
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 -960 960 960"
                    width="1em"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                )}
              </Button>
            </div>
          ) : trailingIcon ? (
            <div className={styles.trailing}>{trailingIcon}</div>
          ) : null}
        </div>
        <div className={styles.errorMessage}>
          <p>{validError}</p>
        </div>
        {options && options.length > 0 ? (
          <div className={styles.options} aria-hidden={!isOptionsActive}>
            <div className={styles.optionsWrapper}>
              {filterOptions(options).map((option, i) => (
                <button
                  type="button"
                  key={i}
                  title={option}
                  onPointerDown={rippleEffectEvent}
                  className={styles.option}
                  onClick={() => optionClickHandler(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
