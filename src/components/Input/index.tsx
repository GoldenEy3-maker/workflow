import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import { MdClose, MdKeyboardArrowDown } from "react-icons/md"
import ReactInputMask from "react-input-mask"
import ReactTextMask from "react-text-mask"
import { createNumberMask } from "text-mask-addons"
import { useClickOutside } from "~/hooks/clickOutside.hook"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { InputMaskPatterns } from "~/utils/enums"
import { cls } from "~/utils/helpers"
import Button from "../Button"
import styles from "./styles.module.scss"

export type InputProps = {
  label?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  validError?: string
  options?: string[]
  optionHandler?: (value: string) => void
  optionsReset?: () => void
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"] | "currency"
  masked?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      leadingIcon,
      trailingIcon,
      validError,
      options,
      masked,
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

    const filteredOptions = options ? filterOptions(options) : undefined

    useImperativeHandle(ref, () => inputRef.current!, [])

    useEffect(() => {
      if (!isFocus) {
        setIsActive(!!props.value)
      }
    }, [props.value])

    useClickOutside(rootRef, () => setIsOptionsActive(false))

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
          {(() => {
            if (masked && props.type === "currency")
              return (
                <ReactTextMask
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  mask={createNumberMask({
                    prefix: "",
                    suffix: " ₽",
                    thousandsSeparatorSymbol: " ",
                    integerLimit: 6,
                  })}
                  onFocus={inputFocusHandler}
                  onBlur={inputBlurHandler}
                  onChange={inputChangeHandler}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  ref={inputRef}
                  {...props}
                />
              )

            if (masked && props.type === "date")
              return (
                <ReactInputMask
                  mask={InputMaskPatterns.Date}
                  maskPlaceholder="ДД.ММ.ГГГГ"
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  ref={inputRef}
                  onFocus={inputFocusHandler}
                  onBlur={inputBlurHandler}
                  onChange={inputChangeHandler}
                  {...props}
                  type="text"
                />
              )

            return (
              <input
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
                onChange={inputChangeHandler}
                ref={inputRef}
                {...props}
              />
            )
          })()}
          {filteredOptions && !trailingIcon ? (
            <div
              className={cls([styles.trailing], {
                [styles._rotated ?? ""]: isOptionsActive,
              })}
            >
              <Button
                type="button"
                isIcon
                clrType={
                  filteredOptions.length === 0 || !!validError
                    ? "danger"
                    : undefined
                }
                onClick={() => {
                  if (filteredOptions.length === 0) {
                    optionsReset && optionsReset()
                    inputRef.current?.focus()

                    return
                  }

                  setIsOptionsActive((prev) => !prev)
                }}
              >
                <span>
                  {filteredOptions.length > 0 ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdClose />
                  )}
                </span>
              </Button>
            </div>
          ) : trailingIcon ? (
            <div className={styles.trailing}>{trailingIcon}</div>
          ) : null}
        </div>
        {validError ? (
          <div className={styles.validError}>
            <p>{validError}</p>
          </div>
        ) : null}
        {filteredOptions && filteredOptions.length > 0 ? (
          <div className={styles.options} aria-hidden={!isOptionsActive}>
            <div className={styles.optionsWrapper}>
              {filteredOptions.map((option, i) => (
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
