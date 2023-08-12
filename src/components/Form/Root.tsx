import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type RootProps = {
  withGroups?: boolean
} & React.FormHTMLAttributes<HTMLFormElement>

export const Root: React.FC<RootProps> = ({
  children,
  className,
  withGroups,
  ...props
}) => {
  return (
    <form
      className={cls([className, styles.root], {
        [styles.withGroups ?? ""]: !!withGroups,
      })}
      {...props}
    >
      {children}
    </form>
  )
}
