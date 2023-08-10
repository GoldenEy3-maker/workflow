import { Order } from "@prisma/client"
import dayjs from "dayjs"
import { MdOutlineFavorite } from "react-icons/md"
import { cls } from "~/utils/helpers"
import Button from "../Button"
import LoadingSkeletItemList from "../Loading/ItemList"
import SlateEditor from "../Slate"
import styles from "./styles.module.scss"

type OrderProps = {
  data: Order | undefined | null
  loading: boolean
  error?: string
  reduced?: boolean
  backgrounded?: boolean
  empty?: string | React.ReactNode
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

  return (
    <article
      className={cls([styles.order], {
        [styles._backgrounded ?? ""]: !!props.backgrounded,
      })}
    >
      {(() => {
        if (props.loading) return <LoadingSkeletItemList />

        if (props.error) return <p>Error</p>

        if (props.data)
          return (
            <>
              <header className={styles.header}>
                <h3 className={styles.title}>{props.data?.title}</h3>
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
                    {props.data?.secure ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.5em"
                        viewBox="0 -960 960 960"
                        width="1.5em"
                      >
                        <path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1.5em"
                        viewBox="0 -960 960 960"
                        width="1.5em"
                      >
                        <path d="M480-320q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm-40-160h80v-200h-80v200Zm40 400q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" />
                      </svg>
                    )}
                  </span>
                </div>
              </header>
              <SlateEditor
                initialValue={props.data?.description}
                readonly
                reduced={props.reduced}
              />
              <footer className={styles.footer}>
                <div className={styles.info}>
                  <div className={styles.infoItem}>
                    {dayjs(props.data?.createdAt).fromNow()}
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
                  <Button type="button" isIcon title="В избранное">
                    <MdOutlineFavorite fontSize="1.5rem" />
                  </Button>
                  <Button type="button" variant="elevated" title="Откликнуться">
                    Откликнуться
                  </Button>
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
