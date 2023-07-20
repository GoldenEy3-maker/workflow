import Link from "~/components/Link"
import * as Section from "~/components/Section"
import { PagePaths } from "~/utils/enums"
import styles from "./styles.module.scss"

const Resume: React.FC = () => {
  return (
    <Section.Root className={styles.sectionRoot}>
      <Section.Header>
        <Section.Title>Ваше резюме</Section.Title>
      </Section.Header>
      <Section.Content>
        <div className={styles.notFound}>
          <p>
            Похоже, у вас все еще нет резюме
            <br />
            Без резюме работодатели не смогут вас найти!
          </p>
          <Link href={PagePaths.CreateResume} variant="filled" title="Создать резюме">
            Создать резюме
          </Link>
        </div>
      </Section.Content>
    </Section.Root>
  )
}

export default Resume
