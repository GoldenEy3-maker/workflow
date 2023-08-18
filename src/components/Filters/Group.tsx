import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useRippleEffect } from "~/hooks/rippleEffect.hook"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type GroupProps = {
  label: string
} & React.HTMLAttributes<HTMLDivElement>

export const Group: React.FC<GroupProps> = ({ label, children, ...props }) => {
  const rippleEffectEvent = useRippleEffect()
  const [isExpanded, setIsExpanded] = useState(false)

  const toggle = () => setIsExpanded((state) => !state)

  return (
    <div
      {...props}
      className={cls([props.className, styles.group])}
      aria-expanded={isExpanded}
    >
      <button
        type="button"
        onClick={toggle}
        className={styles.groupTrigger}
        onPointerDown={rippleEffectEvent}
      >
        <span className={styles.groupTriggerIcon}>
          <MdKeyboardArrowDown fontSize="1.5rem" />
        </span>
        {label}
      </button>
      <div className={styles.groupContainer}>
        <div className={styles.groupContainerWrapper}>{children}</div>
      </div>
    </div>
  )
}
