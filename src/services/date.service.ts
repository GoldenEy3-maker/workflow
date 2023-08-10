export default new (class DateService {
  normalizeRuLocale(value: string) {
    return value.split(".").reverse().join(".")
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
