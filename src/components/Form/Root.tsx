import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type RootProps = {
  withGroups?: boolean
} & React.FormHTMLAttributes<HTMLFormElement>

export const Root: React.FC<RootProps> = ({
  children,
  withGroups,
  ...props
}) => {
  return (
    <form
      {...props}
      className={cls([props.className, styles.root], {
        [styles.withGroups ?? ""]: !!withGroups,
      })}
    >
      {children}
    </form>
  )
}
