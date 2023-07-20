import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export type ResponseMessageType = "danger" | "warning" | "success" | undefined

type ResponseProps = {
  state: boolean
  type: ResponseMessageType
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Response: React.FC<ResponseProps> = ({
  className,
  children,
  state,
  type,
  ...props
}) => {
  return (
    <div
      className={cls([className, styles.response], {
        [styles._dangerMessage ?? ""]: type === "danger",
        [styles._successMessage ?? ""]: type === "success",
        [styles._warningMessage ?? ""]: type === "warning",
      })}
      aria-hidden={!state}
      {...props}
    >
      <div className={styles.responseMessage}>{children}</div>
    </div>
  )
}
