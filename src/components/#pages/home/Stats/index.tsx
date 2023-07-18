import * as Section from "~/components/Section"
import { cls } from "~/utils/helpers"
import styles from "./styles.module.scss"

const Stats: React.FC = () => {
  return (
    <Section.Root>
      <Section.Content>
        <ul className={styles.list}>
          <li className={styles.item}>
            <header className={styles.itemHeader}>
              <p className={styles.itemTitle}>Стоимость заказов</p>
              <div className={cls([styles.itemProgress, styles._danger])}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" />
                  </svg>
                </span>
                <p>3.0%</p>
              </div>
            </header>
            <h3 className={styles.itemValue}>100 000 ₽</h3>
            <p className={styles.itemExtra}>24 заказа</p>
          </li>

          <li className={styles.item}>
            <header className={styles.itemHeader}>
              <p className={styles.itemTitle}>Кол-во заказов</p>
              <div className={cls([styles.itemProgress, styles._success])}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" />
                  </svg>
                </span>
                <p>3.2%</p>
              </div>
            </header>
            <h3 className={styles.itemValue}>24</h3>
            <p className={styles.itemExtra}>За последний месяц</p>
          </li>
          <li className={styles.item}>
            <header className={styles.itemHeader}>
              <p className={styles.itemTitle}>Личный рейтинг</p>
              <div className={cls([styles.itemProgress, styles._success])}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" />
                  </svg>
                </span>
                <p>10.0%</p>
              </div>
            </header>
            <h3 className={styles.itemValue}>4,7</h3>
            <p className={styles.itemExtra}>Вс, 18 июня</p>
          </li>
          <li className={styles.item}>
            <header className={styles.itemHeader}>
              <p className={styles.itemTitle}>Просмотры резюме</p>
              <div className={cls([styles.itemProgress, styles._success])}>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                  >
                    <path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" />
                  </svg>
                </span>
                <p>8.3%</p>
              </div>
            </header>
            <h3 className={styles.itemValue}>326</h3>
            <p className={styles.itemExtra}>За последнюю неделю</p>
          </li>
        </ul>
      </Section.Content>
    </Section.Root>
  )
}

export default Stats
