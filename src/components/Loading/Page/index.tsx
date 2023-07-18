import LoadingSpin from "../Spin"
import styles from './styles.module.scss'

const LoadingPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <LoadingSpin />
    </div>
  )
}

export default LoadingPage