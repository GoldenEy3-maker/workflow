import { cls } from "~/utils/helpers"
import { TabsContextProvider } from "./context"
import styles from "./styles.module.scss"

export const Root: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <TabsContextProvider>
      <div className={cls([className, styles.root])} {...props}>
        {children}
      </div>
    </TabsContextProvider>
  )
}
