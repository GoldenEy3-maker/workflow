import ProgressBar from "./ProgressBar"
import styles from "./styles.module.scss"

const Stats: React.FC = () => {
  return (
    <div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.info}>
            <h4 className={styles.title}>Активность</h4>
            <p>Активность на ресурсе</p>
            {/* <span>25</span> */}
          </div>
          <div className={styles.progress}>
            <ProgressBar value={60} />
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <h4 className={styles.title}>Выполненные</h4>
            <p>Количество выполненных заказов</p>
            <span>21</span>
          </div>
          <div className={styles.progress}>
            <ProgressBar value={84} isSuccess />
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <h4 className={styles.title}>Отмененные</h4>
            <p>Количество отменненых заказов</p>
            <span>1</span>
          </div>
          <div className={styles.progress}>
            <ProgressBar value={4} isDanger />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Stats
