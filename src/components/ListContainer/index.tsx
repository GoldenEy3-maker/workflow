import { type Order as OrderPrisma, type Resume } from "@prisma/client"
import LoadingSkeletItemList from "../Loading/ItemList"
import styles from "./styles.module.scss"

type ListContainerProps<T extends Resume | OrderPrisma> = {
  data: T[] | undefined | null
  loading: boolean
  error?: string | React.ReactNode
  render: (item: T) => React.ReactNode
  empty?: string | React.ReactNode
}

const ListContainer = <T extends Resume | OrderPrisma>(
  props: ListContainerProps<T>
) => {
  return (
    <div className={styles.container}>
      {(() => {
        if (props.loading) return <LoadingSkeletItemList backgrounded />

        if (props.error) return <p>Error</p>

        if (props.data && props.data.length > 0)
          return props.data.map((item) => props.render(item))

        return props.empty
      })()}
    </div>
  )
}

export default ListContainer
