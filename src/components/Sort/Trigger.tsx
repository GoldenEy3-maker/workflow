import { MdKeyboardArrowDown, MdSort } from "react-icons/md"
import Button from "../Button"
import { useSortContext } from "./context"
import styles from "./styles.module.scss"

export const Trigger: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const ctx = useSortContext()

  return (
    <Button {...props} type="button" variant="elevated" onClick={ctx.toggle}>
      <MdSort fontSize="1.5rem" />
      {props.children}
      <span className={styles.triggerIcon}>
        <MdKeyboardArrowDown fontSize="1.5em" />
      </span>
    </Button>
  )
}
