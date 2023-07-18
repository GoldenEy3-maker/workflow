import parse from "html-react-parser"
import Link from "next/link"
import { useState } from "react"
import dateService from "~/services/date.service"
import { cls } from "~/utils/helpers"
import Button from "../Button"
import styles from "./styles.module.scss"

type OrderItemsProps = {
  id: string
  title: string
  description: string
  price?: number | null
  verified: boolean
  date: Date
  views: number
  clicks: number
  extended?: boolean
  isFavorite: boolean
}

const OrderItem: React.FC<OrderItemsProps> = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite)

  const renderDateAgo = (date: Date) => {
    const diff = dateService.dateDiff(new Date(), date)
    let value = diff.seconds
    let suffix = "секунд"

    if (diff.seconds < 60) {
      if (diff.seconds === 1) suffix = "секунда"
      if (diff.seconds >= 2 && diff.seconds <= 4) suffix = "секунды"
    } else if (diff.minutes < 60) {
      value = diff.minutes
      suffix = "минут"

      if (diff.minutes === 1) suffix = "минута"
      if (diff.minutes >= 2 && diff.minutes <= 4) suffix = "минуты"
    } else if (diff.hours < 24) {
      value = diff.hours
      suffix = "часов"

      if (diff.hours === 1) suffix = "час"
      if (diff.hours >= 2 && diff.hours <= 4) suffix = "часа"
    } else if (diff.days < 30) {
      value = diff.days
      suffix = "дней"

      if (diff.days === 1) suffix = "день"
      if (diff.days >= 2 && diff.days <= 4) suffix = "дня"
    } else if (diff.months < 12) {
      value = diff.months
      suffix = "месяцев"

      if (diff.months === 1) suffix = "месяц"
      if (diff.months >= 2 && diff.months <= 4) suffix = "месяца"
    } else {
      value = diff.years
      suffix = "лет"

      if (diff.years === 1) suffix = "год"
      if (diff.years >= 2 && diff.years <= 4) suffix = "года"
    }

    return `${value} ${suffix}`
  }

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
      className={cls([styles.item], {
        [styles._extended ?? ""]: !!props.extended,
      })}
    >
      <header className={styles.header}>
        {props.extended ? (
          <h3 className={styles.title}>{props.title}</h3>
        ) : (
          <Link href={props.id} className={styles.title} title={props.title}>
            {props.title}
          </Link>
        )}
        <div className={styles.extraInfo}>
          <p className={styles.price}>
            {props.price ? renderPrice(props.price) : "По договоренности"}
          </p>
          <span
            className={cls([styles.verified], {
              [styles._warning ?? ""]: !props.verified,
            })}
          >
            {props.verified ? (
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
      <div className={styles.description}>{parse(props.description)}</div>
      <footer className={styles.footer}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            {renderDateAgo(props.date)} назад
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
            <span>{props.views}</span>
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
            <span>{renderClicks(props.clicks)}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            type="button"
            isIcon
            title="В избранное"
            onClick={() => {
              setIsFavorite((prev) => !prev)
            }}
          >
            {isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 -960 960 960"
                width="1.5em"
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 -960 960 960"
                width="1.5em"
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
              </svg>
            )}
          </Button>
          <Button type="button" variant="elevated" title="Откликнуться">
            Откликнуться
          </Button>
        </div>
      </footer>
    </article>
  )
}

export default OrderItem
