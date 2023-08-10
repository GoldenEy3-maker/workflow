import { type Prisma } from "@prisma/client"
import dayjs from "dayjs"
import { AiOutlineEye } from "react-icons/ai"
import Link from "~/components/Link"
import SlateEditor from "~/components/Slate"
import { PagePaths } from "~/utils/enums"
import { cls } from "~/utils/helpers"
import LoadingSkeletItemList from "../Loading/ItemList"
import UserProfile from "../UserProfile"
import styles from "./styles.module.scss"

type ResumeProps = {
  data:
    | Prisma.ResumeGetPayload<{
        include: {
          speciality: true
          level: true
          skills: { include: { skill: true } }
        }
      }>
    | undefined
    | null
  loading?: boolean
  error?: string | undefined
  reduced?: boolean
  backgrounded?: boolean
  headerActions?: React.ReactNode[]
  footerActions?: React.ReactNode[]
  userProfile?: { name: string; image: string }
}

const Resume: React.FC<ResumeProps> = (props) => {
  return (
    <div
      className={cls([styles.resume], {
        [styles._backgrounded ?? ""]: !!props.backgrounded,
      })}
    >
      {(() => {
        if (props.loading) return <LoadingSkeletItemList />

        // TODO: Handler error state
        if (props.error) return <p>Error</p>

        if (props.data)
          return (
            <>
              <header className={styles.header}>
                <p>
                  {props.data.speciality.value} &nbsp;
                  <span>{props.data.level.value}</span>
                </p>
                {props.headerActions ? (
                  <div className={styles.headerActions}>
                    {props.headerActions.map((action) => action)}
                  </div>
                ) : null}
                {props.userProfile ? (
                  <UserProfile {...props.userProfile} />
                ) : null}
              </header>
              <SlateEditor
                initialValue={props.data.details}
                reduced={props.reduced}
                readonly
              />
              <hr className={styles.divider} />
              <ul className={styles.tags}>
                {props.data.skills.map(({ skill }) => (
                  <li key={skill.id}>{skill.value}</li>
                ))}
              </ul>
              <footer className={styles.footer}>
                <div className={styles.stats}>
                  <span className={styles.statsItem}>
                    {dayjs(props.data.updatedAt).fromNow()}
                  </span>
                  <span className={styles.statsItem}>
                    <AiOutlineEye />
                    32
                  </span>
                </div>
                {props.footerActions ? (
                  <div className={styles.footerActions}>
                    {props.footerActions.map((action) => action)}
                  </div>
                ) : null}
              </footer>
            </>
          )

        return (
          <div className={styles.notFound}>
            <p>
              Похоже, у вас все еще нет резюме
              <br />
              Без резюме работодатели не смогут вас найти!
            </p>
            <Link
              href={PagePaths.CreateResume}
              variant="filled"
              title="Создать резюме"
            >
              Создать резюме
            </Link>
          </div>
        )
      })()}
    </div>
  )
}

export default Resume
