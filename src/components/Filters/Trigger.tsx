import { MdKeyboardArrowDown, MdOutlineFilterAlt } from "react-icons/md"
import Button from "../Button"
import { useFilterContext } from "./context"
import styles from "./styles.module.scss"

export const Trigger: React.FC<
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">
> = ({ children, ...props }) => {
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
      <span className={styles.triggerIcon}>
        <MdKeyboardArrowDown fontSize="1.5rem" />
      </span>
    </Button>
  )
}
