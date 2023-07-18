import * as Select from "~/components/Select"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type SortProps = {
  className?: string
  label?: string
  value: string
  values: string[]
  handler: (value: string) => void
}

export const Sort: React.FC<SortProps> = ({ className, label, value, ...props }) => {
  return (
    <Select.Root className={cls([className, styles.sort])} label={label}>
      <Select.Trigger value={value} />
      <Select.Options {...props} />
    </Select.Root>
  )
}
