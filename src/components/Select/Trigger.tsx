import { useEffect, useRef } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import Button from "~/components/Button"
import { useSelectContext } from "~/components/Select/context"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Trigger: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
> = ({ value, className, ...props }) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [, setContext] = useSelectContext()

  useEffect(() => {
    setContext((state) => ({ ...state, triggerRef }))
  }, [setContext])

  return (
    <div className={cls([className, styles.trigger])}>
      <input type="button" value={value} readOnly={true} {...props} />
      <Button
        variant="elevated"
        ref={triggerRef}
        onClick={() =>
          setContext((state) => ({ ...state, isOpen: !state.isOpen }))
        }
      >
        <p>{value}</p>
        <span className={styles.icon}>
          <MdKeyboardArrowDown fontSize="1.5em" />
        </span>
      </Button>
    </div>
  )
}
