import Skeleton from "react-loading-skeleton"
import styles from "./styles.module.scss"

const LoadingSkeletItemList: React.FC = () => {
  return (
    <>
      <Skeleton width="20em" />
      <Skeleton count={3} />
      <Skeleton
        count={3}
        width="10em"
        containerClassName={styles.tagsContainer}
      />
    </>
  )
}

export default LoadingSkeletItemList
