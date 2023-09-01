import { MdKeyboardArrowDown, MdOutlineFilterAlt } from "react-icons/md"
import Button from "../Button"
import { useFilterContext } from "./context"
import styles from "./styles.module.scss"

type TriggerProps = {
  activeCounter?: number
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">

export const Trigger: React.FC<TriggerProps> = ({
  children,
  activeCounter,
  ...props
}) => {
  const ctx = useFilterContext()

  return (
    <Button
      {...props}
      className={props.className}
      variant="elevated"
      type="button"
      onClick={ctx.toggle}
    >
      <MdOutlineFilterAlt fontSize="1.5em" />
      {children}
      {activeCounter && activeCounter !== 0 ? (
        <div className={styles.activeCounter}>{activeCounter}</div>
      ) : (
        <span className={styles.triggerIcon}>
          <MdKeyboardArrowDown fontSize="1.5rem" />
        </span>
      )}
    </Button>
  )
}
