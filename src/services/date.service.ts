import dayjs from "dayjs"
import "dayjs/locale/ru"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.locale("ru")
dayjs.extend(relativeTime)

export default new (class DateService {
  fromNow(date: string | Date) {
    return dayjs(date).fromNow()
  }

  reverseDashedDate(value: string) {
    return value.split("-").reverse().join("-")
  }

  dateDiff(endDate: Date, startDate: Date) {
    const diff = endDate.getTime() - startDate.getTime()

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    return {
      seconds,
      minutes,
      hours,
      days,
      months,
      years,
      weeks,
    }
  }

  getMonths() {
    return Array.from(
      { length: 12 },
      (e, i) => new Date(new Date().getFullYear(), i, 1)
    )
  }

  getDaysInMonth() {
    const date = new Date()
    const value = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    return Array.from(
      { length: value },
      (e, i) => new Date(date.getFullYear(), date.getMonth(), i + 1)
    )
  }

  getHours() {
    return Array.from({ length: 24 }, (e, i) => `${i + 1}:00`)
  }
})()
