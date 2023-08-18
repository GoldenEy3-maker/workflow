import { cls } from "~/utils/helpers"
import { TabsContextProvider } from "./context"
import styles from "./styles.module.scss"

export const Root: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <TabsContextProvider>
      <div {...props} className={cls([props.className, styles.root])}>
        {children}
      </div>
    </TabsContextProvider>
  )
}
