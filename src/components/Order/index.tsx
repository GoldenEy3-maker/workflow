import { Order } from "@prisma/client"
import dayjs from "dayjs"
import Link from "next/link"
import { BsShieldCheck, BsShieldExclamation } from "react-icons/bs"
import { PagePaths } from "~/utils/enums"
import { cls } from "~/utils/helpers"
import LoadingSkeletItemList from "../Loading/ItemList"
import SlateEditor from "../Slate"
import styles from "./styles.module.scss"

type OrderProps = {
  data: Order | undefined | null
  loading?: boolean
  error?: string
  reduced?: boolean
  backgrounded?: boolean
  empty?: string | React.ReactNode
  footerActions?: React.ReactNode[]
}

const Order: React.FC<OrderProps> = (props) => {
  const renderClicks = (value: number) => {
    let suffix = "откликов"

    if (value === 1) suffix = "отклик"
    if (value >= 2 && value <= 4) suffix = "отклика"

    return `${value} ${suffix}`
  }

  const renderPrice = (value: number) => {
    return new Intl.NumberFormat("ru", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(value)
  }

  if (props.loading)
    return <LoadingSkeletItemList backgrounded={props.backgrounded} />

  return (
    <article
      className={cls([styles.order], {
        [styles._backgrounded ?? ""]: !!props.backgrounded,
      })}
    >
      {(() => {
        if (props.error) return <p>Error</p>

        if (props.data)
          return (
            <>
              <header className={styles.header}>
                <div className={styles.title}>
                  <Link href={PagePaths.Orders + "/" + props.data.id}>
                    {props.data?.title}
                  </Link>
                </div>
                <div className={styles.extraInfo}>
                  <p className={styles.price}>
                    {props.data?.price
                      ? renderPrice(props.data.price)
                      : "По договоренности"}
                  </p>
                  <span
                    className={cls([styles.verified], {
                      [styles._warning ?? ""]: !props.data?.secure,
                    })}
                  >
                    {props.data.secure ? (
                      <BsShieldCheck fontSize="1.5rem" />
                    ) : (
                      <BsShieldExclamation fontSize="1.5rem" />
                    )}
                  </span>
                </div>
              </header>
              <SlateEditor
                value={props.data?.description}
                readonly
                reduced={props.reduced}
              />
              <footer className={styles.footer}>
                <div className={styles.info}>
                  <div className={styles.infoItem}>
                    {dayjs(props.data?.updatedAt).fromNow()}
                  </div>
                  <div className={styles.infoItem}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.25em"
                      viewBox="0 -960 960 960"
                      width="1.25em"
                    >
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                    </svg>
                    &nbsp;
                    <span>22</span>
                  </div>
                  <div className={styles.infoItem}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1.25em"
                      viewBox="0 -960 960 960"
                      width="1.25em"
                    >
                      <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                    </svg>
                    &nbsp;
                    <span>22</span>
                  </div>
                </div>
                <div className={styles.actions}>
                  {props.footerActions &&
                    props.footerActions.length > 0 &&
                    props.footerActions.map((action) => action)}
                </div>
              </footer>
            </>
          )

        return (
          <div className={styles.empty}>
            {props.empty ?? "Ничего не найдено! Попробуйте позже."}
          </div>
        )
      })()}
    </article>
  )
}

export default Order
