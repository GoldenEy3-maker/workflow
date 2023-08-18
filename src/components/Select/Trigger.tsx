import { MdKeyboardArrowDown } from "react-icons/md"
import Button from "~/components/Button"
import { useSelectContext } from "~/components/Select/context"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export const Trigger: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
> = ({ value, className, ...props }) => {
  const ctx = useSelectContext()

  return (
    <div className={cls([className, styles.trigger])}>
      <input type="button" value={value} readOnly={true} {...props} />
      <Button variant="elevated" ref={ctx.triggerRef} onClick={ctx.toggle}>
        <p>{value}</p>
        <span className={styles.icon}>
          <MdKeyboardArrowDown fontSize="1.5em" />
        </span>
      </Button>
    </div>
  )
}
