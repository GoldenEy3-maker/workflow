import Skeleton from "react-loading-skeleton"
import styles from "./styles.module.scss"

const LoadingSkelet: React.FC = () => {
  return (
    <>
      <div className={styles.loadingSkeletonContainer}>
        <Skeleton width="20em" />
        <Skeleton count={3} />
        <Skeleton
          count={3}
          width={"7em"}
          containerClassName={styles.loadingSkeletonStatsContainer}
        />
      </div>
      <div className={styles.loadingSkeletonContainer}>
        <Skeleton width="20em" />
        <Skeleton count={3} />
        <Skeleton
          count={3}
          width={"7em"}
          containerClassName={styles.loadingSkeletonStatsContainer}
        />
      </div>
      <div className={styles.loadingSkeletonContainer}>
        <Skeleton width="20em" />
        <Skeleton count={3} />
        <Skeleton
          count={3}
          width={"7em"}
          containerClassName={styles.loadingSkeletonStatsContainer}
        />
      </div>
    </>
  )
}

export default LoadingSkelet
