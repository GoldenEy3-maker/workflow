import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

export type ResponseMessageType = "danger" | "warning" | "success" | undefined

type ResponseProps = {
  state: boolean
  type: ResponseMessageType
} & React.HTMLAttributes<HTMLDivElement>

export const Response: React.FC<ResponseProps> = ({
  children,
  state,
  type,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cls([props.className, styles.response], {
        [styles._dangerMessage ?? ""]: type === "danger",
        [styles._successMessage ?? ""]: type === "success",
        [styles._warningMessage ?? ""]: type === "warning",
      })}
      aria-hidden={!state}
    >
      <div className={styles.responseMessage}>{children}</div>
    </div>
  )
}
