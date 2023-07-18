import { cls } from "~/utils/helpers"
import { TabsContextProvider } from "./context"
import styles from "./styles.module.scss"

export const Root: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ className, children, ...props }) => {
  return (
    <TabsContextProvider>
      <div className={cls([className, styles.root])} {...props}>
        {children}
      </div>
    </TabsContextProvider>
  )
}
