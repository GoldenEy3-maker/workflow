import Skeleton from "react-loading-skeleton"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

type LoadingSkeletItemListProps = {
  backgrounded?: boolean
}

const LoadingSkeletItemList: React.FC<LoadingSkeletItemListProps> = (props) => {
  return (
    <div
      className={cls([styles.container], {
        [styles._backgrounded ?? ""]: !!props.backgrounded,
      })}
    >
      <Skeleton width="20em" />
      <Skeleton count={3} />
      <Skeleton
        count={3}
        width="10em"
        containerClassName={styles.tagsContainer}
      />
    </div>
  )
}

export default LoadingSkeletItemList
