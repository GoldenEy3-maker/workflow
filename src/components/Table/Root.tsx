import { cls } from "~/utils/helpers"
import styles from "./table.module.scss"

type RootProps = {
  template: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Root: React.FC<RootProps> = ({
  template,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cls([className, styles.root])}
      style={{ "--_template": template } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}
