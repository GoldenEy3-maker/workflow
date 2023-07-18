import { FaFigma, FaReact } from "react-icons/fa"
import { TbBrandAngular, TbBrandNextjs, TbBrandVue } from "react-icons/tb"
import * as Section from "~/components/Section"
import styles from "./styles.module.scss"

const PopularTopics: React.FC = () => {
  return (
    <Section.Root>
      <Section.Header>
        <Section.Title>Популярные темы</Section.Title>
      </Section.Header>
      <Section.Content>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.itemWrapper}>
              <span>
                <FaReact />
              </span>
              <p>React</p>
            </div>
            <span className={styles.value}>90%</span>
          </li>
          <li className={styles.item}>
            <div className={styles.itemWrapper}>
              <span>
                <TbBrandNextjs />
              </span>
              <p>Next</p>
            </div>
            <span className={styles.value}>90%</span>
          </li>
          <li className={styles.item}>
            <div className={styles.itemWrapper}>
              <span>
                <TbBrandAngular />
              </span>
              <p>Angular</p>
            </div>
            <span className={styles.value}>50%</span>
          </li>
          <li className={styles.item}>
            <div className={styles.itemWrapper}>
              <span>
                <TbBrandVue />
              </span>
              <p>Vue</p>
            </div>
            <span className={styles.value}>50%</span>
          </li>
          <li className={styles.item}>
            <div className={styles.itemWrapper}>
              <span>
                <FaFigma />
              </span>
              <p>Дизайн</p>
            </div>
            <span className={styles.value}>50%</span>
          </li>
        </ul>
      </Section.Content>
    </Section.Root>
  )
}
export default PopularTopics
